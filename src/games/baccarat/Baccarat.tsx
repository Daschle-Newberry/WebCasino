import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./baccarat.module.css";
import {
  GameState,
  dealInitial,
  playRound,
  handValue,
  getCardEmoji
} from "./gamelogic";

export function Baccarat() {
    const [game, setGame] = useState<GameState | null>(null);

    function startGame() {
        setGame(dealInitial());
    }

    function play() {
        if (!game) return;
        const newGame = playRound(game);
        setGame({ ...newGame });
    }

    return (
        <div className={styles["container"]}>
            <h1>Baccarat</h1>

            {!game && <button onClick={startGame} className={styles["casino-button"]}>Start Game</button>}

            {game && (
                <>
                    <div className={styles["table"]}>
                        <div className={styles["hand"]}>
                            <h2>Player({handValue(game.player)})</h2>

                            <div className={styles["cards"]}>
                                {game.player.cards.map((c, i) => (
                                <div key={i} className={styles["cards"]}>
                                    {getCardEmoji(c)}
                                </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles["hand"]}>
                            <h2>Banker ({handValue(game.banker)})</h2>

                            <div className={styles["cards"]}>
                                {game.banker.cards.map((c, i) => (
                                <div key={i} className={styles["cards"]}>
                                    {getCardEmoji(c)}
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>

                {!game.result && (
                    <button onClick={play} className={styles["casino-button"]}>Continue</button>
                )}

                {game.result && (
                    <div>
                        <h2 className={styles["result"]}>{game.result}</h2>

                        <button onClick={startGame} className={styles["casino-button"]}>Play Again</button>
                        <Link to="/" className={styles["casino-button"]}>Main Menu</Link> 
                    </div>
                    )}
                </>
            )}
        </div>
    );
}