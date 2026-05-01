import { Card, Hand, GameState, GamePhase } from "./Types" 
import { handValue, canSplit, shuffle, getPayout } from "./Utils";

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
export function getIntialState(): GameState {
    const deck: Card[] = getDeck();
    const cards: Card[] = [];

    for(let i = 0; i < 4; i++) {
        const newCard: Card | undefined = deck.pop();
        if(newCard == undefined) throw new Error("Illegal state, deck is empty");
        cards.push(newCard);
    }

    cards[3].hide();
    return {
            deck: deck,
            playerHands: [{cards: cards.splice(0,2), isDone: false, bet: 100, payout: 0}],
            activeHand: 0,
            dealerHand: {cards: cards.splice(0,2), isDone: false, bet: 0, payout: 0},
            phase: GamePhase.BETTING
        }
}
export function dealCard(prev: GameState): GameState {
    const newActiveHand: number = prev.playerHands[prev.activeHand].isDone ? prev.activeHand + 1 : prev.activeHand;

    if(newActiveHand > prev.playerHands.length) return prev;

    const newDeck = [...prev.deck]
    const newCard = newDeck.pop();

    if(newCard == undefined) throw new Error("Out of cards!");
    
    const newHands = [...prev.playerHands]

    const newHand = {
        cards: [...newHands[newActiveHand].cards],
        isDone: false,
        bet: newHands[newActiveHand].bet,
        payout: 0
    };

    newHand.cards.push(newCard);
    newHands[newActiveHand] = newHand;
    newHand.isDone = handValue(newHand) >= 21; 

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

    let endTurn: boolean = prev.activeHand == prev.playerHands.length - 1;
 
    return {
        ...prev,
        playerHands: newHands,
        activeHand: endTurn ? prev.activeHand : prev.activeHand + 1,
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
    const handB = {cards: [cardB1,cardB2], isDone: false, bet: handA.bet, payout: 0}
    
    handA.cards = [cardA1, cardA2];

    handA.isDone = handValue(handA) >= 21
    handB.isDone = handValue(handB) >= 21

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

export function changeTurn(prev: GameState): GameState {
    const newDealerHand = {...prev.dealerHand};
    const newDealerCards = [...newDealerHand.cards];

    newDealerCards.forEach((c: Card) => c.unhide());
    return {
        ...prev,
        dealerHand: newDealerHand,
        phase: GamePhase.DEALERTURN
    }
}

export function dealerChoice(prev: GameState): GameState {
    if(handValue(prev.dealerHand) >= 17) {
        const newHand = {
            cards: [...prev.dealerHand.cards],
            isDone: true,
            bet: 0,
            payout: 0,
        };
        return {
            ...prev,
            dealerHand: newHand,
            phase: GamePhase.GAMEOVER,
        }
    }
    const newDeck = [...prev.deck]
    const newCard = newDeck.pop();

    if(newCard == undefined) throw new Error("Out of cards!");
    

    const newHand = {
        cards: [...prev.dealerHand.cards],
        isDone: false,
        bet: 0,
        payout: 0,
    };

    newHand.cards.push(newCard);

    newHand.isDone = handValue(newHand) >= 17; 

    return (
        {
        ...prev,
        deck: newDeck,
        dealerHand: newHand,
        phase: handValue(newHand) >= 17 ? GamePhase.GAMEOVER : GamePhase.DEALERTURN
        }
    );
}

export function computePayouts(prev: GameState): GameState {
    const newHands: Hand[] = []

    prev.playerHands.forEach((h: Hand) => {
        let newHand: Hand = {...h}
        h.payout = getPayout(h, prev.dealerHand);

        newHands.push(newHand);
    })

    return {
        ...prev,
        playerHands: newHands
    }
}