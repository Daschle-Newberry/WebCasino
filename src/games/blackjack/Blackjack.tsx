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
    playerCards: Card[];
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


function DealButton({ onclick }: {onclick: ()=> void }) {
    return(
        <button onClick = {onclick}> Deal </button>
    )
}

function Hand({ cards }: { cards: Card[] }) {
    const cardsComponents = cards.map((c: Card) => <div className = {styles["card"]}>{ c.getFace() }</div>)
    return(
        <div className={styles["blackjack-hand"]}>
            { cardsComponents }
        </div>
    );    
}

export function Blackjack() {
    const [gameState, setGameState] = useState<GameState>({
        deck: getDeck(),
        playerCards: [],
        dealerCards: [],
    })

    function dealCard(): void {
        const newCard = gameState.deck.pop();

        if(newCard == undefined) throw new Error("Out of cards!");

        setGameState(prev => ({
            ...prev,
            playerCards: [...prev.playerCards, newCard],
        }));
    }

    
    return (
        <div className={styles["blackjack-main-page"]}>
            <DealButton onclick={dealCard}></DealButton>
            <Hand cards = { gameState.playerCards }></Hand>
        </div>
    
    );
}