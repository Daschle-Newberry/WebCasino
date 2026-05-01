import React, { useState, useEffect, ReactNode, act } from "react";
import styles from "./blackjack.module.css";
import { Card, Hand, GameState, GamePhase } from "./gamelogic/Types"
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

function HandComponent({ hand, active = false, isDealer = false}: {
     hand: Hand, 
     active?: boolean,
     isDealer?: boolean,
}) {

    const value: number = Util.handValue(hand);
    const style: string[]  = [isDealer ? styles["blackjack-dealer-hand"] : styles["blackjack-hand"]];
    
    if(active && !isDealer) style.push(styles["blackjack-hand-active"]);
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
        dealerHand: {cards: [], isDone: false},
        phase: GamePhase.PLAYERTURN
    })

    useEffect(() => {
        if(gameState.phase !== GamePhase.DEALERTURN) return;
        
        const loop = setInterval(()=> {
            setGameState(prev => { 
                return Actions.dealerChoice(prev);
            } 
            );
        }, 1000)
        
        return () => clearInterval(loop);
    
    }, [gameState.phase]);

    function handleDeal(): void {
        setGameState(prev => Actions.dealCard(prev));
    }

    function handleStay(): void {
        setGameState(prev => Actions.stayHand(prev))
    }
    function handleSplit(): void {
        setGameState(prev => Actions.splitHand(prev));
    }
    
    //Change turns after player is finished
    if(gameState.phase === GamePhase.PLAYERTURN && gameState.playerHands.every(h => h.isDone)) {
        setGameState(prev => Actions.changeTurn(prev));
    }
    
    return (
        <div className={styles["blackjack-main-page"]}>
            <h1 className={styles["blackjack-title"]}>
                                Welcome to the Blackjack table!
            </h1>
            <div className={styles["blackjack-table"]}>
                <h1> Dealer </h1>
                <div className={styles["dealer-hand"]}>
                    <HandComponent hand = { gameState.dealerHand } isDealer = { true }/>
                </div>
                <h1> Player </h1>
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
                    <Button isActive = { !Util.isDealerTurn(gameState.phase) } onClick = { handleDeal } > Hit </Button>
                    <Button 
                        isActive = { !Util.isDealerTurn(gameState.phase) && Util.canSplit(gameState) } 
                        onClick = { handleSplit } 
                    > 
                        Split 
                    </Button>
                    <Button isActive = { !Util.isDealerTurn(gameState.phase) } onClick = { handleStay } > Stay </Button>
                </div>
            </div>
        </div>
    
    );
}