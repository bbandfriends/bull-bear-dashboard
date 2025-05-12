
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { getWatchlists, createWatchlist, Watchlist } from '@/services/watchlistService';

const WatchlistPage = () => {
  const [newWatchlistName, setNewWatchlistName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeWatchlist, setActiveWatchlist] = useState<string | null>(null);

  const { data: watchlists, isLoading, refetch } = useQuery({
    queryKey: ['watchlists'],
    queryFn: getWatchlists
  });

  useEffect(() => {
    if (watchlists && watchlists.length > 0 && !activeWatchlist) {
      setActiveWatchlist(watchlists[0].id);
    }
  }, [watchlists, activeWatchlist]);

  const handleCreateWatchlist = async () => {
    if (!newWatchlistName.trim()) return;
    
    const newWatchlist = await createWatchlist(newWatchlistName);
    if (newWatchlist) {
      setNewWatchlistName('');
      setIsDialogOpen(false);
      refetch();
    }
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
              <Button onClick={handleCreateWatchlist}>Create</Button>
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
                <WatchlistContent watchlistId={watchlist.id} />
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
  // This component would fetch and display stocks for a specific watchlist
  // For now, just a placeholder
  return (
    <div className="border rounded-md p-4">
      <p>Watchlist content will be displayed here.</p>
    </div>
  );
};

export default WatchlistPage;
