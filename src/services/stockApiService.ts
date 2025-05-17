
import { supabase } from '@/integrations/supabase/client';
import { StockData } from '@/lib/stockData';

export interface StockPrice {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  previousClose?: number;
  latestTradingDay?: string;
}

export const fetchRealTimeStockPrices = async (symbols: string[]): Promise<StockPrice[]> => {
  try {
    const { data, error } = await supabase.functions.invoke('stock-data', {
      body: { symbols }
    });

    if (error) {
      console.error('Error fetching stock data:', error);
      throw error;
    }

    if (!data || !data.results) {
      console.error('Invalid response from stock-data function:', data);
      throw new Error('Invalid response from API');
    }

    return data.results.filter((result: any) => !result.error);
  } catch (error) {
    console.error('Error in fetchRealTimeStockPrices:', error);
    throw error;
  }
};

export const updateStocksWithRealTimeData = (
  stocks: StockData[], 
  realTimeData: StockPrice[]
): StockData[] => {
  if (!realTimeData || realTimeData.length === 0) return stocks;
  
  // Create a map for quick lookup
  const priceMap = new Map(realTimeData.map(item => [item.symbol, item]));
  
  return stocks.map(stock => {
    const realTimePrice = priceMap.get(stock.symbol);
    
    if (realTimePrice) {
      return {
        ...stock,
        price: realTimePrice.price,
        change: realTimePrice.change,
        changePercent: realTimePrice.changePercent,
        volume: realTimePrice.volume || stock.volume,
        lastUpdated: new Date().toISOString()
      };
    }
    
    return stock;
  });
};
