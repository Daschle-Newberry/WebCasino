import React, { Component, ReactNode } from "react";
import styles from "./blackjack.module.css";

class Card {
	public suit: string;
	public rank: string;
	public value: number;

	public constructor(suit: string, rank: string, value: number) {
		this.suit = suit;
		this.rank = rank;``
		this.value = value;
	}


}

function getDeck(): ReactNode[] {
    const start: number = 0x1F0A1;
    const cards: number[] = [];
    for(let suit = 0; suit < 4; suit++){
        for(let rank = 0; rank < 14; rank++) {
            if(rank == 11) continue;
            cards.push(start + (16 * suit) + rank);
        }
    }

    return cards.map((c: number) => <p>{ String.fromCodePoint(c) }</p>);
}

export function Blackjack() {
    return (
        <div className = { styles["deck"] }>
            { getDeck() }
        </div>
    );
}