
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchStocks, fetchNews, type StockData } from '@/lib/stockData';
import StockCard from '../stocks/StockCard';
import StockChart from '../stocks/StockChart';
import NewsCard from '../news/NewsCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WatchlistPage from '../watchlist/WatchlistPage';
import { useAuth } from '@/contexts/AuthContext';
import StockDetailsDialog from '../stocks/StockDetailsDialog';

const Dashboard: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [activeTab, setActiveTab] = useState<string>('market');
  const [isStockDialogOpen, setIsStockDialogOpen] = useState(false);
  const { user } = useAuth();
  
  const { 
    data: stocks, 
    isLoading: stocksLoading,
    error: stocksError
  } = useQuery({
    queryKey: ['stocks'],
    queryFn: fetchStocks,
    enabled: !!user
  });
  
  const { 
    data: news, 
    isLoading: newsLoading,
    error: newsError
  } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews,
    enabled: !!user
  });
  
  // Set the first stock as selected when data loads
  useEffect(() => {
    if (stocks && stocks.length > 0 && !selectedStock) {
      setSelectedStock(stocks[0]);
    }
  }, [stocks, selectedStock]);
  
  const handleStockClick = (stock: StockData) => {
    setSelectedStock(stock);
    setIsStockDialogOpen(true);
  };
  
  if (stocksError || newsError) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-red-500">Error loading data. Please try again later.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 gap-6 p-4 md:p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b">
          <TabsList className="mb-0">
            <TabsTrigger value="market">Market Overview</TabsTrigger>
            <TabsTrigger value="watchlist">My Watchlists</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="market" className="pt-6">
          {/* Market Overview Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Market Overview</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {stocksLoading ? (
                // Loading skeletons
                Array(6).fill(0).map((_, index) => (
                  <div key={index} className="rounded-lg border shadow">
                    <div className="p-4">
                      <div className="space-y-3">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-8 w-32" />
                        <div className="flex justify-between pt-2">
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                stocks?.map((stock) => (
                  <StockCard 
                    key={stock.id} 
                    stock={stock} 
                    onClick={() => setSelectedStock(stock)}
                    onAddToWatchlist={() => handleStockClick(stock)}
                  />
                ))
              )}
            </div>
          </section>
          
          {/* Stock Chart Section */}
          <section className="h-[400px] mt-6">
            {selectedStock ? (
              <StockChart stock={selectedStock} />
            ) : (
              <div className="border rounded-lg h-full flex items-center justify-center">
                <Skeleton className="h-[350px] w-full rounded-lg" />
              </div>
            )}
          </section>
          
          {/* News Section */}
          <section className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Latest Financial News</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {newsLoading ? (
                // Loading skeletons
                Array(3).fill(0).map((_, index) => (
                  <div key={index} className="rounded-lg border shadow">
                    <div className="p-4">
                      <div className="space-y-3">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                news?.map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))
              )}
            </div>
          </section>
          
          {/* Stock Details Dialog */}
          <StockDetailsDialog
            stock={selectedStock}
            isOpen={isStockDialogOpen}
            onOpenChange={setIsStockDialogOpen}
          />
        </TabsContent>
        
        <TabsContent value="watchlist" className="pt-6">
          <WatchlistPage />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
