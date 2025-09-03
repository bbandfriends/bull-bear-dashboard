import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const getMarketStatus = () => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 60 + minutes; // Convert to minutes for easier comparison
  
  // Market closed on weekends
  if (day === 0 || day === 6) {
    return { status: 'Market Closed', reason: 'Weekend', color: 'text-red-600' };
  }
  
  // Market hours: 9:15 AM (555 minutes) to 3:15 PM (915 minutes)
  const marketOpen = 9 * 60 + 15; // 9:15 AM
  const marketClose = 15 * 60 + 15; // 3:15 PM
  
  if (currentTime >= marketOpen && currentTime <= marketClose) {
    return { status: 'Market Open', reason: '9:15 AM - 3:15 PM', color: 'text-green-600' };
  } else if (currentTime < marketOpen) {
    return { status: 'Pre-Market', reason: 'Opens at 9:15 AM', color: 'text-orange-600' };
  } else {
    return { status: 'Market Closed', reason: 'Closed at 3:15 PM', color: 'text-red-600' };
  }
};

const Market = () => {
  const marketInfo = getMarketStatus();
  const marketData = [
    { name: 'NIFTY 50', price: '19,542.65', change: '+124.30 (+0.64%)', positive: true },
    { name: 'SENSEX', price: '65,995.63', change: '+418.74 (+0.64%)', positive: true },
    { name: 'NIFTY BANK', price: '44,849.85', change: '+789.25 (+1.79%)', positive: true },
    { name: 'NIFTY IT', price: '29,847.60', change: '-245.80 (-0.82%)', positive: false },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Market Overview</h1>
        <p className="text-muted-foreground">Real-time market indices and trends</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {marketData.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
              {item.positive ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.price}</div>
              <p className={`text-xs ${item.positive ? 'text-green-600' : 'text-red-600'}`}>
                {item.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Market Summary</CardTitle>
          <CardDescription>
            Current market status and key insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Activity className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Market Status</p>
              <p className={`text-lg font-semibold ${marketInfo.color}`}>{marketInfo.status}</p>
              <p className="text-sm text-muted-foreground">{marketInfo.reason}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Market;