export class Card {
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

    public equals(other: Card): boolean {
        return this.rank === other.rank;
    }
}

export enum CardRank {
    ACE,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    TEN,
    JACK,
    QUEEN = 12,
    KING = 13
}

export enum GamePhase {
    PLAYERTURN,
    DEALERTURN,
    GAMEOVER
}


export type Hand = {
    cards: Card[],
    isDone: boolean
}

export type GameState = {
    deck: Card[];
    playerHands: Hand[];
    activeHand: number;
    dealerHand: Hand;
    phase: GamePhase;
}