const db = require("../db");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
const sendToken = require("../utils/jwtToken");

//Register the User
exports.register = async (req,res) => {
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], async(err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    var q;
    var values;

    if(req.body.avatar !== '/Profile.webp'){
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "Event-avatar",
      width: 150,
      crop: "scale",
      secure: true,
    });
    const imgUrl = myCloud.secure_url;
    const imgId = myCloud.public_id;
    console.log(imgUrl);

     q = "INSERT INTO users(`username`,`email`,`password`,`img`, img_id) VALUES (?)";
     values = [req.body.username, req.body.email, hash, imgUrl, imgId];
  }
  else{
    q = "INSERT INTO users(`username`,`email`,`password`,`img`) VALUES (?)";
     values = [req.body.username, req.body.email, hash, req.body.avatar];
  }
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      const q = "SELECT uid,username,email,img FROM users WHERE uid = ?";
      const values = [data.insertId];
      
      db.query(q, values, (err, user) => {
        if (err) return res.status(500).json(err);
        // return res.status(200).json(user[0]);
        sendToken(user[0], 201, res);
      });
    });
  });
}
exports.login = (req,res) => {
    //CHECK USER
    const q="SELECT * FROM users WHERE email = ?";
    db.query(q,[req.body.email],(err,data) => {
        if(err) return res.json(err);
        if(data.length === 0) return res.status(404).json("User not found")

        //CHECK PASSWORD
        const isPasswordCorrect = bcrypt.compareSync(req.body.password,data[0].password);
        if(!isPasswordCorrect) return res.status(400).json("Wrong email or password");
        const {password,...other} = data[0];
        sendToken(data[0], 201, res);
    })
}
exports.logout = (req,res) => {
  db.query(`UPDATE events SET is_like = false`,(err) => {
    if(err) return res.json(err);
    res.clearCookie("access_token",{
      sameSite:"none",
      secure:true
    }).status(200).json("Logout Successful");
  })
} 
