
import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChartLine, ArrowUp, ArrowDown } from "lucide-react";

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
      <div className="lg:col-span-8">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">SOL/USDC</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOrderType("market")}
                className={orderType === "market" ? "bg-primary text-primary-foreground" : ""}
              >
                Market
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOrderType("limit")}
                className={orderType === "limit" ? "bg-primary text-primary-foreground" : ""}
              >
                Limit
              </Button>
            </div>
          </div>
          
          <div className="chart-container mb-6">
            <div className="flex items-center justify-center h-full">
              <ChartLine className="h-12 w-12 text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Chart coming soon</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Amount</label>
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
                  <label className="text-sm font-medium">Limit Price</label>
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
                <label className="text-sm font-medium">Stop Loss</label>
                <Input
                  type="number"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  placeholder="0.00"
                  className="trading-input"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Take Profit</label>
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
              className="bg-trading-success hover:bg-trading-success/90 text-white"
              onClick={() => handleTrade("buy")}
            >
              <ArrowUp className="mr-2 h-4 w-4" />
              Buy SOL
            </Button>
            <Button
              className="bg-trading-danger hover:bg-trading-danger/90 text-white"
              onClick={() => handleTrade("sell")}
            >
              <ArrowDown className="mr-2 h-4 w-4" />
              Sell SOL
            </Button>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-4 space-y-6">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Order Book</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-trading-danger">43.50</span>
              <span>0.5234 SOL</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-trading-success">43.45</span>
              <span>1.2399 SOL</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Recent Trades</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-trading-success">Buy</span>
              <span>0.5234 SOL</span>
              <span>$43.50</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-trading-danger">Sell</span>
              <span>1.2399 SOL</span>
              <span>$43.45</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
