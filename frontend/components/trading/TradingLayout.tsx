// Remove 'use client' - this will be a server component that contains client components
// 'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConnectButton } from "@/components/wallet/ConnectButton";
import { PoolInfo } from "@/components/trading/PoolInfo";
import { SwapInterface } from "@/components/trading/SwapInterface";
import { AddLiquidity } from "@/components/trading/AddLiquidity";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "sonner";
import { contractAddress } from "@/lib/contractConfig";
import { ClientTabs } from "./ClientTabs";

export function TradingLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <header className="w-full max-w-5xl mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Minimal Trading Interface</h1>
          <ConnectButton />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          A simple and elegant approach to token exchange
        </p>
        <Separator className="my-4" />
      </header>

      <main className="w-full max-w-5xl flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            <PoolInfo />

            <div className="bg-muted/50 rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4">Simplicity in Trading</h2>
              <p className="text-sm text-muted-foreground">
                We believe that trading doesn't need to be complicated. Our interface strips away unnecessary 
                features to focus on what matters: providing a straightforward way to exchange tokens at a 
                transparent, fixed rate.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-4 space-y-2">
                <li>No complex order books or pricing algorithms</li>
                <li>Clear, predictable exchange rates</li>
                <li>Minimal interface with only the essential controls</li>
                <li>Focus on user experience over flashy features</li>
              </ul>
            </div>
          </div>

          <div>
            <ClientTabs />
          </div>
        </div>
      </main>

      <footer className="w-full max-w-5xl mt-12">
        <Separator className="mb-4" />
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            Contract: {`${contractAddress.substring(0, 6)}...${contractAddress.substring(contractAddress.length - 4)}`}
          </p>
          <p className="text-xs text-muted-foreground">
            Network: Sepolia Testnet
          </p>
        </div>
      </footer>
      
      <Toaster position="bottom-right" />
    </div>
  );
} 