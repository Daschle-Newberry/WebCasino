import { GameState, GamePhase, Card, Hand, CardRank} from "./Types"

export function shuffle(cards: Card[]): void { 
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

export function canSplit(gameState: GameState): boolean {
    const currentHand: Hand = gameState.playerHands[gameState.activeHand];

    const maxHands: boolean = gameState.playerHands.length >= 4;
    const splittableHand: boolean = currentHand.cards.length == 2 && currentHand.cards[0].equals(currentHand.cards[1])
    return !maxHands && splittableHand;
}

export function handValue(hand: Hand): number {
    let points: number = 0;
		let aces = 0;
		for(const c of hand.cards) {
			points += c.value;
			if(c.rank === CardRank.ACE) aces++;
		}

        const requiredAces =  Math.max(Math.ceil((points/10) - 2.1), 0);
		return points - Math.min(requiredAces,aces) * 10;
}


export function isDealerTurn(phase: GamePhase): boolean {
    return phase === GamePhase.DEALERTURN;
}