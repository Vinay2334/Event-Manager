import { createContext, useState } from "react";
import axios from "axios";

export const EventContext = createContext();

export const EventContextProvider = ({ children }) => {
  const [allEvents, setAllEvents] = useState([]);
  const getAllEvents = async () => {
    const res =await axios.get(`/api/events/allevents`);
    setAllEvents(res.data);
  };
  const getUserEvents = async () => {
    setAllEvents([]);
    const res =await axios.get(`/api/events/userevents`);
    setAllEvents(res.data);
  };
  const createEvents = async (inputs) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const res =await axios.post(`/api/events/create`, inputs, config);
    return res.data;
  };
  const likeEvent = async (id) => {
    await axios.get(`/api/events/like/${id}`);
    getAllEvents();
  };
  return (
    <EventContext.Provider value={{createEvents, getAllEvents, getUserEvents, likeEvent, allEvents}}>
      {children}
    </EventContext.Provider>
  );
};
