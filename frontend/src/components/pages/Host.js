import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Host.css";
import { EventContext } from "../context/eventContext";
import {toast} from "react-toastify";

const Host = () => {
  const [date, setDate] = useState("");
  const { createEvents } = useContext(EventContext);
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const createEventImagesChange = (e) => {
    setImagePreview(null);

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreview(reader.result);
        setFile(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleClick = async (e) => {
    let inputs = {
      title: title,
      value: value,
      file: file,
      date: date,
      location: location,
    };
    try {
      const res = await createEvents(inputs);
      navigate("/");
      toast.success(res);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    }
  };
  return (
    <div>
      <div className="add">
        <div className="content">
          <input
            required
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            required
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <label>Date&Time</label>
          <input
            required
            type="datetime-local"
            name="date"
            value={date}
            onChange={handleDateChange}
          />
          <div className="editorContainer">
            <ReactQuill
              required
              theme="snow"
              value={value}
              onChange={setValue}
            />
            ;
          </div>
        </div>
        <div className="menu">
          <div className="item">
            <h1>Host</h1>
            <div className="images">
              <input
                style={{ display: "none" }}
                type="file"
                name=""
                id="file"
                onChange={createEventImagesChange}
              />
              {imagePreview && (
                <img className="img-preview" src={imagePreview} alt="" />
              )}
              <label className="file" htmlFor="file">
                Upload Image
              </label>
            </div>
            <div className="buttons">
              <button
              onClick={handleClick}
              >Host</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Host;
