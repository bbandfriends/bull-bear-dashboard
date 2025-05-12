
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, X, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { 
  getWatchlists, 
  createWatchlist, 
  getWatchlistStocks, 
  addStockToWatchlist,
  removeStockFromWatchlist,
  Watchlist,
  WatchlistStock
} from '@/services/watchlistService';
import { searchStocks, StockData } from '@/lib/stockData';
import { useAuth } from '@/contexts/AuthContext';

const WatchlistPage = () => {
  const { user } = useAuth();
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeWatchlist, setActiveWatchlist] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: watchlists, isLoading, refetch } = useQuery({
    queryKey: ['watchlists'],
    queryFn: getWatchlists,
    enabled: !!user
  });

  useEffect(() => {
    if (watchlists && watchlists.length > 0 && !activeWatchlist) {
      setActiveWatchlist(watchlists[0].id);
    }
  }, [watchlists, activeWatchlist]);

  const createWatchlistMutation = useMutation({
    mutationFn: createWatchlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlists'] });
      toast.success('Watchlist created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create watchlist: ${error.message}`);
    }
  });

  const handleCreateWatchlist = async () => {
    if (!newWatchlistName.trim()) return;
    
    createWatchlistMutation.mutate(newWatchlistName);
    setNewWatchlistName('');
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Watchlists</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Watchlist
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Watchlist</DialogTitle>
              <DialogDescription>
                Give your watchlist a name to help you organize your stocks.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Input
                placeholder="My Watchlist"
                value={newWatchlistName}
                onChange={(e) => setNewWatchlistName(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button 
                onClick={handleCreateWatchlist}
                disabled={createWatchlistMutation.isPending}
              >
                {createWatchlistMutation.isPending ? 'Creating...' : 'Create'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-5 w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : watchlists && watchlists.length > 0 ? (
        <div>
          <Tabs
            value={activeWatchlist || ''}
            onValueChange={setActiveWatchlist}
            className="w-full"
          >
            <TabsList className="mb-4">
              {watchlists.map((watchlist: Watchlist) => (
                <TabsTrigger key={watchlist.id} value={watchlist.id}>
                  {watchlist.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {watchlists.map((watchlist: Watchlist) => (
              <TabsContent key={watchlist.id} value={watchlist.id}>
                {activeWatchlist && (
                  <WatchlistContent watchlistId={watchlist.id} />
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">You haven't created any watchlists yet.</p>
          <Button onClick={() => setIsDialogOpen(true)}>Create Your First Watchlist</Button>
        </div>
      )}
    </div>
  );
};

const WatchlistContent = ({ watchlistId }: { watchlistId: string }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<StockData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const queryClient = useQueryClient();
  
  const { data: watchlistStocks, isLoading } = useQuery({
    queryKey: ['watchlistStocks', watchlistId],
    queryFn: () => getWatchlistStocks(watchlistId),
    enabled: !!watchlistId
  });
  
  const { data: allStocks } = useQuery({
    queryKey: ['allStocks'],
    queryFn: () => import('@/lib/stockData').then(module => module.fetchStocks())
  });
  
  // Find full stock data for each stock in the watchlist
  const watchlistStocksWithDetails = React.useMemo(() => {
    if (!watchlistStocks || !allStocks) return [];
    
    return watchlistStocks.map(watchlistStock => {
      const stockDetails = allStocks.find(stock => 
        stock.symbol === watchlistStock.stock_symbol
      );
      return {
        ...watchlistStock,
        details: stockDetails
      };
    });
  }, [watchlistStocks, allStocks]);
  
  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true);
        try {
          const results = await searchStocks(searchQuery);
          setSearchResults(results);
        } catch (error) {
          console.error("Error searching stocks:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    };
    
    const timeoutId = setTimeout(handleSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);
  
  const addStockMutation = useMutation({
    mutationFn: ({ watchlistId, stockSymbol }: { watchlistId: string, stockSymbol: string }) => 
      addStockToWatchlist(watchlistId, stockSymbol),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlistStocks', watchlistId] });
      toast.success('Stock added to watchlist');
    },
    onError: (error) => {
      toast.error(`Failed to add stock: ${error.message}`);
    }
  });
  
  const removeStockMutation = useMutation({
    mutationFn: ({ watchlistId, stockSymbol }: { watchlistId: string, stockSymbol: string }) => 
      removeStockFromWatchlist(watchlistId, stockSymbol),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlistStocks', watchlistId] });
      toast.success('Stock removed from watchlist');
    },
    onError: (error) => {
      toast.error(`Failed to remove stock: ${error.message}`);
    }
  });
  
  const handleAddStock = (stockSymbol: string) => {
    addStockMutation.mutate({ watchlistId, stockSymbol });
    setSearchQuery('');
  };
  
  const handleRemoveStock = (stockSymbol: string) => {
    removeStockMutation.mutate({ watchlistId, stockSymbol });
  };
  
  // Check if a stock is already in the watchlist
  const isStockInWatchlist = (stockSymbol: string) => {
    return watchlistStocks?.some(item => item.stock_symbol === stockSymbol) || false;
  };
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for stocks to add..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {searchQuery.length >= 2 && (
        <Card className="mt-2">
          <CardContent className="p-2">
            {isSearching ? (
              <div className="py-2">
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : searchResults.length > 0 ? (
              <div className="max-h-60 overflow-auto">
                <Table>
                  <TableBody>
                    {searchResults.map(stock => (
                      <TableRow key={stock.symbol}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{stock.symbol}</div>
                            <div className="text-xs text-muted-foreground">{stock.name}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            size="sm" 
                            variant={isStockInWatchlist(stock.symbol) ? "outline" : "default"}
                            onClick={() => isStockInWatchlist(stock.symbol) 
                              ? handleRemoveStock(stock.symbol) 
                              : handleAddStock(stock.symbol)
                            }
                            disabled={addStockMutation.isPending || removeStockMutation.isPending}
                          >
                            {isStockInWatchlist(stock.symbol) ? 'Remove' : 'Add'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-center py-2 text-muted-foreground">No stocks found</p>
            )}
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Stocks in this watchlist</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : watchlistStocksWithDetails.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {watchlistStocksWithDetails.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.stock_symbol}</TableCell>
                    <TableCell>{item.details?.name || '-'}</TableCell>
                    <TableCell className="text-right">
                      {item.details ? `₹${item.details.price.toFixed(2)}` : '-'}
                    </TableCell>
                    <TableCell className={`text-right ${
                      item.details?.change >= 0 ? 'text-stock-up' : 'text-stock-down'
                    }`}>
                      {item.details 
                        ? `${item.details.change >= 0 ? '+' : ''}${item.details.change.toFixed(2)} 
                          (${item.details.change >= 0 ? '+' : ''}${item.details.changePercent.toFixed(2)}%)`
                        : '-'
                      }
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleRemoveStock(item.stock_symbol)}
                        disabled={removeStockMutation.isPending}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No stocks added to this watchlist yet.</p>
              <p className="text-sm text-muted-foreground mt-1">Use the search box above to find and add stocks.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WatchlistPage;
