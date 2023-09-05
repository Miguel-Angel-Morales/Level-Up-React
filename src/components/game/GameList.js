import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link to handle navigation
import { getGames } from "../../managers/GameManager.js";
import { deleteGame } from "../../managers/GameManager.js";
import { useNavigate } from 'react-router-dom'

export const GameList = () => {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getGames().then((data) => setGames(data));
    }, []);

    const handleDeleteGame = (gameId) => {
        deleteGame(gameId)
            .then(() => {
                // After deletion, update the games list by fetching it again
                getGames().then((data) => setGames(data));
            })
            .catch((error) => {
                // Handle errors if needed
                console.error("Error deleting game: ", error);
            });
    };


    return (
        <article className="games">
            <button
                className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/games/new" });
                }}
            >
                Register New Game
            </button>

            {games.map((game) => (
                <section key={`game--${game.id}`} className="game">
                    <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteGame(game.id)}
                    >Delete </button>
                    <div className="game__title"> Title: {game.title} </div>
                    <div className="game__maker"> Maker: {game.maker} </div>
                    <div className="game__skillLevel">Skill level: {game.skill_level}</div>
                    <div className="game__numberOfPlayers">
                        Number of players: {game.number_of_players}
                    </div>
                    <div className="game__gameTypeId">Game type: {game.game_type}</div>
                    <br />
                    {/* Add an "Update" button with a link */}
                    <Link to={`/games/${game.id}`} className="btn btn-primary">
                        Update Game
                    </Link>
                </section>
            ))}
        </article>
    );
};
