
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';

const recommendationsList = [
  {
    id: 1,
    name: "Zerodha Kite",
    image: "/images/zerodha.png",
    description: "Zerodha charges Rs 0 brokerage for equity delivery trades and direct mutual funds. For intraday and Futures, it charges flat Rs 20 or 0.03% per trade. Further, for Options trades, it charges Flat Rs. 20 per executed order.",
    link: "https://kite.zerodha.com/"
  },
  {
    id: 2,
    name: "Upstox",
    image: "/images/upstox.png",
    description: "Upstox's brokerage charges are generally ₹20 per executed order for equity delivery and intraday trades, or 0.05% of the trade value.",
    link: "https://upstox.com/"
  },
  {
    id: 3,
    name: "Motilal Oswal",
    image: "/images/motilal.png",
    description: "The broking charges for Equity Delivery is 0.20%, 0.02% for Intraday Futures; and Rs 20 per lot for Equity and Currency Options 0.02% for Futures and Rs 200 per lot for Options and it has variet options for SIP investments.",
    link: "https://www.motilaloswal.com/"
  },
  {
    id: 4,
    name: "ICICI Direct",
    image: "/images/icici.png",
    description: "ICICI Direct's brokerage charges are generally around 0.75% for delivery trades and 0.07% to 0.29% for other segments like intraday, futures, and options. The minimum brokerage is Rs. 35/- per trade or 2.5% of the trade value.",
    link: "https://www.icicidirect.com/"
  },
  {
    id: 5,
    name: "Groww",
    image: "/images/groww.png",
    description: "Groww's brokerage charges for equity trades are capped at ₹20 or 0.1% of the trade value, whichever is lower. For F&O trades, the brokerage is ₹20 per order.",
    link: "https://groww.in/"
  },
  {
    id: 6,
    name: "5paisa",
    image: "/images/5paisa.png",
    description: "5paisa offers a flat brokerage charge of ₹20 per order for all segments, including equity delivery, equity intraday, futures & options. The option trading has more brokerage charges so avoid F&O trading using this platform.",
    link: "https://www.5paisa.com/"
  },
  {
    id: 7,
    name: "Angel One",
    image: "/images/angel.png",
    description: "At Angel One, there is Rs. 0 brokerage charge on equity delivery. On other trades like intraday, futures, options, currency and commodity, the brokerage charge is Rs. 20 per executed order or 0.25% of the transaction value this is a highly recommended site for trading for begginers.",
    link: "https://www.angelone.in/"
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
