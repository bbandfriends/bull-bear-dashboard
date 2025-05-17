
import React, { useState } from 'react';
import { 
  ChartBarBig, 
  ChartColumnStacked, 
  Home, 
  Settings, 
  ChartLine, 
  ThumbsUp, 
  ChartPie, 
  Menu, 
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

type MenuItem = {
  icon: React.ElementType;
  label: string;
  path: string;
  active?: boolean;
};

const menuItems: MenuItem[] = [
  { icon: Home, label: 'Dashboard', path: '/', active: true },
  { icon: ChartBarBig, label: 'Market Overview', path: '/market' },
  { icon: ChartLine, label: 'Stocks', path: '/stocks' },
  { icon: ThumbsUp, label: 'Recommendations', path: '/recommendations' },
  { icon: ChartPie, label: 'Portfolio', path: '/portfolio' },
  { icon: ChartColumnStacked, label: 'Watchlist', path: '/watchlist' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleCollapse = () => setCollapsed(!collapsed);
  const toggleMobile = () => setMobileOpen(!mobileOpen);
  
  const handleMenuClick = (path: string) => {
    navigate(path);
    if (mobileOpen) setMobileOpen(false);
  };
  
  return (
    <>
      {/* Mobile menu button */}
      <button 
        className="fixed bottom-4 right-4 z-40 md:hidden bg-primary text-white p-3 rounded-full shadow-lg"
        onClick={toggleMobile}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
          collapsed ? "w-[70px]" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center">
              <ChartBarBig className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-bold text-sidebar-foreground">StockVista</span>
            </div>
          )}
          
          <button 
            onClick={toggleCollapse} 
            className="hidden md:flex items-center justify-center h-8 w-8 rounded-md hover:bg-sidebar-accent"
          >
            <Menu className="h-4 w-4 text-sidebar-foreground" />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button 
                  onClick={() => handleMenuClick(item.path)}
                  className={cn(
                    "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    item.active 
                      ? "bg-sidebar-accent text-sidebar-foreground" 
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="border-t border-sidebar-border p-4">
          {!collapsed && (
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary"></div>
              <div className="ml-3">
                <p className="text-sm font-medium text-sidebar-foreground">Raj Sharma</p>
                <p className="text-xs text-sidebar-foreground/70">Premium User</p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
