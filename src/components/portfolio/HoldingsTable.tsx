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
    avgPrice: 2800,
    currentPrice: 2960,
    value: 148000,
    pnl: 8000,
    pnlPercent: 5.71
  },
  {
    symbol: 'INFY',
    name: 'Infosys Limited',
    quantity: 30,
    avgPrice: 1400,
    currentPrice: 1485,
    value: 44550,
    pnl: 2550,
    pnlPercent: 6.07
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Limited',
    quantity: 25,
    avgPrice: 920,
    currentPrice: 950,
    value: 23750,
    pnl: 750,
    pnlPercent: 3.26
  },
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    quantity: 20,
    avgPrice: 1300,
    currentPrice: 1372,
    value: 27440,
    pnl: 1440,
    pnlPercent: 5.54
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