import React, { useState, ReactNode, act } from "react";
import styles from "./blackjack.module.css";
import { Card, Hand, GameState } from "./gamelogic/Types"
import * as Actions from "./gamelogic/Actions"
import * as Util from "./gamelogic/Utils"

function Button({  isActive, onClick, children}: {
    isActive: boolean; 
    onClick: () => void, 
    children?: ReactNode[] | string 
}) {
    const style = isActive ? styles["blackjack-button"] : styles["blackjack-inactive-button"];
    const actualClick = isActive ? onClick : () => {}
    return(
        <button className = { style } onClick = {() => actualClick()}> { children } </button>
    )
}

 function HandComponent({ hand, active }: {
     hand: Hand, 
     active: boolean,
}) {

    const value: number = Util.handValue(hand);
    const style: string[]  = [styles["blackjack-hand"]];
    
    if(active) style.push(styles["blackjack-hand-active"]);
    if(hand.isDone) style.push(styles["blackjack-hand-done"]);
    if(value > 21) style.push(styles["blackjack-hand-bust"]);
    else if(value == 21) style.push(styles["blackjack-hand-blackjack"]);

    return(
        <div className={styles["blackjack-hand-wrapper"]}>
            <div className={ style.join(" ") }>
                <div className={styles["blackjack-hand-cards"]}>
                        { hand.cards.map((c: Card, i : number) => (
                    <div key = { i } className = {styles["blackjack-card"]}>
                        { c.getFace() }
                    </div>
                ))}
                </div>
            </div>
            <p className={styles["blackjack-hand-score"]}>{Util.handValue(hand)}</p>
        </div>
    );    
}

export function Blackjack() {
    const [gameState, setGameState] = useState<GameState>({
        deck: Actions.getDeck(),
        playerHands: [{cards: [], isDone: false}],
        activeHand: 0,
        dealerCards: {cards: [], isDone: false},
        dealerTurn: false,
    })

    function handleDeal(): void {
        setGameState(prev => Actions.dealCard(prev));
    }

    function handleStay(): void {
        setGameState(prev => Actions.stayHand(prev))
    }
    function handleSplit(): void {
        setGameState(prev => Actions.splitHand(prev));
    }
    
    if(gameState.playerHands.every(h => h.isDone)) {
        gameState.dealerTurn = true;
    }
    
    return (
        <div className={styles["blackjack-main-page"]}>
            <h1 className={styles["blackjack-title"]}>
                                Welcome to the Blackjack table!
            </h1>
            <div className={styles["blackjack-table"]}>
                <div className={styles["dealer-hand"]}>
                    <HandComponent hand = { gameState.dealerCards } active = { true }/>
                </div>
                <div className={styles["player-hands"]}>
                    { gameState.playerHands.map((hand: Hand, i : number) => 
                        <HandComponent 
                        key = { i } 
                        hand = { hand } 
                        active = { i == gameState.activeHand }
                        />
                    )}
                </div>
                <div className = { styles["blackjack-hand-buttons"] }>
                    <Button isActive = { !gameState.dealerTurn } onClick = { handleDeal } > Hit </Button>
                    <Button 
                        isActive = { !gameState.dealerTurn && Util.canSplit(gameState) } 
                        onClick = { handleSplit } 
                    > 
                        Split 
                    </Button>
                    <Button isActive = { !gameState.dealerTurn } onClick = { handleStay } > Stay </Button>
                </div>
            </div>
        </div>
    
    );
}