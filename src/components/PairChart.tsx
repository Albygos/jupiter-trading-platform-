
import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "./ui/card";

// Mock data function enhanced for multiple pairs
const generateMockData = (basePrice: number) => {
  const data = [];
  let price = basePrice;
  for (let i = 0; i < 24; i++) {
    price = price + (Math.random() - 0.5) * (basePrice * 0.05);
    data.push({
      time: `${i}:00`,
      price: price.toFixed(2),
      volume: Math.floor(Math.random() * 1000),
    });
  }
  return data;
};

interface PairChartProps {
  pair: string;
  basePrice: number;
  color: string;
}

export const PairChart = ({ pair, basePrice, color }: PairChartProps) => {
  const [timeframe, setTimeframe] = useState<"1H" | "4H" | "1D" | "1W">("1D");
  const [data, setData] = useState(generateMockData(basePrice));

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setData(generateMockData(basePrice));
    }, 5000);

    return () => clearInterval(interval);
  }, [timeframe, basePrice]);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold">{pair}</h3>
          <span className="text-xl font-semibold" style={{ color }}>
            {data[data.length - 1]?.price}
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

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`color${pair}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke={color}
              fillOpacity={1}
              fill={`url(#color${pair})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
