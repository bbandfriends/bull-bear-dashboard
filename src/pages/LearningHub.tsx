import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Package, 
  PiggyBank,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Target,
  ArrowRight
} from 'lucide-react';

interface LessonSection {
  title: string;
  content: string;
  tips?: string[];
}

interface Lesson {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  sections: LessonSection[];
  keyTakeaways: string[];
}

const lessons: Lesson[] = [
  {
    id: 'basics',
    title: 'The Basics',
    icon: <BookOpen className="h-5 w-5" />,
    description: 'Foundation of stock market investing',
    duration: '15 min read',
    difficulty: 'Beginner',
    sections: [
      {
        title: 'What is the Stock Market?',
        content: 'The stock market is a platform where buyers and sellers trade shares of publicly listed companies. In India, the two main stock exchanges are the National Stock Exchange (NSE) and the Bombay Stock Exchange (BSE). When you buy a share, you own a small portion of that company.',
        tips: ['NSE has NIFTY 50 as its benchmark index', 'BSE has SENSEX as its benchmark index']
      },
      {
        title: 'Key Participants',
        content: 'The stock market ecosystem includes retail investors (individuals like you), institutional investors (mutual funds, FIIs), brokers (who execute trades), and SEBI (Securities and Exchange Board of India) which regulates the market to protect investors.',
      },
      {
        title: 'How Trading Works',
        content: 'Trading happens through demat accounts (to hold shares) and trading accounts (to buy/sell). Market orders execute immediately at current prices, while limit orders execute only at your specified price. Market hours in India are 9:15 AM to 3:30 PM on weekdays.',
        tips: ['Always use a SEBI-registered broker', 'Keep your trading credentials secure']
      },
      {
        title: 'Understanding Stock Prices',
        content: 'Stock prices are determined by supply and demand. If more people want to buy (demand) than sell (supply), the price goes up. Factors affecting prices include company earnings, economic conditions, industry trends, and market sentiment.',
      },
      {
        title: 'Types of Analysis',
        content: 'Fundamental analysis evaluates a company\'s financial health through ratios like P/E, EPS, and ROE. Technical analysis uses charts and patterns to predict price movements. Many successful investors use a combination of both approaches.',
        tips: ['Start with fundamental analysis for long-term investing', 'Learn chart reading for timing entries and exits']
      }
    ],
    keyTakeaways: [
      'Stock market allows trading of company shares',
      'NSE and BSE are India\'s primary exchanges',
      'Demat and trading accounts are required for trading',
      'Prices are driven by supply and demand',
      'Use both fundamental and technical analysis'
    ]
  },
  {
    id: 'fno',
    title: 'F&O: Futures & Options',
    icon: <TrendingUp className="h-5 w-5" />,
    description: 'Derivatives trading explained',
    duration: '20 min read',
    difficulty: 'Advanced',
    sections: [
      {
        title: 'What are Derivatives?',
        content: 'Derivatives are financial contracts whose value is derived from an underlying asset (stocks, indices, commodities). F&O are the two main types of derivatives traded in Indian markets. They allow you to take positions with less capital through leverage.',
        tips: ['Derivatives require understanding of the underlying asset', 'F&O trading requires separate activation in your account']
      },
      {
        title: 'Futures Contracts',
        content: 'A futures contract is an agreement to buy/sell an asset at a predetermined price on a future date. In India, futures expire on the last Thursday of each month. You can take a long position (expecting price rise) or short position (expecting price fall).',
        tips: ['Futures have unlimited profit AND loss potential', 'Margin requirements are typically 10-15% of contract value']
      },
      {
        title: 'Options Contracts',
        content: 'Options give you the right (not obligation) to buy/sell at a specific price (strike price). Call options profit when prices rise; Put options profit when prices fall. The premium is the cost of buying an option. Options expire worthless if not profitable.',
      },
      {
        title: 'Key Terms in F&O',
        content: 'Lot size is the minimum quantity for trading (e.g., NIFTY lot is 50). Premium is the price paid for options. Strike price is the predetermined buying/selling price. ITM (In The Money), ATM (At The Money), and OTM (Out Of The Money) describe option profitability.',
        tips: ['Option buyers have limited loss (premium paid)', 'Option sellers have unlimited risk']
      },
      {
        title: 'Risk Management',
        content: 'F&O trading is high-risk due to leverage and time decay. Never invest more than you can afford to lose. Use stop-losses strictly. Start with paper trading before using real money. Understand Greeks (Delta, Theta, Gamma, Vega) for options.',
        tips: ['90% of option buyers lose money', 'Time decay accelerates near expiry']
      }
    ],
    keyTakeaways: [
      'Derivatives derive value from underlying assets',
      'Futures have obligations; Options have rights',
      'Leverage amplifies both gains and losses',
      'Options have time decay (Theta)',
      'Risk management is crucial in F&O trading'
    ]
  },
  {
    id: 'intraday',
    title: 'Intraday Trading',
    icon: <Clock className="h-5 w-5" />,
    description: 'Same-day trading strategies',
    duration: '18 min read',
    difficulty: 'Intermediate',
    sections: [
      {
        title: 'What is Intraday Trading?',
        content: 'Intraday trading involves buying and selling stocks within the same trading day. All positions must be squared off before market close (3:30 PM). The goal is to profit from small price movements. Brokers offer higher leverage for intraday trades.',
        tips: ['Intraday requires quick decision-making', 'Positions auto-square off if not closed manually']
      },
      {
        title: 'Intraday vs Delivery Trading',
        content: 'In intraday, you don\'t take ownership of shares—you settle the difference in price. Delivery trading means you hold shares in your demat account. Intraday has lower brokerage and no DP charges but requires more attention and skill.',
      },
      {
        title: 'Popular Intraday Strategies',
        content: 'Scalping involves multiple trades for tiny profits. Momentum trading follows strong trends. Breakout trading enters when price breaks support/resistance. Gap trading exploits price gaps at market open. Each strategy requires practice and discipline.',
        tips: ['Master one strategy before trying others', 'Paper trade for at least 3 months']
      },
      {
        title: 'Technical Indicators for Intraday',
        content: 'Moving averages help identify trends. RSI (Relative Strength Index) shows overbought/oversold conditions. VWAP (Volume Weighted Average Price) indicates fair value. Candlestick patterns reveal market sentiment. Use 5-minute or 15-minute charts.',
        tips: ['Don\'t rely on a single indicator', 'Volume confirms price movements']
      },
      {
        title: 'Intraday Risk Management',
        content: 'Never risk more than 1-2% of capital per trade. Always use stop-losses. Avoid overtrading—quality over quantity. Don\'t trade during high-volatility events. Keep a trading journal to analyze your performance.',
        tips: ['Set daily loss limits and stick to them', 'Most successful traders win only 40-50% of trades']
      }
    ],
    keyTakeaways: [
      'All positions must close same day',
      'Higher leverage but higher risk',
      'Technical analysis is essential',
      'Strict stop-losses are mandatory',
      'Emotional discipline determines success'
    ]
  },
  {
    id: 'delivery',
    title: 'Delivery Trading',
    icon: <Package className="h-5 w-5" />,
    description: 'Long-term investment approach',
    duration: '15 min read',
    difficulty: 'Beginner',
    sections: [
      {
        title: 'What is Delivery Trading?',
        content: 'Delivery trading means buying shares and holding them in your demat account for more than one day. You become a part-owner of the company. There\'s no time limit—you can hold for days, months, or years. This is ideal for wealth creation.',
        tips: ['No time pressure unlike intraday', 'You receive dividends on shares held']
      },
      {
        title: 'Advantages of Delivery Trading',
        content: 'No leverage risk as you pay the full amount. You can benefit from long-term compounding. Tax benefits—LTCG (Long Term Capital Gains) after 1 year is taxed at only 10% above ₹1 lakh. Less stressful than intraday trading.',
      },
      {
        title: 'Selecting Stocks for Delivery',
        content: 'Focus on companies with strong fundamentals: consistent revenue growth, good profit margins, low debt, and quality management. Look at industry leadership and competitive advantages (moats). Blue-chip stocks are safer for beginners.',
        tips: ['Research before investing, not after', 'Diversify across sectors to reduce risk']
      },
      {
        title: 'When to Buy and Sell',
        content: 'Buy when valuations are reasonable (check P/E, P/B ratios). Consider rupee-cost averaging—investing fixed amounts regularly. Sell when fundamentals deteriorate, target is reached, or better opportunities exist. Avoid panic selling during market falls.',
        tips: ['Time in the market beats timing the market', 'Don\'t check portfolio daily—it leads to emotional decisions']
      },
      {
        title: 'Building a Long-term Portfolio',
        content: 'Start with large-cap stocks for stability. Gradually add mid-caps for growth potential. Limit small-caps to 10-15% of portfolio. Rebalance annually. Keep 10-20% in liquid funds for buying opportunities during corrections.',
        tips: ['Aim for 12-15 stocks for good diversification', 'Stay invested through market cycles']
      }
    ],
    keyTakeaways: [
      'Shares are held in demat account',
      'No leverage means lower risk',
      'Focus on fundamentally strong companies',
      'Long-term holding offers tax benefits',
      'Patience and discipline create wealth'
    ]
  },
  {
    id: 'sip',
    title: 'SIP (Systematic Investment Plan)',
    icon: <PiggyBank className="h-5 w-5" />,
    description: 'Regular investment for wealth building',
    duration: '12 min read',
    difficulty: 'Beginner',
    sections: [
      {
        title: 'What is SIP?',
        content: 'SIP is a method of investing a fixed amount regularly (usually monthly) in mutual funds. It automates investing and removes the need to time the market. You can start with as little as ₹500 per month. SIPs work on the principle of rupee cost averaging.',
        tips: ['SIP is not a product, it\'s a method of investing', 'Best suited for long-term goals (5+ years)']
      },
      {
        title: 'How Rupee Cost Averaging Works',
        content: 'When markets are down, your fixed amount buys more units. When markets are up, you buy fewer units. Over time, this averages out your purchase cost. This removes the stress of timing the market and works best with volatility.',
      },
      {
        title: 'Power of Compounding',
        content: 'Compounding means earning returns on your returns. A ₹10,000 monthly SIP at 12% annual return becomes approximately ₹1 crore in 20 years (invested: ₹24 lakhs). Starting early is the key—even 5 years can make a huge difference.',
        tips: ['₹5,000/month SIP for 30 years at 12% = ₹1.76 crore', 'Same SIP for 25 years = ₹95 lakhs—starting early matters!']
      },
      {
        title: 'Choosing the Right Mutual Fund',
        content: 'Equity funds for long-term goals (7+ years), debt funds for short-term (1-3 years), hybrid for medium-term (3-5 years). Check fund\'s track record, expense ratio, and fund manager experience. Index funds are great for beginners.',
        tips: ['Lower expense ratio = higher returns over time', 'Past performance doesn\'t guarantee future returns']
      },
      {
        title: 'SIP Best Practices',
        content: 'Set up auto-debit to ensure consistency. Increase SIP amount annually (step-up SIP). Don\'t stop during market downturns—that\'s when you get more units. Review but don\'t frequently switch funds. Have goal-based SIPs for clarity.',
        tips: ['Treat SIP as a non-negotiable expense', 'Stay invested for full market cycles']
      }
    ],
    keyTakeaways: [
      'SIP automates regular investing',
      'Rupee cost averaging reduces timing risk',
      'Compounding works best with time',
      'Choose funds based on goal timeline',
      'Consistency beats timing'
    ]
  }
];

