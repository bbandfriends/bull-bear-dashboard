import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import RealTimeStockPrices from '@/components/stocks/RealTimeStockPrices';

const Stocks = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Stocks</h1>
              <p className="text-muted-foreground">Real-time stock prices and analysis</p>
            </div>
            <RealTimeStockPrices />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Stocks;