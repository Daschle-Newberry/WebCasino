import { CardRank } from "./Types";
export function shuffle(cards) {
    // Fisher-Yates shuffle
    let index = cards.length - 1;
    while (index > 0) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        const tmp = cards[index];
        cards[index] = cards[swapIndex];
        cards[swapIndex] = tmp;
        index--;
    }
}
export function canSplit(gameState) {
    const currentHand = gameState.playerHands[gameState.activeHand];
    const maxHands = gameState.playerHands.length >= 4;
    const splittableHand = currentHand.cards.length == 2 && currentHand.cards[0].equals(currentHand.cards[1]);
    return !maxHands && splittableHand;
}
export function handValue(hand) {
    let points = 0;
    let aces = 0;
    for (const c of hand.cards) {
        points += c.value;
        if (c.rank === CardRank.ACE)
            aces++;
    }
    const requiredAces = Math.max(Math.ceil((points / 10) - 2.1), 0);
    return points - Math.min(requiredAces, aces) * 10;
}
