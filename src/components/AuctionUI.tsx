import React, { useState } from 'react';
import { Trash2, Plus, Award } from 'lucide-react';

// Interface definitions
interface Bid {
  amount: number;
  bidderId: string;
}

interface Bidder {
  id: string;
  bids: number[];
}

interface AuctionResult {
  winningBidder: string | null;
  winningPrice: number | null;
}

// VickreyAuction class
class VickreyAuction {
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

export default function AuctionUI() {
  const [reservePrice, setReservePrice] = useState<number>(100);
  const [bidders, setBidders] = useState<Bidder[]>([
    { id: 'A', bids: [] },
    { id: 'B', bids: [] },
  ]);
  const [result, setResult] = useState<AuctionResult | null>(null);
  const [newBid, setNewBid] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<{ [key: string]: string }>({});

  const addBidder = () => {
    const nextId = String.fromCharCode(65 + bidders.length);
    setBidders([...bidders, { id: nextId, bids: [] }]);
  };

  const removeBidder = (id: string) => {
    setBidders(bidders.filter(bidder => bidder.id !== id));
    setError({ ...error, [id]: '' });
  };

  const addBid = (bidderId: string) => {
    const bidAmount = parseFloat(newBid[bidderId]);
    setError({ ...error, [bidderId]: '' });

    if (isNaN(bidAmount)) {
      setError({ ...error, [bidderId]: 'Please enter a valid number' });
      return;
    }

    if (bidAmount <= 0) {
      setError({ ...error, [bidderId]: 'Bid must be positive' });
      return;
    }

    setBidders(bidders.map(bidder =>
        bidder.id === bidderId
            ? { ...bidder, bids: [...bidder.bids, bidAmount] }
            : bidder
    ));
    setNewBid({ ...newBid, [bidderId]: '' });
  };

  const runAuction = () => {
    const auction = new VickreyAuction(reservePrice);
    const auctionResult = auction.determineWinner(bidders);
    setResult(auctionResult);
  };

  return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Vickrey Auction Simulator</h1>

          <div className="mb-6">
            <label htmlFor="reservePrice" className="block text-sm font-medium mb-2">
              Reserve Price (€)
            </label>
            <input
                id="reservePrice"
                type="number"
                value={reservePrice}
                onChange={(e) => setReservePrice(Number(e.target.value))}
                className="border rounded p-2 w-32"
                aria-label="Reserve Price"
                min="0"
            />
          </div>

          <div className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold">Bidders</h2>
            {bidders.map((bidder) => (
                <div key={bidder.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Bidder {bidder.id}</h3>
                    <button
                        onClick={() => removeBidder(bidder.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label={`Remove bidder ${bidder.id}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="mb-2">
                <span className="text-sm text-gray-600">
                  Bids: {bidder.bids.length > 0
                    ? bidder.bids.map(b => b + '€').join(', ')
                    : 'No bids'}
                </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <input
                          type="number"
                          value={newBid[bidder.id] || ''}
                          onChange={(e) => setNewBid({ ...newBid, [bidder.id]: e.target.value })}
                          placeholder="Enter bid amount"
                          className={`border rounded p-2 flex-1 ${error[bidder.id] ? 'border-red-500' : ''}`}
                          aria-label={`Bid amount for bidder ${bidder.id}`}
                          min="0"
                      />
                      <button
                          onClick={() => addBid(bidder.id)}
                          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                          aria-label={`Add bid for bidder ${bidder.id}`}
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    {error[bidder.id] && (
                        <span className="text-red-500 text-sm" role="alert">
                    {error[bidder.id]}
                  </span>
                    )}
                  </div>
                </div>
            ))}

            <button
                onClick={addBidder}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                aria-label="Add new bidder"
            >
              Add Bidder
            </button>
          </div>

          <button
              onClick={runAuction}
              className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 w-full"
              aria-label="Run auction"
          >
            Run Auction
          </button>

          {result && (
              <div className="mt-6 border-t pt-6">
                <div
                    className="bg-gray-50 rounded-lg p-4"
                    role="region"
                    aria-label="Auction Results"
                    data-testid="auction-results"
                >
                  <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                    <Award className="text-yellow-500" />
                    Auction Results
                  </h2>
                  <p className="mb-2">
                    <span className="font-medium">Winning Bidder: </span>
                    <span>{result?.winningBidder ? `Bidder ${result.winningBidder}` : 'No winner'}</span>
                  </p>
                  <p>
                    <span className="font-medium">Winning Price: </span>
                    <span>{result?.winningPrice ? `${result.winningPrice}€` : 'N/A'}</span>
                  </p>
                </div>
              </div>
          )}
        </div>
      </div>
  );
}