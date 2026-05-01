export class Card {
    constructor(suit, rank, value, codepoint) {
        this.suit = suit;
        this.rank = rank;
        ``;
        this.value = value;
        this.codepoint = codepoint;
    }
    getFace() {
        return String.fromCodePoint(this.codepoint);
    }
    equals(other) {
        return this.rank === other.rank;
    }
}
export var CardRank;
(function (CardRank) {
    CardRank[CardRank["ACE"] = 0] = "ACE";
    CardRank[CardRank["TWO"] = 1] = "TWO";
    CardRank[CardRank["THREE"] = 2] = "THREE";
    CardRank[CardRank["FOUR"] = 3] = "FOUR";
    CardRank[CardRank["FIVE"] = 4] = "FIVE";
    CardRank[CardRank["SIX"] = 5] = "SIX";
    CardRank[CardRank["SEVEN"] = 6] = "SEVEN";
    CardRank[CardRank["EIGHT"] = 7] = "EIGHT";
    CardRank[CardRank["NINE"] = 8] = "NINE";
    CardRank[CardRank["TEN"] = 9] = "TEN";
    CardRank[CardRank["JACK"] = 10] = "JACK";
    CardRank[CardRank["QUEEN"] = 12] = "QUEEN";
    CardRank[CardRank["KING"] = 13] = "KING";
})(CardRank || (CardRank = {}));
