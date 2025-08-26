import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Holding {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
  pnl: number;
  pnlPercent: number;
}

const mockHoldings: Holding[] = [
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    quantity: 50,
    avgPrice: 3450,
    currentPrice: 3680,
    value: 184000,
    pnl: 11500,
    pnlPercent: 6.67
  },
  {
    symbol: 'INFY',
    name: 'Infosys Limited',
    quantity: 30,
    avgPrice: 1620,
    currentPrice: 1750,
    value: 52500,
    pnl: 3900,
    pnlPercent: 8.02
  },
  {
    symbol: 'HDFC',
    name: 'HDFC Bank Limited',
    quantity: 25,
    avgPrice: 1580,
    currentPrice: 1545,
    value: 38625,
    pnl: -875,
    pnlPercent: -2.22
  },
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    quantity: 15,
    avgPrice: 2650,
    currentPrice: 2850,
    value: 42750,
    pnl: 3000,
    pnlPercent: 7.55
  }
];

export const HoldingsTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Holdings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Avg Price</TableHead>
              <TableHead className="text-right">Current Price</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-right">P&L</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockHoldings.map((holding) => (
              <TableRow key={holding.symbol}>
                <TableCell>
                  <div>
                    <div className="font-medium">{holding.symbol}</div>
                    <div className="text-sm text-muted-foreground">{holding.name}</div>
                  </div>
                </TableCell>
                <TableCell className="text-right">{holding.quantity}</TableCell>
                <TableCell className="text-right">₹{holding.avgPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right">₹{holding.currentPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right">₹{holding.value.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col items-end">
                    <span className={holding.pnl >= 0 ? 'text-green-600' : 'text-red-600'}>
                      ₹{holding.pnl.toLocaleString()}
                    </span>
                    <Badge 
                      variant={holding.pnl >= 0 ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {holding.pnl >= 0 ? '+' : ''}{holding.pnlPercent.toFixed(2)}%
                    </Badge>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};