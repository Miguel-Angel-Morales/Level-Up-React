import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getEvents } from "../../managers/EventManager.js"
import { deleteEvent } from "../../managers/EventManager.js";
import { useNavigate } from 'react-router-dom'

export const EventList = (props) => {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    const handleDeleteEvent = (eventId) => {
        deleteEvent(eventId)
            .then(() => {
                // After deletion, update the events list by fetching it again
                getEvents().then((data) => setEvents(data));
            })
            .catch((error) => {
                // Handle errors if needed
                console.error("Error deleting event: ", error);
            });
    };


    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/events/new" })
                }}
            >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteEvent(event.id)}
                        >
                            Delete
                        </button>
                        <div className="event__organizer"> Hello I am the organizer!{event.organizer}!</div>
                        <div className="event__eventName"> Event Name: {event.event_name}</div>
                        <div className="event__date"> Date: {event.date}</div>
                        <div className="event__time"> Time: {event.time}</div>
                        <div className="event__attendees"> attendees: {event.attendees}</div>
                        <br></br>
                        <Link to={`/events/${event.id}`} className="btn btn-primary">
                            Update Event
                        </Link>
                    </section>
                })
            }
        </article>
    )
}

