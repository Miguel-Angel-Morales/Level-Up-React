import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createEvent, getEvents, getGamer } from '../../managers/EventManager.js'


export const EventForm = () => {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])
    const [gamers, setGamers] = useState([])
    const [currentEvent, setCurrentEvent] = useState({
        organizer: 1, // Assuming organizer ID is 1 for now
        event_name: "",
        date: "", // Initialize date as an empty string
        time: "00:00:00", // Initialize time with the format "HH:MM:SS"
        attendees: [], // Initialize attendees as an empty array
        description: "", // Initialize description as an empty string
        game: 0
    });


    useEffect(() => {
        getEvents().then(eventData => setEvents(eventData))
    }, [])

    useEffect(() => {
        getGamer().then(eventData => setGamers(eventData))
    }, [])

    const changeEventState = (domEvent) => {
        const newEventState = { ...currentEvent }
        newEventState[domEvent.target.name] = domEvent.target.value
        setCurrentEvent(newEventState)
    };

    return (
        <form className="eventForm">
            <h2 className="eventForm__">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="organizer">Organizer: </label>
                    <input type="number" name="organizer" required autoFocus className="form-control"
                        value={currentEvent.organizer}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventName">Event Name: </label>
                    <input type="text" name="eventName" required autoFocus className="form-control"
                        value={currentEvent.eventName}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            {            <fieldset>
                <div className="form-group">
                    <label htmlFor="attendees">Attendees: </label>
                    <select name="attendees" className="form-control"
                        value={currentEvent.attendees}
                        onChange={changeEventState}>
                        <option value="0">Select Attendee</option>
                        {
                            gamers.map(a => (
                                <option key={a.id} value={a.id}>
                                    {a.bio}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <input type="number" name="game" required autoFocus className="form-control"
                        value={currentEvent.game}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const event = {
                        organizer: parseInt(currentEvent.organizer),
                        event_name: currentEvent.eventName,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        attendees: parseInt(currentEvent.attendees),
                        description: currentEvent.description,
                        game: parseInt(currentEvent.game)
                    }

                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}
