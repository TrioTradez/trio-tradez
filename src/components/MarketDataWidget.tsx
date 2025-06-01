import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowUp, ArrowDown, RefreshCw, LineChart, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AuroraBackground } from './ui/aurora-background';
import { motion } from 'framer-motion';

interface MarketAsset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: string;
}

export const MarketDataWidget: React.FC = () => {
  const [assets, setAssets] = useState<MarketAsset[]>([
    { symbol: 'BTC', name: 'Bitcoin', price: 51432.50, change: 2.4, volume: '23.5B' },
    { symbol: 'ETH', name: 'Ethereum', price: 2897.18, change: 1.2, volume: '11.8B' },
    { symbol: 'AAPL', name: 'Apple Inc.', price: 189.84, change: -0.5, volume: '45.2M' },
    { symbol: 'TSLA', name: 'Tesla', price: 237.49, change: 3.1, volume: '32.1M' },
    { symbol: 'FOREX:EUR/USD', name: 'EUR/USD', price: 1.0845, change: -0.3, volume: '98.4B' }
  ]);
  
  const [loading, setLoading] = useState(false);
  
  // Simulate a data refresh
  const refreshData = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Update with slightly different prices to simulate market movement
      setAssets(assets.map(asset => ({
        ...asset,
        price: parseFloat((asset.price * (1 + (Math.random() * 0.02 - 0.01))).toFixed(2)),
        change: parseFloat((asset.change + (Math.random() * 0.6 - 0.3)).toFixed(1))
      })));
      
      setLoading(false);
    }, 1000);
  };
  
  // Auto refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [assets]);
  
  return (
    <AuroraBackground className="h-auto min-h-[450px] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-lg">
      <motion.div 
        className="relative w-full z-10 backdrop-blur-md bg-white/30 dark:bg-zinc-900/80 rounded-xl overflow-hidden p-2 shadow-inner text-zinc-900 dark:text-zinc-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-zinc-200/30 dark:border-zinc-700/50">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-indigo-500/20 dark:bg-indigo-500/30 backdrop-blur-sm">
                <LineChart className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
              </div>
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 drop-shadow-sm">
                Market Pulse
              </h2>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge className="bg-indigo-500/20 dark:bg-indigo-500/40 text-indigo-700 dark:text-indigo-200 border-none font-medium">
                <span className="flex items-center gap-1">
                  <BarChart3 className="h-3 w-3" />
                  Live Data
                </span>
              </Badge>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={refreshData} 
                disabled={loading}
                className="h-8 w-8 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/40 dark:hover:bg-black/40"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto p-2">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-200/30 dark:border-zinc-700/50 text-xs">
                  <th className="px-6 py-3 text-left font-medium text-zinc-700 dark:text-zinc-300">Asset</th>
                  <th className="px-4 py-3 text-right font-medium text-zinc-700 dark:text-zinc-300">Price</th>
                  <th className="px-4 py-3 text-right font-medium text-zinc-700 dark:text-zinc-300">24h Change</th>
                  <th className="px-6 py-3 text-right hidden md:table-cell font-medium text-zinc-700 dark:text-zinc-300">Volume</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset, index) => (
                  <motion.tr 
                    key={asset.symbol} 
                    className="border-b border-zinc-200/20 dark:border-zinc-700/30 hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold">{asset.symbol}</span>
                        <span className="text-xs text-zinc-600 dark:text-zinc-400">{asset.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right font-mono font-medium">
                      {asset.symbol.includes('FOREX') 
                        ? asset.price.toFixed(4) 
                        : asset.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })
                      }
                    </td>
                    <td className="px-4 py-4 text-right">
                      <motion.div 
                        className={`flex items-center justify-end gap-1 ${asset.change >= 0 ? 'text-green-500' : 'text-red-500'}`}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.05 + 0.2, duration: 0.2 }}
                      >
                        <div className={`p-1 rounded-full ${asset.change >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                          {asset.change >= 0 ? (
                            <ArrowUp className="h-3 w-3" />
                          ) : (
                            <ArrowDown className="h-3 w-3" />
                          )}
                        </div>
                        <span className="font-semibold">{Math.abs(asset.change)}%</span>
                      </motion.div>
                    </td>
                    <td className="px-6 py-4 text-right hidden md:table-cell text-zinc-600 dark:text-zinc-400 font-medium">
                      {asset.volume}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
};
