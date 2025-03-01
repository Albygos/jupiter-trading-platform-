import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChartLine, ArrowUp, ArrowDown, Clock, Settings } from "lucide-react";
import { PairChart } from "./PairChart";

// Data for multiple trading pairs
const TRADING_PAIRS = [
  { pair: "SOL/USDC", basePrice: 100, color: "#8884d8" },
  { pair: "JUP/USDC", basePrice: 0.5, color: "#82ca9d" },
  { pair: "BONK/USDC", basePrice: 0.00001, color: "#ffc658" },
  { pair: "RAY/USDC", basePrice: 1.5, color: "#ff7300" },
];

export const TradingView = () => {
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");

  const handleTrade = (direction: "buy" | "sell") => {
    // Implementation will come in next iteration
    console.log(`${direction} order placed`, {
      type: orderType,
      amount,
      price,
      stopLoss,
      takeProfit,
    });
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 animate-fadeIn">
      <div className="lg:col-span-9 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TRADING_PAIRS.map((pairData) => (
            <PairChart
              key={pairData.pair}
              pair={pairData.pair}
              basePrice={pairData.basePrice}
              color={pairData.color}
            />
          ))}
        </div>
        
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold">Trading</h2>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOrderType("market")}
                  className={orderType === "market" ? "bg-primary text-primary-foreground" : ""}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Market
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOrderType("limit")}
                  className={orderType === "limit" ? "bg-primary text-primary-foreground" : ""}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Limit
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Amount (SOL)</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="trading-input"
                />
              </div>
              {orderType === "limit" && (
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Limit Price (USDC)</label>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="trading-input"
                  />
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Stop Loss (USDC)</label>
                <Input
                  type="number"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  placeholder="0.00"
                  className="trading-input"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Take Profit (USDC)</label>
                <Input
                  type="number"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(e.target.value)}
                  placeholder="0.00"
                  className="trading-input"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button
              size="lg"
              className="bg-trading-success hover:bg-trading-success/90 text-white"
              onClick={() => handleTrade("buy")}
            >
              <ArrowUp className="mr-2 h-4 w-4" />
              Buy SOL
            </Button>
            <Button
              size="lg"
              className="bg-trading-danger hover:bg-trading-danger/90 text-white"
              onClick={() => handleTrade("sell")}
            >
              <ArrowDown className="mr-2 h-4 w-4" />
              Sell SOL
            </Button>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-3 space-y-6">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Order Book</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-2 text-sm font-medium text-muted-foreground mb-2">
              <span>Price (USDC)</span>
              <span className="text-right">Size (SOL)</span>
            </div>
            <div className="space-y-1">
              {[...Array(5)].map((_, i) => (
                <div key={`ask-${i}`} className="flex justify-between text-sm">
                  <span className="text-trading-danger">{(43.50 + i * 0.05).toFixed(2)}</span>
                  <span>{(0.5234 - i * 0.1).toFixed(4)}</span>
                </div>
              ))}
              <div className="text-center py-2 text-lg font-semibold">43.45</div>
              {[...Array(5)].map((_, i) => (
                <div key={`bid-${i}`} className="flex justify-between text-sm">
                  <span className="text-trading-success">{(43.40 - i * 0.05).toFixed(2)}</span>
                  <span>{(0.6234 + i * 0.1).toFixed(4)}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Recent Trades</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-3 text-sm font-medium text-muted-foreground mb-2">
              <span>Side</span>
              <span>Size</span>
              <span className="text-right">Price</span>
            </div>
            {[...Array(10)].map((_, i) => (
              <div key={i} className="grid grid-cols-3 text-sm">
                <span className={i % 2 === 0 ? "text-trading-success" : "text-trading-danger"}>
                  {i % 2 === 0 ? "Buy" : "Sell"}
                </span>
                <span>{(0.5234 + i * 0.1234).toFixed(4)}</span>
                <span className="text-right">${(43.45 + i * 0.01).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
