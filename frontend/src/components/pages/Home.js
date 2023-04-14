import React, { useContext, useEffect } from 'react'
import EventCards from "../layout/EventCards.js";
import { EventContext } from '../context/eventContext.js';

const Home = () => {
  const {getAllEvents, allEvents} = useContext(EventContext);
  useEffect(() => {
    const fetchData = async() => {
      try{
      await getAllEvents();
      }
      catch(err){
        alert(err);
      }
    }
    fetchData();
  }, [])
  
  return (
    <div>
      {allEvents && allEvents.map(event => {
        return <EventCards key={event.eid} event={event}/>
      })}
    </div>
  )
}

export default Home