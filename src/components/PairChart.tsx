
import { useState, useEffect } from "react";
import {
  CandlestickChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

// Enhanced mock data for candlesticks
const generateCandlestickData = (basePrice: number) => {
  const data = [];
  let currentPrice = basePrice;
  
  for (let i = 0; i < 24; i++) {
    const open = currentPrice;
    const close = currentPrice + (Math.random() - 0.5) * (basePrice * 0.02);
    const high = Math.max(open, close) + Math.random() * (basePrice * 0.01);
    const low = Math.min(open, close) - Math.random() * (basePrice * 0.01);
    
    data.push({
      time: `${i}:00`,
      open,
      close,
      high,
      low,
      volume: Math.floor(Math.random() * 1000),
    });
    
    currentPrice = close;
  }
  return data;
};

// Extended trading pairs list
const AVAILABLE_PAIRS = [
  { pair: "SOL/USDC", basePrice: 100, color: "#8884d8" },
  { pair: "JUP/USDC", basePrice: 0.5, color: "#82ca9d" },
  { pair: "BONK/USDC", basePrice: 0.00001, color: "#ffc658" },
  { pair: "RAY/USDC", basePrice: 1.5, color: "#ff7300" },
  { pair: "ORCA/USDC", basePrice: 2.0, color: "#8dd1e1" },
  { pair: "MNGO/USDC", basePrice: 0.1, color: "#a4de6c" },
  { pair: "SRM/USDC", basePrice: 0.8, color: "#d0ed57" },
  { pair: "FIDA/USDC", basePrice: 0.3, color: "#8c76f9" }
];

interface PairChartProps {
  onPairChange?: (pair: string) => void;
}

export const PairChart = ({ onPairChange }: PairChartProps) => {
  const [selectedPair, setSelectedPair] = useState(AVAILABLE_PAIRS[0]);
  const [timeframe, setTimeframe] = useState<"1H" | "4H" | "1D" | "1W">("1D");
  const [data, setData] = useState(generateCandlestickData(selectedPair.basePrice));

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setData(generateCandlestickData(selectedPair.basePrice));
    }, 5000);

    return () => clearInterval(interval);
  }, [timeframe, selectedPair]);

  const handlePairChange = (value: string) => {
    const newPair = AVAILABLE_PAIRS.find(p => p.pair === value) || AVAILABLE_PAIRS[0];
    setSelectedPair(newPair);
    if (onPairChange) {
      onPairChange(value);
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Select value={selectedPair.pair} onValueChange={handlePairChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select pair" />
            </SelectTrigger>
            <SelectContent>
              {AVAILABLE_PAIRS.map((p) => (
                <SelectItem key={p.pair} value={p.pair}>
                  {p.pair}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-xl font-semibold" style={{ color: selectedPair.color }}>
            {data[data.length - 1]?.close.toFixed(4)}
          </span>
        </div>
        <div className="flex gap-1">
          {["1H", "4H", "1D", "1W"].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf as any)}
              className={`px-2 py-1 text-sm rounded ${
                timeframe === tf
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <CandlestickChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip
              content={({ payload }) => {
                if (!payload || !payload.length) return null;
                const data = payload[0].payload;
                return (
                  <div className="bg-background border p-2 rounded-lg shadow-lg">
                    <p className="font-semibold">Time: {data.time}</p>
                    <p>Open: {data.open.toFixed(4)}</p>
                    <p>High: {data.high.toFixed(4)}</p>
                    <p>Low: {data.low.toFixed(4)}</p>
                    <p>Close: {data.close.toFixed(4)}</p>
                    <p>Volume: {data.volume}</p>
                  </div>
                );
              }}
            />
          </CandlestickChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
