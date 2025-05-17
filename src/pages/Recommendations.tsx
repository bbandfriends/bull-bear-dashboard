
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';

const recommendationsList = [
  {
    id: 1,
    name: "Zerodha Kite",
    image: "/images/zerodha.png",
    description: "India's largest stock broker offering the lowest trading fees with no hidden charges. Their Kite platform is excellent for beginners and advanced traders alike.",
    link: "https://kite.zerodha.com/"
  },
  {
    id: 2,
    name: "Tickertape",
    image: "/images/tickertape.png",
    description: "Great for fundamental analysis with detailed company information, financial ratios, and peer comparison. Their stock screener is very powerful.",
    link: "https://www.tickertape.in/"
  },
  {
    id: 3,
    name: "Tradingview",
    image: "/images/tradingview.png",
    description: "Best charting platform with advanced technical analysis tools. Great for pattern recognition and strategy creation.",
    link: "https://www.tradingview.com/"
  },
  {
    id: 4,
    name: "Screener.in",
    image: "/images/screener.png",
    description: "Excellent for value investors who want to analyze financial statements and ratios. Filter stocks based on various financial criteria.",
    link: "https://www.screener.in/"
  },
  {
    id: 5,
    name: "Trendlyne",
    image: "/images/trendlyne.png",
    description: "Discover market trends, track promoter transactions, and find opportunities with smart stock screeners and personalized alerts.",
    link: "https://trendlyne.com/"
  },
  {
    id: 6,
    name: "MoneyControl",
    image: "/images/moneycontrol.png",
    description: "India's leading financial portal offering news, analysis, live stock quotes, IPO information, and portfolio management tools.",
    link: "https://www.moneycontrol.com/"
  },
  {
    id: 7,
    name: "Smallcase",
    image: "/images/smallcase.png",
    description: "Invest in ideas with curated portfolios of stocks & ETFs managed by expert investment managers. Great for thematic investing.",
    link: "https://www.smallcase.com/"
  },
  {
    id: 8,
    name: "Dhan",
    image: "/images/dhan.png",
    description: "Modern trading platform with lightning-fast execution, advanced order types, and powerful analytics for active traders.",
    link: "https://dhan.co/"
  },
  {
    id: 9,
    name: "Varsity by Zerodha",
    image: "/images/varsity.png",
    description: "Comprehensive educational resource covering all aspects of trading and investing. Perfect for beginners looking to learn market fundamentals.",
    link: "https://zerodha.com/varsity/"
  },
  {
    id: 10,
    name: "Trade Brains",
    image: "/images/tradebrains.png",
    description: "Stock research portal with company analysis, screener, portfolio analyzer, and educational content for Indian investors.",
    link: "https://tradebrains.in/"
  }
];

const Recommendations = () => {
  return (
    <div className="container mx-auto p-4 pt-16">
      <h1 className="text-3xl font-bold mb-8">Recommended Stock Market Apps & Tools</h1>
      <p className="text-muted-foreground mb-8">
        Discover the best apps and tools to enhance your trading and investment journey in the Indian stock market.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendationsList.map((app) => (
          <Card key={app.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-40 bg-muted flex items-center justify-center p-4">
              <div 
                className="w-full h-full bg-contain bg-center bg-no-repeat" 
                style={{ backgroundImage: `url(${app.image})`, backgroundPosition: 'center' }}
              />
            </div>
            <CardContent className="pt-6">
              <CardTitle className="mb-2">{app.name}</CardTitle>
              <CardDescription>{app.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <a 
                href={app.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary flex items-center hover:text-primary/80 transition-colors"
              >
                Visit Website <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
