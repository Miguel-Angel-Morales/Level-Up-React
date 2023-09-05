import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { getEvents, getEventTypes, updateEvent, getGamer } from '../../managers/EventManager.js';

export const UpdateEventForm = () => {
    const navigate = useNavigate();
    const { eventId } = useParams()
    const [events, setEvents] = useState([]);
    const [gamers, setGamers] = useState([])
    const [currentEvent, setCurrentEvent] = useState({
        organizer: 1, // Assuming organizer ID is 1 for now
        event_name: "",
        date: "", // Initialize date as an empty string
        time: "00:00:00", // Initialize time with the format "HH:MM:SS"
        attendees: [], 
        description: "", 
    });

    useEffect(() => {
        getEvents().then(eventData => {
            setEvents(eventData);
            // Assuming eventId is the ID of the event you want to edit
            const eventToEdit = eventData.find(event => event.id === parseInt(eventId));
            setCurrentEvent(eventToEdit);
        });
    }, [eventId]);

    useEffect(() => {
        getGamer().then(eventData => setGamers(eventData))
    }, [])

    const changeEventState = (domEvent) => {
        const newEventState = { ...currentEvent };
        newEventState[domEvent.target.name] = domEvent.target.value;
        setCurrentEvent(newEventState);
    };


    return (
        <form className="UpdateEventForm">
            <h2 className="updateEventForm__title">Update Event</h2>
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
                    <label htmlFor="event_name">Event Name: </label>
                    <input type="text" name="event_name" required autoFocus className="form-control"
                        value={currentEvent.event_name}
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
            {<fieldset>
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

                    const updatedEvent = {
                        id:parseInt(currentEvent.id),
                        organizer: parseInt(currentEvent.organizer),
                        event_name: currentEvent.event_name,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        attendees: parseInt(currentEvent.attendees),
                        description: currentEvent.description,
                        game: parseInt(currentEvent.game)
                    }

                    // Use the updateGame function to update the game
                    updateEvent(updatedEvent)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    );
};
