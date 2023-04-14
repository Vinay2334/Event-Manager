import React, { useContext, useEffect } from 'react'
import EventCards from '../layout/EventCards'
import { EventContext } from '../context/eventContext'

const UserEvents = () => {
  const {getUserEvents, allEvents} = useContext(EventContext);
  useEffect(() => {
    const fetchData = async() => {
      try{
      await getUserEvents(); 
      }
      catch(err){
        alert(err);
      }
    }
    fetchData();
  }, [])
  return (
    <div>
    {allEvents.length !== 0 ? (allEvents.map(event => {
      return <EventCards key={event.eid} event={event} host={JSON.parse(localStorage.getItem("user"))}/>
    })): <h1>No Events Hosted</h1>}
  </div>
  )
}

export default UserEvents