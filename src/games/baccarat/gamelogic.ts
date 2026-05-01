export type Card = {
  suit: string;
  rank: string;
  value: number;
};

export type Hand = {
  cards: Card[];
};

export type GameState = {
  deck: Card[];
  player: Hand;
  banker: Hand;
  result: string | null;
};

const suits = ["♠", "♥", "♦", "♣"];
const ranks = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

// baccarat face (and 10) value logic
function getCardValue(rank: string): number {
  if (rank === "A") return 1;
  if (["10", "J", "Q", "K"].includes(rank)) return 0;
  return parseInt(rank);
}

// makes deck for game
export function createDeck(): Card[] {
  const deck: Card[] = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({
        suit,
        rank,
        value: getCardValue(rank),
      });
    }
  }

  return shuffle(deck);
}

function shuffle(deck: Card[]): Card[] {
  //.sort is a built in javascript method I found that simplifies my shuffle
  return [...deck].sort(() => Math.random() - 0.5);
}

export function drawCard(deck: Card[]): Card {
  // ! is added to assert that the popped value from deck is NOT undefined
  return deck.pop()!;
}

export function handValue(hand: Hand): number {
  const total = hand.cards.reduce((sum, c) => sum + c.value, 0);
  return total % 10;
}

const suitBase: Record<string, number> = {
  "♠": 0x1f0a0,
  "♥": 0x1f0b0,
  "♦": 0x1f0c0,
  "♣": 0x1f0d0,
};

const rankOffset: Record<string, number> = {
  A: 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 13,
  K: 14,
};

export function getCardEmoji(card: Card): string {
  const base = suitBase[card.suit];
  const offset = rankOffset[card.rank];
  return String.fromCodePoint(base + offset);
}

// gives starting hand of 2 cards to both player and dealer
export function dealInitial(): GameState {
  const deck = createDeck();

  const player: Hand = { cards: [] };
  const banker: Hand = { cards: [] };

  player.cards.push(drawCard(deck), drawCard(deck));
  banker.cards.push(drawCard(deck), drawCard(deck));

  return { deck, player, banker, result: null };
}

export function playRound(state: GameState): GameState {
  const { player, banker, deck } = state;

  let playerTotal = handValue(player);
  let bankerTotal = handValue(banker);

  if (playerTotal >= 8 || bankerTotal >= 8) {
    return getResult(state);
  }

  // based on baccarat rules, 
  // the player or dealer is (in this version) 
  // obligated to get a 3rd card if their hand meets certain conditions
  let playerThird: Card | null = null;

  if (playerTotal <= 5) {
    playerThird = drawCard(deck);
    player.cards.push(playerThird);
    playerTotal = handValue(player);
  }

  if (!playerThird) {
    if (bankerTotal <= 5) {
      banker.cards.push(drawCard(deck));
    }
  } else {
    const pVal = playerThird.value;
    // banker has the most complicated draw requirements so its not very pretty
    if (bankerTotal <= 2) {
      banker.cards.push(drawCard(deck));
    } else if (bankerTotal === 3 && pVal !== 8) {
      banker.cards.push(drawCard(deck));
    } else if (bankerTotal === 4 && pVal >= 2 && pVal <= 7) {
      banker.cards.push(drawCard(deck));
    } else if (bankerTotal === 5 && pVal >= 4 && pVal <= 7) {
      banker.cards.push(drawCard(deck));
    } else if (bankerTotal === 6 && (pVal === 6 || pVal === 7)) {
      banker.cards.push(drawCard(deck));
    }
  }

  return getResult(state);
}

// handles game result
function getResult(state: GameState): GameState {
  const playerScore = handValue(state.player);
  const bankerScore = handValue(state.banker);

  let result = "Tie";

  if (playerScore > bankerScore) result = "Player wins";
  else if (bankerScore > playerScore) result = "Banker wins";

  return { ...state, result };
}