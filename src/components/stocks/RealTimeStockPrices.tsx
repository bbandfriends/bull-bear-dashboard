
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  fetchRealTimeStockPrices, 
  StockPrice,
  setupStockDataRefresh 
} from '@/services/stockApiService';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Popular Indian stocks
const POPULAR_STOCKS = ['RELIANCE.BSE', 'TCS.BSE', 'HDFCBANK.BSE', 'INFY.BSE', 'ICICIBANK.BSE'];

const RealTimeStockPrices = () => {
  const [stockPrices, setStockPrices] = useState<StockPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  
  const updatePrices = (prices: StockPrice[]) => {
    setStockPrices(prices);
    setLastUpdated(new Date().toLocaleTimeString());
    setLoading(false);
    setRefreshing(false);
  };
  
  const handleRefresh = async () => {
    if (refreshing) return;
    
    setRefreshing(true);
    try {
      const prices = await fetchRealTimeStockPrices(POPULAR_STOCKS);
      updatePrices(prices);
    } catch (error) {
      console.error('Error refreshing stock data:', error);
      toast.error('Failed to refresh stock data');
      setRefreshing(false);
    }
  };
  
  useEffect(() => {
    const cleanup = setupStockDataRefresh(POPULAR_STOCKS, updatePrices);
    return cleanup;
  }, []);
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Real-Time Stock Prices</CardTitle>
            <CardDescription>
              {lastUpdated ? `Last updated: ${lastUpdated}` : 'Fetching latest prices...'}
            </CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRefresh}
            disabled={refreshing || loading}
          >
            <RefreshCcw className={cn("h-4 w-4", refreshing && "animate-spin")} />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex justify-between items-center p-2 animate-pulse">
                <div className="h-5 bg-muted rounded w-24"></div>
                <div className="h-5 bg-muted rounded w-16"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {stockPrices.map((stock) => (
              <div 
                key={stock.symbol} 
                className="flex justify-between items-center p-2 rounded-md hover:bg-accent transition-colors"
              >
                <div className="font-medium">{stock.symbol.split('.')[0]}</div>
                <div className="flex items-center space-x-2">
                  <div className="font-bold">₹{stock.price.toFixed(2)}</div>
                  <div 
                    className={`flex items-center ${stock.change >= 0 ? 'text-stock-up' : 'text-stock-down'}`}
                  >
                    {stock.change >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    <span>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} 
                      ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {stockPrices.length === 0 && (
              <p className="text-center py-4 text-muted-foreground">
                No stock data available at the moment.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeStockPrices;
