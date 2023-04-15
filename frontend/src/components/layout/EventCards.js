import React, { useContext } from "react";
import "./EventCards.css";
import { AiFillHeart } from "react-icons/ai";
import DOMPurify from "dompurify";
import { EventContext } from "../context/eventContext";
import { toast } from "react-toastify";

const EventCards = ({ event, host }) => {
  const { likeEvent } = useContext(EventContext);
  const date = new Date(event.time);
  const formattedDate = date.toLocaleString();

  function limitWords(text, maxWords) {
    let data = text.trim().split(" ");
    if (data.length > maxWords) {
      data = data.slice(0, maxWords);
      data.push("...");
    }
    data = data.join(" ");

    return DOMPurify.sanitize(data);
  }

  const handleLikes = async () => {
    try {
      await likeEvent(event.eid);
      toast.success("Event Liked!");
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };
  return (
    <div className="eventcards">
      <img
        src={`${event.event_img ? event.event_img : "/EventImg.jpg"}`}
        alt="img"
      />
      <div className="event-data">
        <h1>{event.event_name}</h1>
        <p>{event.location}</p>
        <div className="name-like">
          <p style={{ color: "green" }}>
            Hosted By : {host ? host.user.username : event.user_name}
          </p>
          {!host && (
            <AiFillHeart
              className={`like-btn ${event.is_like ? "red" : ""}`}
              onClick={handleLikes}
            />
          )}
        </div>
        <p>Date: {formattedDate}</p>
        <p
          dangerouslySetInnerHTML={{
            __html: limitWords(event.data, 37),
          }}
        ></p>
      </div>
    </div>
  );
};

export default EventCards;
