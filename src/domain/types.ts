export interface Bid {
    amount: number;
    bidderId: string;
}

export interface Bidder {
    id: string;
    bids: number[];
}

export interface AuctionResult {
    winningBidder: string | null;
    winningPrice: number | null;
}
