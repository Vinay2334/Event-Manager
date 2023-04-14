const express = require("express");
const {getAllEvents, createEvent, getUserEvents, likeEvent} = require("../controllers/eventController");

const router = express.Router();

router.route("/allevents/").get(getAllEvents);
router.route("/userevents").get(getUserEvents);
router.route("/create").post(createEvent);
router.route("/like/:id").get(likeEvent);

module.exports = router;