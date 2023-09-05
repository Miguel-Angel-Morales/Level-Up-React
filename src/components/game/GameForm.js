import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes, getGames } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])
    const [games, setGames] = useState([])
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0,
        description: ""
    })

    useEffect(() => {
        getGameTypes().then(gameTypeData => {
            console.log(gameTypeData);  // log to console
            setGameTypes(gameTypeData);
        })
    }, [])

    useEffect(() => {
        getGames().then(gameData => setGames(gameData))
    }, [])

    const changeGameState = (domEvent) => {
        const newGameState = { ...currentGame }
        newGameState[domEvent.target.name] = domEvent.target.value
        setCurrentGame(newGameState)
    };

    const SKILL_LEVEL_CHOICES = [
        { value: 1, label: 'Beginner' },
        { value: 2, label: 'Intermediate' },
        { value: 3, label: 'Advanced' },
        { value: 4, label: 'Expert' },
        { value: 5, label: 'Master' },
    ];

    return (
        <form className="GameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers"> Number Of Players: </label>
                    <input type="number" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <select name="skillLevel" className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}>
                        <option value="0"> Select a skill level</option>
                        {
                            SKILL_LEVEL_CHOICES.map(choice => (
                                <option key={choice.value} value={choice.value}>
                                    {choice.label}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select name="gameTypeId" className="form-control"
                        value={currentGame.gameTypeId}
                        onChange={changeGameState}>
                        <option value="0">Select a game type</option>
                        {
                            gameTypes.map(gt => (
                                <option key={gt.id} value={gt.id}>
                                    {gt.label}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId),
                        description: currentGame.description
                    }

                    createGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}
