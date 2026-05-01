import React, { useState, useEffect, ReactNode, act } from "react";
import { Link } from "react-router-dom";

import { Card, Hand, GameState, GamePhase } from "./gamelogic/Types"
import styles from "./blackjack.module.css";

import * as Actions from "./gamelogic/Actions"
import * as Util from "./gamelogic/Utils"

function Button({  isActive, onClick, children}: {
    isActive: boolean; 
    onClick: () => void, 
    children?: ReactNode[] | string 
}) {
    const style: string[] =  [styles["blackjack-button"]];    
    if(!isActive) style.push(styles["blackjack-inactive-button"])
    const actualClick = isActive ? onClick : () => {}
    return(
        <button className = { style.join(" ") } onClick = {() => actualClick()}> { children } </button>
    )
}

function HandComponent({ hand, showPayout, showScore = true, active = false, isDealer = false}: {
     hand: Hand,
     showPayout: boolean; 
     showScore?: boolean
     active?: boolean,
     isDealer?: boolean,
}) {

    const value: number = Util.handValue(hand);
    const style: string[]  = [styles["blackjack-hand"]];
    
    if(active && !isDealer) style.push(styles["blackjack-hand-active"]);
    if(hand.isDone) style.push(styles["blackjack-hand-done"]);

    if(value > 21 && showScore) style.push(styles["blackjack-hand-bust"]);
    else if(value == 21 && showScore) style.push(styles["blackjack-hand-blackjack"]);

    return(
        <div className={styles["blackjack-hand-wrapper"]}>
            <div className={ style.join(" ") }>
                {showPayout && <div className = { styles["blackjack-hand-overlay"]}>{hand.payout}</div>}
                <div className={styles["blackjack-hand-cards"]}>
                        { hand.cards.map((c: Card, i : number) => (
                    <div key = { i } className = {styles["blackjack-card"]}>
                        { c.getFace() }
                    </div>
                ))}
                </div>
            </div>
            <p className={styles["blackjack-hand-score"]}>{showScore ? Util.handValue(hand) : "?"}</p>
        </div>
    );    
}

export function Blackjack() {
    const [betInput, setBetInput] = useState<string>("100");

    const [gameState, setGameState] = useState<GameState>({
            deck: [],
            playerHands: [{cards: [], isDone: false, bet: 100, payout: 0}],
            activeHand: 0,
            dealerHand: {cards: [], isDone: false, bet: 0, payout: 0},
            phase: GamePhase.BETTING
        });
    
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

    useEffect(() => {
        if(gameState.phase !== GamePhase.GAMEOVER) return;
        
        
        setGameState(prev => Actions.computePayouts(prev));
    
    }, [gameState.phase]);


    function handleStart(): void {
        if(gameState.phase !== GamePhase.BETTING) return;
        setGameState(prev => {
            const initial = Actions.getIntialState();
            initial.playerHands[0].bet = parseInt(betInput);
            initial.phase = GamePhase.PLAYERTURN;
            return initial;
        })

    }
    
    function handRestart(): void {
        setGameState({
            deck: [],
            playerHands: [{cards: [], isDone: false, bet: 100, payout: 0}],
            activeHand: 0,
            dealerHand: {cards: [], isDone: false, bet: 0, payout: 0},
            phase: GamePhase.BETTING
        });
    }

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
    
    let showPayout: boolean = gameState.phase == GamePhase.GAMEOVER;
    return (
        <div className={styles["blackjack-main-page"]}>
            <div className = { styles["blackjack-menu"]}>
                <button onClick={ handleStart } className={styles["blackjack-menu-button"]}>Start Game</button>
                <button onClick={ handRestart } className={styles["blackjack-menu-button"]}>Play Again</button>
                <Link className={styles["blackjack-menu-button"]} to = "/"> Main Menu </Link>
                <div className = { styles["blackjack-menu-bet"]}>
                    <p>You are betting: </p>
                    <input type = "number" value = {betInput} onChange={(e)=>setBetInput(e.target.value)}/>
                </div>

            </div>
            <h1 className={styles["blackjack-title"]}>
                                Welcome to the Blackjack table!
            </h1>
            <div className={styles["blackjack-table"]}>
                <div className={styles["dealer-hand"]}>
                    <HandComponent hand = { gameState.dealerHand } showPayout = { false } showScore = { !(gameState.phase == GamePhase.PLAYERTURN) }isDealer = { true }/>
                </div>
                <div className={styles["player-hands"]}>
                    { gameState.playerHands.map((hand: Hand, i : number) => 
                        <HandComponent 
                        key = { i } 
                        hand = { hand } 
                        showPayout = { showPayout }
                        active = { i == gameState.activeHand }
                        />
                    )}
                </div>
                <div className = { styles["blackjack-hand-buttons"] }>
                    <Button isActive = { gameState.phase == GamePhase.PLAYERTURN } onClick = { handleDeal } > Hit </Button>
                    <Button 
                        isActive = { gameState.phase == GamePhase.PLAYERTURN && Util.canSplit(gameState) } 
                        onClick = { handleSplit } 
                    > 
                        Split 
                    </Button>
                    <Button isActive = { gameState.phase == GamePhase.PLAYERTURN } onClick = { handleStay } > Stay </Button>
                </div>
            </div>
        </div>
    
    );
}