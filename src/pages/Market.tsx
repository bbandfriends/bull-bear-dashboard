import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const Market = () => {
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
              <p className="text-lg font-semibold text-green-600">Market Open</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Market;