const LessonCard: React.FC<{ lesson: Lesson; isActive: boolean; onClick: () => void }> = ({ 
  lesson, 
  isActive, 
  onClick 
}) => {
  const difficultyColors = {
    Beginner: 'bg-green-500/10 text-green-600 border-green-500/20',
    Intermediate: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
    Advanced: 'bg-red-500/10 text-red-600 border-red-500/20'
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isActive ? 'ring-2 ring-primary shadow-lg' : 'hover:border-primary/50'
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              {lesson.icon}
            </div>
            <div>
              <CardTitle className="text-lg">{lesson.title}</CardTitle>
              <CardDescription className="text-sm">{lesson.description}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="outline" className={difficultyColors[lesson.difficulty]}>
            {lesson.difficulty}
          </Badge>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {lesson.duration}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

const LessonContent: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 pb-4 border-b">
        <div className="p-3 rounded-xl bg-primary text-primary-foreground">
          {lesson.icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{lesson.title}</h2>
          <p className="text-muted-foreground">{lesson.description}</p>
        </div>
      </div>

      {/* Sections */}
      <ScrollArea className="h-[calc(100vh-320px)]">
        <div className="space-y-8 pr-4">
          {lesson.sections.map((section, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold">{section.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed pl-9">
                {section.content}
              </p>
              {section.tips && section.tips.length > 0 && (
                <div className="pl-9 space-y-2">
                  {section.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-start gap-2 text-sm">
                      <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{tip}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Key Takeaways */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-primary" />
                Key Takeaways
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {lesson.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

const LearningHub = () => {
  const [activeLesson, setActiveLesson] = useState<Lesson>(lessons[0]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            Learning Hub
          </h1>
          <p className="text-muted-foreground mt-1">
            Master stock market fundamentals with our comprehensive lessons
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {lessons.length} Lessons Available
        </Badge>
      </div>

      {/* Info Banner */}
      <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-primary/20">
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Pro Tip:</strong> Start with "The Basics" if you're new to investing. 
              Each lesson builds upon previous concepts for a comprehensive learning experience.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lesson Cards */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
            Select a Lesson
          </h3>
          <div className="space-y-3">
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                isActive={activeLesson.id === lesson.id}
                onClick={() => setActiveLesson(lesson)}
              />
            ))}
          </div>
        </div>

        {/* Lesson Content */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="p-6">
              <LessonContent lesson={activeLesson} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LearningHub;
