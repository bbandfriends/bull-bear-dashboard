import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calculator, Plus, Trash2 } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface SipResult {
  totalInvested: number;
  estimatedReturns: number;
  totalValue: number;
  chartData: { year: number; value: number }[];
}

interface SipPlan {
  id: string;
  name: string;
  monthlyAmount: string;
  returnRate: string;
  duration: string;
  result: SipResult | null;
}

const calculateSIP = (monthly: number, returnRate: number, years: number): SipResult => {
  const r = returnRate / 100;
  const n = 12;
  const t = years;
  
  const futureValue = monthly * (((Math.pow(1 + r/n, n*t) - 1) / (r/n)) * (1 + r/n));
  const totalInvested = monthly * n * t;
  const estimatedReturns = futureValue - totalInvested;
  
  const chartData = [];
  for (let year = 1; year <= years; year++) {
    const value = monthly * (((Math.pow(1 + r/n, n*year) - 1) / (r/n)) * (1 + r/n));
    chartData.push({ year, value: Math.round(value) });
  }
  
  return {
    totalInvested: Math.round(totalInvested),
    estimatedReturns: Math.round(estimatedReturns),
    totalValue: Math.round(futureValue),
    chartData
  };
};

const SipCalculator = () => {
  // Single SIP State
  const [singleSip, setSingleSip] = useState({
    monthlyAmount: '5000',
    returnRate: '12',
    duration: '10'
  });
  const [singleResult, setSingleResult] = useState<SipResult | null>(null);

  // Compare SIPs State
  const [sipPlans, setSipPlans] = useState<SipPlan[]>([
    {
      id: '1',
      name: 'SIP Plan A',
      monthlyAmount: '5000',
      returnRate: '12',
      duration: '10',
      result: null
    }
  ]);

  const handleSingleCalculate = () => {
    const monthly = parseFloat(singleSip.monthlyAmount);
    const rate = parseFloat(singleSip.returnRate);
    const years = parseFloat(singleSip.duration);
    
    if (monthly > 0 && rate > 0 && years > 0) {
      const result = calculateSIP(monthly, rate, years);
      setSingleResult(result);
    }
  };

  const handleSingleReset = () => {
    setSingleSip({ monthlyAmount: '5000', returnRate: '12', duration: '10' });
    setSingleResult(null);
  };

  const handleCompareCalculate = () => {
    const updatedPlans = sipPlans.map(plan => {
      const monthly = parseFloat(plan.monthlyAmount);
      const rate = parseFloat(plan.returnRate);
      const years = parseFloat(plan.duration);
      
      if (monthly > 0 && rate > 0 && years > 0) {
        return { ...plan, result: calculateSIP(monthly, rate, years) };
      }
      return plan;
    });
    setSipPlans(updatedPlans);
  };

  const addSipPlan = () => {
    if (sipPlans.length < 3) {
      setSipPlans([
        ...sipPlans,
        {
          id: Date.now().toString(),
          name: `SIP Plan ${String.fromCharCode(65 + sipPlans.length)}`,
          monthlyAmount: '5000',
          returnRate: '12',
          duration: '10',
          result: null
        }
      ]);
    }
  };

  const removeSipPlan = (id: string) => {
    if (sipPlans.length > 1) {
      setSipPlans(sipPlans.filter(plan => plan.id !== id));
    }
  };

  const updateSipPlan = (id: string, field: string, value: string) => {
    setSipPlans(sipPlans.map(plan => 
      plan.id === id ? { ...plan, [field]: value } : plan
    ));
  };

  const colors = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Calculator className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">SIP Calculator</h1>
        </div>

        <Tabs defaultValue="single" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="single">Single SIP</TabsTrigger>
            <TabsTrigger value="compare">Compare SIPs</TabsTrigger>
          </TabsList>

          {/* Single SIP Tab */}
          <TabsContent value="single" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Investment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="monthly">Monthly Investment (₹)</Label>
                    <Input
                      id="monthly"
                      type="number"
                      value={singleSip.monthlyAmount}
                      onChange={(e) => setSingleSip({ ...singleSip, monthlyAmount: e.target.value })}
                      placeholder="5000"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="return">Expected Annual Return (%)</Label>
                    <Input
                      id="return"
                      type="number"
                      step="0.1"
                      value={singleSip.returnRate}
                      onChange={(e) => setSingleSip({ ...singleSip, returnRate: e.target.value })}
                      placeholder="12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Investment Duration (Years)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={singleSip.duration}
                      onChange={(e) => setSingleSip({ ...singleSip, duration: e.target.value })}
                      placeholder="10"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleSingleCalculate} className="flex-1">
                      Calculate
                    </Button>
                    <Button onClick={handleSingleReset} variant="outline" className="flex-1">
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {singleResult && (
                <Card>
                  <CardHeader>
                    <CardTitle>Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="text-sm text-muted-foreground">Total Invested</span>
                        <span className="text-lg font-semibold text-foreground">
                          ₹{singleResult.totalInvested.toLocaleString('en-IN')}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <span className="text-sm text-muted-foreground">Estimated Returns</span>
                        <span className="text-lg font-semibold text-green-600">
                          ₹{singleResult.estimatedReturns.toLocaleString('en-IN')}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                        <span className="text-sm font-medium text-foreground">Total Value</span>
                        <span className="text-xl font-bold text-primary">
                          ₹{singleResult.totalValue.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {singleResult && (
              <Card>
                <CardHeader>
                  <CardTitle>Investment Growth Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={singleResult.chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="year" 
                          label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis 
                          tickFormatter={(value) => `₹${(value/100000).toFixed(1)}L`}
                          tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <Tooltip 
                          formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Portfolio Value']}
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={3}
                          dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Compare SIPs Tab */}
          <TabsContent value="compare" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sipPlans.map((plan, index) => (
                <Card key={plan.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    {sipPlans.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSipPlan(plan.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Monthly Amount (₹)</Label>
                      <Input
                        type="number"
                        value={plan.monthlyAmount}
                        onChange={(e) => updateSipPlan(plan.id, 'monthlyAmount', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Return Rate (%)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={plan.returnRate}
                        onChange={(e) => updateSipPlan(plan.id, 'returnRate', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Duration (Years)</Label>
                      <Input
                        type="number"
                        value={plan.duration}
                        onChange={(e) => updateSipPlan(plan.id, 'duration', e.target.value)}
                      />
                    </div>

                    {plan.result && (
                      <div className="pt-4 space-y-2 border-t border-border">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Invested:</span>
                          <span className="font-medium">₹{(plan.result.totalInvested/100000).toFixed(2)}L</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Returns:</span>
                          <span className="font-medium text-green-600">
                            ₹{(plan.result.estimatedReturns/100000).toFixed(2)}L
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total:</span>
                          <span className="font-semibold text-primary">
                            ₹{(plan.result.totalValue/100000).toFixed(2)}L
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex gap-3">
              <Button onClick={handleCompareCalculate} className="flex-1 md:flex-initial">
                <Calculator className="mr-2 h-4 w-4" />
                Calculate All
              </Button>
              {sipPlans.length < 3 && (
                <Button onClick={addSipPlan} variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Another SIP
                </Button>
              )}
            </div>

            {sipPlans.some(plan => plan.result) && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Comparison Table</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Plan</th>
                            <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Invested</th>
                            <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Returns</th>
                            <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Total Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sipPlans.map((plan) => {
                            if (!plan.result) return null;
                            const isHighest = sipPlans.every(p => 
                              !p.result || plan.result!.totalValue >= p.result.totalValue
                            );
                            return (
                              <tr key={plan.id} className={`border-b border-border ${isHighest ? 'bg-primary/5' : ''}`}>
                                <td className="py-3 px-4 font-medium">{plan.name}</td>
                                <td className="text-right py-3 px-4">₹{plan.result.totalInvested.toLocaleString('en-IN')}</td>
                                <td className="text-right py-3 px-4 text-green-600">
                                  ₹{plan.result.estimatedReturns.toLocaleString('en-IN')}
                                </td>
                                <td className="text-right py-3 px-4 font-semibold text-primary">
                                  ₹{plan.result.totalValue.toLocaleString('en-IN')}
                                  {isHighest && ' 🏆'}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Growth Comparison Chart</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={(() => {
                          // Merge all plan data into a single dataset
                          const maxYears = Math.max(...sipPlans.map(p => parseInt(p.duration) || 0));
                          const mergedData: { year: number; [key: string]: number }[] = [];
                          
                          for (let year = 1; year <= maxYears; year++) {
                            const dataPoint: { year: number; [key: string]: number } = { year };
                            sipPlans.forEach((plan) => {
                              if (plan.result) {
                                const yearData = plan.result.chartData.find(d => d.year === year);
                                if (yearData) {
                                  dataPoint[plan.name] = yearData.value;
                                }
                              }
                            });
                            mergedData.push(dataPoint);
                          }
                          return mergedData;
                        })()}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis 
                            dataKey="year"
                            label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                          />
                          <YAxis 
                            tickFormatter={(value) => `₹${(value/100000).toFixed(1)}L`}
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                          />
                          <Tooltip 
                            formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`}
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--background))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Legend />
                          {sipPlans.map((plan, index) => {
                            if (!plan.result) return null;
                            return (
                              <Line
                                key={plan.id}
                                type="monotone"
                                dataKey={plan.name}
                                name={plan.name}
                                stroke={colors[index]}
                                strokeWidth={2}
                                dot={{ fill: colors[index], r: 3 }}
                                connectNulls
                              />
                            );
                          })}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SipCalculator;