import React, { useState, ReactNode, act } from "react";
import styles from "./blackjack.module.css";
import { Card, GameState, getDeck, dealCard, splitHand, isSplittable, handValue } from "./GameLogic"

function Button({  isActive, handIndex, onClick, children}: {
    isActive: boolean; 
    handIndex: number, 
    onClick: (i: number)=> void, 
    children?: ReactNode[] | string 
}) {
    const style = isActive ? styles["blackjack-button"] : styles["blackjack-inactive-button"];
    const actualClick = isActive ? onClick : () => {}
    return(
        <button className = { style } onClick = {() => actualClick(handIndex)}> { children } </button>
    )
}

 function Hand({ cards, numHands, handIndex, onDeal, onSplit}: {
     cards: Card[], 
     numHands: number;
     handIndex: number,
     onDeal: (i: number) => void; 
     onSplit: (i: number) => void;
}) {

    const bust = handValue(cards) > 21;
    const splittalbe = isSplittable(cards);
    return(
        <div className={styles["blackjack-hand-wrapper"]}>
            <div className={ `${styles["blackjack-hand"]} ${bust ? styles["blackjack-hand-bust"] : ""}`}>
                <div className={styles["blackjack-hand-cards"]}>
                        { cards.map((c: Card, i : number) => (
                    <div key = { i } className = {styles["blackjack-card"]}>
                        { c.getFace() }
                    </div>
                ))}
                </div>
                <div className = { styles["blackjack-hand-buttons"] }>
                    <Button isActive = { !bust } onClick = { onDeal } handIndex = { handIndex }> Hit </Button>
                    <Button isActive = { !bust && isSplittable(cards) && numHands <= 3} onClick = { onSplit } handIndex = { handIndex }> 
                        Split 
                    </Button>
                    <Button isActive = { !bust } onClick = { ()=> { return }} handIndex = { handIndex }> Stay </Button>
                </div>
            </div>
            <p>{handValue(cards)}</p>
        </div>
    );    
}

export function Blackjack() {
    const [gameState, setGameState] = useState<GameState>({
        deck: getDeck(),
        playerHands: [[]],
        dealerCards: [],
    })

    function handleDeal(index: number): void {
        setGameState(prev => dealCard(prev, index));
    }

    function handleSplit(index: number): void {
        setGameState(prev => splitHand(prev, index));
    }
    
    return (
        <div className={styles["blackjack-main-page"]}>
            <div className={styles["blackjack-table"]}>
                <div className={styles["dealer-hand"]}>
                    
                </div>
                <div className={styles["player-hands"]}>
                    { gameState.playerHands.map((hand: Card[], i : number) => 
                        <Hand 
                        key = { i } 
                        cards = { hand } 
                        numHands = { gameState.playerHands.length} 
                        handIndex = { i } 
                        onDeal = { handleDeal } 
                        onSplit = { handleSplit }/>
                    )}
                </div>
            </div>
        </div>
    
    );
}