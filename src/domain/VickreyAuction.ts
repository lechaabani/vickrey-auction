import { Bid, Bidder, AuctionResult } from './types';

export class VickreyAuction {
    constructor(private reservePrice: number) {
        if (reservePrice < 0) {
            throw new Error('Reserve price cannot be negative');
        }
    }

    public determineWinner(bidders: Bidder[]): AuctionResult {
        if (!bidders || bidders.length === 0) {
            return { winningBidder: null, winningPrice: null };
        }

        const allBids: Bid[] = bidders.flatMap(bidder => 
            bidder.bids.map(amount => ({
                amount,
                bidderId: bidder.id
            }))
        );

        const validBids = allBids
            .filter(bid => bid.amount >= this.reservePrice)
            .sort((a, b) => b.amount - a.amount);

        if (validBids.length === 0) {
            return { winningBidder: null, winningPrice: null };
        }

        const highestBid = validBids[0];
        const winningBidder = highestBid.bidderId;
        const secondHighestBid = validBids.find(bid => bid.bidderId !== winningBidder);

        return {
            winningBidder,
            winningPrice: secondHighestBid ? secondHighestBid.amount : this.reservePrice
        };
    }
}
