
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Watchlist {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface WatchlistStock {
  id: string;
  watchlist_id: string;
  stock_symbol: string;
  added_at: string;
}

export const createWatchlist = async (name: string): Promise<Watchlist | null> => {
  try {
    const { data, error } = await supabase
      .from('watchlists')
      .insert([{ name }])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error: any) {
    toast.error(`Failed to create watchlist: ${error.message}`);
    return null;
  }
};

export const getWatchlists = async (): Promise<Watchlist[]> => {
  try {
    const { data, error } = await supabase
      .from('watchlists')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    toast.error(`Failed to fetch watchlists: ${error.message}`);
    return [];
  }
};

export const addStockToWatchlist = async (watchlistId: string, stockSymbol: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('watchlist_stocks')
      .insert([{ watchlist_id: watchlistId, stock_symbol: stockSymbol }]);
      
    if (error) throw error;
    toast.success(`Added stock to watchlist`);
    return true;
  } catch (error: any) {
    // Check if it's a unique constraint error (stock already in watchlist)
    if (error.code === '23505') {
      toast.info('Stock is already in watchlist');
    } else {
      toast.error(`Failed to add stock to watchlist: ${error.message}`);
    }
    return false;
  }
};

export const removeStockFromWatchlist = async (watchlistId: string, stockSymbol: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('watchlist_stocks')
      .delete()
      .eq('watchlist_id', watchlistId)
      .eq('stock_symbol', stockSymbol);
      
    if (error) throw error;
    toast.success(`Removed stock from watchlist`);
    return true;
  } catch (error: any) {
    toast.error(`Failed to remove stock from watchlist: ${error.message}`);
    return false;
  }
};

export const getWatchlistStocks = async (watchlistId: string): Promise<WatchlistStock[]> => {
  try {
    const { data, error } = await supabase
      .from('watchlist_stocks')
      .select('*')
      .eq('watchlist_id', watchlistId)
      .order('added_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
  } catch (error: any) {
    toast.error(`Failed to fetch watchlist stocks: ${error.message}`);
    return [];
  }
};
