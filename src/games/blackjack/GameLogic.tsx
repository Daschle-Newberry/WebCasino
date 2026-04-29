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

enum CardRank {
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

export type GameState = {
    deck: Card[];
    playerHands: Card[][];
    dealerCards: Card[];
}


function shuffle(cards: Card[]): void { 
 		// Fisher-Yates shuffle
 		let index = cards.length - 1;
 		while(index > 0) {
 			const swapIndex: number = Math.floor(Math.random() * (index + 1));
 			const tmp: Card = cards[index];
 			cards[index] = cards[swapIndex];
 			cards[swapIndex] = tmp;
 			index--;
 		}
 	}

export function getDeck(): Card[] {
    const start: number = 0x1F0A1;
    const cards: Card[] = [];
    for(let suit = 0; suit < 4; suit++){
        for(let rank = 0; rank < 14; rank++) {
            if(rank == 11) continue;
            const codepoint: number = start + (16 * suit) + rank;

            let value: number;
            if(10 <= rank) value = 10;
            else if(rank == 0) value = 11;
            else value = rank + 1;

            cards.push(new Card(suit, rank, value, codepoint));
        }
    }
    shuffle(cards);
    return cards;
}

export function dealCard(prev: GameState, index: number): GameState {
    const newDeck = [...prev.deck]
    const newCard = newDeck.pop();

    if(newCard == undefined) throw new Error("Out of cards!");
    
    const newHands = [...prev.playerHands]

    const newHand = [...newHands[index]];
    newHand.push(newCard);
    newHands[index] = newHand;

    return (
        {
        ...prev,
        deck: newDeck,
        playerHands: newHands
        }
    );
}

export function splitHand(prev: GameState, index: number): GameState {
    const newHands = [...prev.playerHands];
    const handToSplit = newHands[index];

    if(newHands.length > 4) return prev;
    if(!isSplittable(handToSplit)) return prev;
    

    const [cardOne, cardTwo] = handToSplit; 
    
    let newCard = prev.deck.pop();
    if(newCard == undefined) throw new Error("Out of cards!");

    newHands.push([cardOne, newCard]);

    newCard = prev.deck.pop();
    if(newCard == undefined) throw new Error("Out of cards!");
    newHands[index] = [cardTwo, newCard];

    return (
        {
        ...prev,
        playerHands: newHands
        }
    )
}


export function isSplittable(hand: Card[]): boolean {
    return hand.length == 2 && hand[0].equals(hand[1]);
}

export function handValue(hand: Card[]): number {
    let points: number = 0;
		let aces = 0;
		for(const c of hand) {
			points += c.value;
			if(c.rank === CardRank.ACE) aces++;
		}

        const requiredAces =  Math.max(Math.ceil((points/10) - 2.1), 0);
		return points - Math.min(requiredAces,aces) * 10;
}