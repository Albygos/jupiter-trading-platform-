
import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "./ui/card";

// Mock data - this would be replaced with real API data
const generateMockData = () => {
  const data = [];
  let price = 100;
  for (let i = 0; i < 24; i++) {
    price = price + (Math.random() - 0.5) * 10;
    data.push({
      time: `${i}:00`,
      price: price.toFixed(2),
      volume: Math.floor(Math.random() * 1000),
    });
  }
  return data;
};

export const PairChart = () => {
  const [timeframe, setTimeframe] = useState<"1H" | "4H" | "1D" | "1W">("1D");
  const [data, setData] = useState(generateMockData());

  useEffect(() => {
    // This would be replaced with real API data fetching
    setData(generateMockData());
  }, [timeframe]);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold">SOL/USDC</h3>
          <span className="text-2xl font-semibold text-trading-success">
            {data[data.length - 1]?.price}
          </span>
        </div>
        <div className="flex gap-2">
          {["1H", "4H", "1D", "1W"].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf as any)}
              className={`px-3 py-1 rounded ${
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
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
