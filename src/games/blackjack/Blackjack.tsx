import React, { useState } from "react";
import styles from "./blackjack.module.css";

class Card {
	public suit: number;
	public rank: number;
	public value: number;

    private codepoint: number;

	public constructor(suit: number, rank: number, value: number, codepoint: number) {
		this.suit = suit;
		this.rank = rank;``
		this.value = value;
        this.codepoint = codepoint;
	}

    public getFace(): string {
        return String.fromCodePoint(this.codepoint);
    }
}


type GameState = {
    deck: Card[];
    playerHands: Card[][];
    dealerCards: Card[];
}



function getDeck(): Card[] {
    const start: number = 0x1F0A1;
    const cards: Card[] = [];
    for(let suit = 0; suit < 4; suit++){
        for(let rank = 0; rank < 14; rank++) {
            if(rank == 11) continue;
            const codepoint: number = start + (16 * suit) + rank;

            let value: number;
            if(11 <= rank) value = 10;
            else if(rank == 0) value = 11;
            else value = rank;

            cards.push(new Card(suit, rank, value, codepoint));
        }
    }
    return cards;
}


function DealButton({  handIndex, onDeal}: { handIndex: number, onDeal: (i: number)=> void }) {
    return(
        <button onClick = {() => onDeal(handIndex)}> Deal </button>
    )
}

 function Hand({ cards, handIndex, onDeal}: {
     cards: Card[], 
     handIndex: number,
     onDeal: (i: number) => void; 
    }) {
        return(
            <div className={styles["blackjack-hand"]}>
                { cards.map((c: Card, i : number) => (
                    <div key = { i } className = {styles["card"]}>
                        { c.getFace() }
                    </div>
                ))}
                <DealButton onDeal = { onDeal } handIndex = { handIndex }></DealButton>
            </div>
    );    
}

export function Blackjack() {
    const [gameState, setGameState] = useState<GameState>({
        deck: getDeck(),
        playerHands: [[],[]],
        dealerCards: [],
    })

    function dealCard(index: number): void {
        const newCard = gameState.deck.pop();

        if(newCard == undefined) throw new Error("Out of cards!");
        
        const newHands = [...gameState.playerHands]

        const newHand = [...newHands[index]];
        newHand.push(newCard);
        newHands[index] = newHand;

        setGameState(prev => ({
            ...prev,
            playerHands: newHands
        }));
    }

    
    return (
        <div className={styles["blackjack-main-page"]}>
            <div className={styles["blackjack-table"]}>
                <div className={styles["dealer-hand"]}>
                    
                </div>
                <div className={styles["player-hands"]}>
                    { gameState.playerHands.map((hand: Card[], i : number) => 
                        <Hand key = { i } cards = { hand } handIndex = { i } onDeal = { dealCard }/>
                    )}
                </div>
            </div>
        </div>
    
    );
}