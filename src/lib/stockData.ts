export type StockData = {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  high52w: number;
  low52w: number;
  chartData: {
    time: string;
    price: number;
  }[];
  lastUpdated?: string; // New field for tracking when stock was last updated
};

export type NewsItem = {
  id: string;
  title: string;
  source: string;
  time: string;
  summary: string;
  url: string;
  relatedSymbols: string[];
};

// Mock data for Indian stocks
const mockStockData: StockData[] = [
  {
    id: "1",
    symbol: "RELIANCE",
    name: "Reliance Industries",
    price: 2876.45,
    change: 26.30,
    changePercent: 0.92,
    volume: 7842356,
    marketCap: "19.44L Cr",
    high52w: 2950.50,
    low52w: 2320.75,
    chartData: generateChartData(2800, 200, 20, true)
  },
  {
    id: "2",
    symbol: "TCS",
    name: "Tata Consultancy Services",
    price: 3432.20,
    change: -15.65,
    changePercent: -0.45,
    volume: 1235689,
    marketCap: "12.56L Cr",
    high52w: 3680.00,
    low52w: 3120.40,
    chartData: generateChartData(3400, 300, 20, false)
  },
  {
    id: "3",
    symbol: "INFY",
    name: "Infosys Ltd",
    price: 1486.70,
    change: 17.80,
    changePercent: 1.21,
    volume: 2568741,
    marketCap: "6.18L Cr",
    high52w: 1590.25,
    low52w: 1230.50,
    chartData: generateChartData(1450, 200, 20, true)
  },
  {
    id: "4",
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd",
    price: 1674.55,
    change: -4.25,
    changePercent: -0.25,
    volume: 3156842,
    marketCap: "9.32L Cr",
    high52w: 1725.00,
    low52w: 1425.30,
    chartData: generateChartData(1670, 150, 20, false)
  },
  {
    id: "5",
    symbol: "ICICIBANK",
    name: "ICICI Bank Ltd",
    price: 1045.30,
    change: 8.50,
    changePercent: 0.82,
    volume: 2541369,
    marketCap: "7.28L Cr",
    high52w: 1090.40,
    low52w: 850.75,
    chartData: generateChartData(1030, 120, 20, true)
  },
  {
    id: "6",
    symbol: "HINDUNILVR",
    name: "Hindustan Unilever",
    price: 2564.80,
    change: -12.35,
    changePercent: -0.48,
    volume: 842569,
    marketCap: "6.02L Cr",
    high52w: 2750.00,
    low52w: 2460.35,
    chartData: generateChartData(2570, 200, 20, false)
  },
  {
    id: "7",
    symbol: "WIPRO",
    name: "Wipro Ltd",
    price: 487.25,
    change: 6.75,
    changePercent: 1.40,
    volume: 1562498,
    marketCap: "2.67L Cr",
    high52w: 510.75,
    low52w: 351.85,
    chartData: generateChartData(480, 100, 20, true)
  },
  {
    id: "8",
    symbol: "TATAMOTORS",
    name: "Tata Motors Ltd",
    price: 853.60,
    change: 15.80,
    changePercent: 1.89,
    volume: 3254896,
    marketCap: "2.84L Cr",
    high52w: 875.65,
    low52w: 375.50,
    chartData: generateChartData(840, 180, 20, true)
  },
  {
    id: "9",
    symbol: "BAJFINANCE",
    name: "Bajaj Finance Ltd",
    price: 6748.55,
    change: -85.60,
    changePercent: -1.25,
    volume: 987542,
    marketCap: "4.08L Cr",
    high52w: 7950.00,
    low52w: 5611.35,
    chartData: generateChartData(6800, 500, 20, false)
  },
  {
    id: "10",
    symbol: "ADANIPORTS",
    name: "Adani Ports Ltd",
    price: 942.30,
    change: 22.15,
    changePercent: 2.41,
    volume: 2154678,
    marketCap: "1.94L Cr",
    high52w: 987.90,
    low52w: 545.20,
    chartData: generateChartData(920, 150, 20, true)
  },
  {
    id: "11",
    symbol: "SBIN",
    name: "State Bank of India",
    price: 745.90,
    change: 13.75,
    changePercent: 1.88,
    volume: 4236589,
    marketCap: "6.65L Cr",
    high52w: 773.45,
    low52w: 499.35,
    chartData: generateChartData(740, 120, 20, true)
  },
  {
    id: "12",
    symbol: "AXISBANK",
    name: "Axis Bank Ltd",
    price: 1126.75,
    change: -5.40,
    changePercent: -0.48,
    volume: 1854632,
    marketCap: "3.48L Cr",
    high52w: 1185.00,
    low52w: 875.25,
    chartData: generateChartData(1130, 150, 20, false)
  }
];

