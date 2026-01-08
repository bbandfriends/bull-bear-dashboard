-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view own watchlists" ON public.watchlists;
DROP POLICY IF EXISTS "Users can manage their watchlist stocks" ON public.watchlist_stocks;

-- Create proper PERMISSIVE policies for watchlists
CREATE POLICY "Users can view own watchlists" 
ON public.watchlists 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own watchlists" 
ON public.watchlists 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own watchlists" 
ON public.watchlists 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own watchlists" 
ON public.watchlists 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create proper PERMISSIVE policies for watchlist_stocks
CREATE POLICY "Users can view their watchlist stocks" 
ON public.watchlist_stocks 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM watchlists 
  WHERE watchlists.id = watchlist_stocks.watchlist_id 
  AND watchlists.user_id = auth.uid()
));

CREATE POLICY "Users can add stocks to their watchlists" 
ON public.watchlist_stocks 
FOR INSERT 
WITH CHECK (EXISTS (
  SELECT 1 FROM watchlists 
  WHERE watchlists.id = watchlist_stocks.watchlist_id 
  AND watchlists.user_id = auth.uid()
));

CREATE POLICY "Users can remove stocks from their watchlists" 
ON public.watchlist_stocks 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM watchlists 
  WHERE watchlists.id = watchlist_stocks.watchlist_id 
  AND watchlists.user_id = auth.uid()
));