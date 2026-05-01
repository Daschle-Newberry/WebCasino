export class Card {
	public suit: number;
	public rank: number;
	public value: number;

    private codepoint: number;

    private isHidden: boolean;

	public constructor(suit: number, rank: number, value: number, codepoint: number, isHidden: boolean = false) {
		this.suit = suit;
		this.rank = rank;``
		this.value = value;
        this.codepoint = codepoint;
        this.isHidden = isHidden;
	}

    public getFace(): string {
        if(this.isHidden) {
            return String.fromCodePoint(0x1F0A0);
        }
        return String.fromCodePoint(this.codepoint);
    }

    public equals(other: Card): boolean {
        return this.rank === other.rank;
    }

    public hide(): void {
        this.isHidden = true;
    }

    public unhide(): void {
        this.isHidden = false;
    }

    public getIsHidden(): boolean {
        return this.isHidden;
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
    BETTING,
    PLAYERTURN,
    DEALERTURN,
    GAMEOVER
}


export type Hand = {
    cards: Card[],
    isDone: boolean
    bet: number;
    payout: number;
}

export type GameState = {
    deck: Card[];
    playerHands: Hand[];
    activeHand: number;
    dealerHand: Hand;
    phase: GamePhase;
}