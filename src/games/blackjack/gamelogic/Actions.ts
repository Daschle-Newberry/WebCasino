import { Card, Hand, GameState } from "./Types" 
import { handValue, canSplit, shuffle } from "./Utils";

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

export function dealCard(prev: GameState): GameState {
    const newDeck = [...prev.deck]
    const newCard = newDeck.pop();

    if(newCard == undefined) throw new Error("Out of cards!");
    
    const newHands = [...prev.playerHands]

    const newHand = {
        cards: [...newHands[prev.activeHand].cards],
        isDone: false
    };

    newHand.cards.push(newCard);
    newHands[prev.activeHand] = newHand;
    newHand.isDone = handValue(newHand) >= 21; 

    const newActiveHand: number = newHand.isDone ? prev.activeHand + 1 : prev.activeHand;
    return (
        {
        ...prev,
        deck: newDeck,
        playerHands: newHands,
        activeHand: newActiveHand,
        }
    );
}

export function stayHand(prev: GameState): GameState {
    const newHands = [...prev.playerHands];
    const newHand = {
        ...newHands[prev.activeHand],
        isDone: true
    }

    newHands[prev.activeHand] = newHand;

    let isDealerTurn: boolean = false;
    let newActiveHand: number = prev.activeHand;

    if(prev.activeHand == prev.playerHands.length - 1) {
        isDealerTurn = true;
    } else {
        newActiveHand++;
    }



    return {
        ...prev,
        playerHands: newHands,
        activeHand: newActiveHand,
        dealerTurn: isDealerTurn,
    }
}

export function splitHand(prev: GameState): GameState {
    const newDeck = [...prev.deck];
    const newHands = [...prev.playerHands];
    const handToSplit = newHands[prev.activeHand];

    if(!canSplit(prev)) return prev;
    
    const [cardA1, cardB1] = handToSplit.cards; 

    const cardA2 = newDeck.pop();
    const cardB2 = newDeck.pop();

    if(!cardA2 || !cardB2) throw new Error("Illegal state, deck is empty");

    const handA = {...newHands[prev.activeHand]};
    const handB = {cards: [cardB1,cardB2], isDone: false}
    
    handA.cards = [cardA1, cardA2];

    handA.isDone = handValue(handA) >= 21;
    handB.isDone = handValue(handB) >= 21;

    newHands[prev.activeHand] = handA;
    newHands.push(handB);

    return (
        {
        ...prev,
        deck: newDeck,
        playerHands: newHands
        }
    )
}