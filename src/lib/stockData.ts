
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

// Mock data for Indian stocks (Nifty 50)
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
  },
  {
    id: "13",
    symbol: "ASIANPAINT",
    name: "Asian Paints Ltd",
    price: 2845.60,
    change: 32.20,
    changePercent: 1.14,
    volume: 954872,
    marketCap: "2.73L Cr",
    high52w: 3590.00,
    low52w: 2650.00,
    chartData: generateChartData(2840, 200, 20, true)
  },
  {
    id: "14",
    symbol: "MARUTI",
    name: "Maruti Suzuki India",
    price: 10578.30,
    change: -124.75,
    changePercent: -1.17,
    volume: 342561,
    marketCap: "3.19L Cr",
    high52w: 12350.00,
    low52w: 8845.00,
    chartData: generateChartData(10570, 800, 20, false)
  },
  {
    id: "15",
    symbol: "KOTAKBANK",
    name: "Kotak Mahindra Bank",
    price: 1832.45,
    change: 18.70,
    changePercent: 1.03,
    volume: 1253487,
    marketCap: "3.64L Cr",
    high52w: 2063.00,
    low52w: 1631.00,
    chartData: generateChartData(1830, 150, 20, true)
  },
  {
    id: "16",
    symbol: "SUNPHARMA",
    name: "Sun Pharmaceutical",
    price: 1248.75,
    change: -8.65,
    changePercent: -0.69,
    volume: 987452,
    marketCap: "3.00L Cr",
    high52w: 1320.00,
    low52w: 943.00,
    chartData: generateChartData(1250, 100, 20, false)
  },
  {
    id: "17",
    symbol: "BHARTIARTL",
    name: "Bharti Airtel Ltd",
    price: 1157.80,
    change: 15.60,
    changePercent: 1.37,
    volume: 2583641,
    marketCap: "6.43L Cr",
    high52w: 1198.00,
    low52w: 852.00,
    chartData: generateChartData(1150, 100, 20, true)
  },
  {
    id: "18",
    symbol: "NTPC",
    name: "NTPC Ltd",
    price: 298.45,
    change: 5.80,
    changePercent: 1.98,
    volume: 3254789,
    marketCap: "2.89L Cr",
    high52w: 325.00,
    low52w: 176.00,
    chartData: generateChartData(295, 50, 20, true)
  },
  {
    id: "19",
    symbol: "POWERGRID",
    name: "Power Grid Corporation",
    price: 273.60,
    change: -3.25,
    changePercent: -1.17,
    volume: 2536984,
    marketCap: "2.55L Cr",
    high52w: 318.00,
    low52w: 197.00,
    chartData: generateChartData(275, 40, 20, false)
  },
  {
    id: "20",
    symbol: "LT",
    name: "Larsen & Toubro",
    price: 3274.90,
    change: 41.50,
    changePercent: 1.28,
    volume: 847562,
    marketCap: "4.59L Cr",
    high52w: 3658.00,
    low52w: 2454.00,
    chartData: generateChartData(3270, 300, 20, true)
  },
  {
    id: "21",
    symbol: "ULTRACEMCO",
    name: "UltraTech Cement Ltd",
    price: 9846.30,
    change: -92.65,
    changePercent: -0.93,
    volume: 236548,
    marketCap: "2.84L Cr",
    high52w: 10479.00,
    low52w: 7145.00,
    chartData: generateChartData(9840, 800, 20, false)
  },
  {
    id: "22",
    symbol: "TITAN",
    name: "Titan Company Ltd",
    price: 3312.75,
    change: 58.45,
    changePercent: 1.79,
    volume: 548621,
    marketCap: "2.94L Cr",
    high52w: 3625.00,
    low52w: 2450.00,
    chartData: generateChartData(3310, 300, 20, true)
  },
  {
    id: "23",
    symbol: "BAJAJFINSV",
    name: "Bajaj Finserv Ltd",
    price: 1645.80,
    change: -12.35,
    changePercent: -0.74,
    volume: 684523,
    marketCap: "2.62L Cr",
    high52w: 1900.00,
    low52w: 1354.00,
    chartData: generateChartData(1645, 150, 20, false)
  },
  {
    id: "24",
    symbol: "NESTLEIND",
    name: "Nestle India Ltd",
    price: 2487.45,
    change: 32.65,
    changePercent: 1.33,
    volume: 142536,
    marketCap: "2.40L Cr",
    high52w: 2670.00,
    low52w: 2045.00,
    chartData: generateChartData(2485, 200, 20, true)
  },
  {
    id: "25",
    symbol: "GRASIM",
    name: "Grasim Industries Ltd",
    price: 2065.30,
    change: -18.45,
    changePercent: -0.89,
    volume: 354621,
    marketCap: "1.36L Cr",
    high52w: 2255.00,
    low52w: 1710.00,
    chartData: generateChartData(2065, 180, 20, false)
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
  },
  {
    id: "7",
    title: "Bharti Airtel announces 5G expansion to cover all major cities",
    source: "ET Telecom",
    time: "Today",
    summary: "Bharti Airtel has accelerated its 5G rollout plan, with the aim to cover all major Indian cities by the end of this quarter, significantly ahead of the original timeline.",
    url: "#",
    relatedSymbols: ["BHARTIARTL"]
  },
  {
    id: "8",
    title: "Asian Paints reports 15% growth in quarterly profit",
    source: "Moneycontrol",
    time: "3 hours ago",
    summary: "Asian Paints has reported a 15% year-on-year increase in net profit for the latest quarter, driven by strong volume growth in the decorative paints segment despite raw material price pressures.",
    url: "#",
    relatedSymbols: ["ASIANPAINT"]
  },
  {
    id: "9",
    title: "L&T secures major infrastructure contracts worth ₹8,000 crore",
    source: "Business Line",
    time: "Yesterday",
    summary: "Larsen & Toubro has secured multiple infrastructure contracts worth approximately ₹8,000 crore across various segments including transportation, water treatment, and power transmission.",
    url: "#",
    relatedSymbols: ["LT"]
  },
  {
    id: "10",
    title: "NTPC targets 60 GW renewable energy capacity by 2032",
    source: "Economic Times",
    time: "Today",
    summary: "NTPC has revised its renewable energy target upward, now aiming to achieve 60 GW capacity by 2032, as part of its strategic shift towards green energy and reducing carbon footprint.",
    url: "#",
    relatedSymbols: ["NTPC"]
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
