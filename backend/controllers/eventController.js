const fetchuser = require("../utils/fetchUser");
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");
const db = require("../db");
exports.getAllEvents = [
  (req, res, next) => {
    const token = req.cookies.access_token;
    //Change is_like if user is logged in 
    if (token) {
      jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const q =
          "UPDATE events SET is_like =CASE WHEN EXISTS (SELECT 1 FROM event.likes WHERE likes.likes_eid = events.eid AND likes.likes_uid = ?) THEN true ELSE false END";
        db.query(q,[userInfo.id], (err, data) => {
          if (err) return res.status(500).send(err);
          // const q = `SELECT *FROM events`;
          const q ="SELECT events.*, (SELECT username FROM users WHERE users.uid = events.uid) AS user_name FROM events";
          db.query(q, (err, data) => {
            if (err) return res.status(500).send(err);
            return res.status(200).json(data);
          });
        });
      });
    } else {
      const q ="SELECT events.*, (SELECT username FROM users WHERE users.uid = events.uid) AS user_name FROM events";
      db.query(q, (err, data) => {
        if (err) return res.status(500).send(err);
        return res.status(200).json(data);
      });
    }
  },
];

exports.getUserEvents = [
  fetchuser,
  (req, res) => {
    const q = `SELECT * FROM events where uid = ${req.user}`;
    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);
      if (data.length === 0) return res.status(404);
      return res.status(200).json(data);
    });
  },
];

exports.createEvent = [
  fetchuser,
  async (req, res) => {
    var q;
    var values;
    if (req.body.file) {
      const myCloud = await cloudinary.v2.uploader.upload(req.body.file, {
        folder: "Events",
      });
      const imgUrl = myCloud.url;
      const imgId = myCloud.public_id;
      console.log("imageUrl",imgUrl);

      q =
        "INSERT INTO events(`event_name`,`data`,`time`,`location`,`event_img`,`uid`,`event_img_id`) VALUES (?)";
      values = [
        req.body.title,
        req.body.value,
        req.body.date,
        req.body.location,
        imgUrl,
        req.user,
        imgId,
      ];
    } else {
      q =
        "INSERT INTO events(`event_name`,`data`,`time`,`location`,`uid`) VALUES (?)";
      values = [
        req.body.title,
        req.body.value,
        req.body.date,
        req.body.location,
        req.user,
      ];
    }
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Event is live!");
    });
  },
];

//Like an Event
exports.likeEvent = [
  fetchuser,
  (req, res) => {
    const q = "SELECT * FROM likes WHERE (`likes_uid`,`likes_eid`) = (?)";
    const values = [req.user, req.params.id];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).send(err);
      if (data.length === 0) {
        const q = "INSERT INTO likes(`likes_uid`, `likes_eid`) VALUES (?)";
        db.query(q, [values], (err) => {
          if (err) return res.status(500).send(err);
          return res.status(200).send("Liked");
        });
      } else {
        const q = "DELETE FROM likes WHERE(`likes_uid`, `likes_eid`) = (?)";
        db.query(q, [values], (err) => {
          if (err) return res.status(500).send(err);
          return res.status(200).send("DisLiked");
        });
      }
    });
  },
];