const mockNewsData: NewsItem[] = [
  {
    id: "1",
    title: "Reliance to acquire stake in renewable energy startup for ₹1,200 crore",
    source: "Economic Times",
    time: "2 hours ago",
    summary: "Reliance Industries is set to acquire a significant stake in a renewable energy startup, furthering its green energy ambitions with a ₹1,200 crore investment.",
    url: "#",
    relatedSymbols: ["RELIANCE"]
  },
  {
    id: "2",
    title: "TCS wins $200 million deal with Australian financial services firm",
    source: "Business Standard",
    time: "5 hours ago",
    summary: "Tata Consultancy Services has secured a $200 million multi-year contract to provide digital transformation services to a leading Australian financial services company.",
    url: "#",
    relatedSymbols: ["TCS"]
  },
  {
    id: "3",
    title: "Infosys partners with global AI firm to enhance service offerings",
    source: "Mint",
    time: "8 hours ago",
    summary: "Infosys has announced a strategic partnership with a leading global AI firm to enhance its service offerings and deliver advanced AI solutions to clients across sectors.",
    url: "#",
    relatedSymbols: ["INFY"]
  },
  {
    id: "4",
    title: "HDFC Bank expands rural presence with 500 new branches",
    source: "Financial Express",
    time: "Yesterday",
    summary: "HDFC Bank has announced plans to open 500 new branches in rural India over the next year, significantly expanding its presence in underbanked areas.",
    url: "#",
    relatedSymbols: ["HDFCBANK"]
  },
  {
    id: "5",
    title: "ICICI Bank launches innovative digital banking solution for MSMEs",
    source: "Business Today",
    time: "Yesterday",
    summary: "ICICI Bank has introduced a new comprehensive digital banking solution specifically designed for micro, small and medium enterprises (MSMEs) to streamline their financial operations.",
    url: "#",
    relatedSymbols: ["ICICIBANK"]
  },
  {
    id: "6",
    title: "Market outlook: Analysts predict steady growth for FMCG sector",
    source: "CNBC-TV18",
    time: "2 days ago",
    summary: "Leading market analysts have issued positive outlooks for the FMCG sector, with companies like Hindustan Unilever expected to benefit from improving rural demand and easing input costs.",
    url: "#",
    relatedSymbols: ["HINDUNILVR"]
  }
];

// Function to generate random chart data
function generateChartData(basePrice: number, variance: number, points: number, trending: boolean) {
  const data = [];
  let price = basePrice;
  
  for (let i = 0; i < points; i++) {
    // Generate a random price movement, slightly biased by the trending direction
    let change = (Math.random() - (trending ? 0.45 : 0.55)) * variance / points;
    price += change;
    
    // Format the time as HH:MM
    const hour = Math.floor(9 + (i / points) * 6); // Market hours 9 AM to 3 PM
    const minute = Math.floor(Math.random() * 60);
    const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    
    data.push({ time: timeStr, price: parseFloat(price.toFixed(2)) });
  }
  
  return data;
}

export const fetchStocks = async (): Promise<StockData[]> => {
  // In a real application, this would fetch from an API
  // For now, we'll return mock data after a small delay to simulate network request
  return new Promise((resolve) => {
    setTimeout(() => {
      // Add lastUpdated field to all stocks
      const stocksWithTimestamp = mockStockData.map(stock => ({
        ...stock,
        lastUpdated: new Date().toISOString()
      }));
      resolve(stocksWithTimestamp);
    }, 500);
  });
};

export const fetchNews = async (): Promise<NewsItem[]> => {
  // In a real application, this would fetch from an API
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockNewsData), 700);
  });
};

export const searchStocks = async (query: string): Promise<StockData[]> => {
  // Basic search implementation for demo
  const results = mockStockData.filter(stock => 
    stock.symbol.toLowerCase().includes(query.toLowerCase()) || 
    stock.name.toLowerCase().includes(query.toLowerCase())
  );
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(results), 300);
  });
};
