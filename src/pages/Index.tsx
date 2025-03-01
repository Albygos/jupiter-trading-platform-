
import { TradingView } from "@/components/TradingView";

const Index = () => {
  return (
    <div className="container py-8 min-h-screen animate-fadeIn">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Jupiter Trading Platform</h1>
        <p className="text-muted-foreground">Advanced trading features powered by Jupiter Protocol</p>
      </header>
      <main>
        <TradingView />
      </main>
    </div>
  );
};

export default Index;
