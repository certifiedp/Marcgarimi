'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SwapInterface } from "@/components/trading/SwapInterface";
import { AddLiquidity } from "@/components/trading/AddLiquidity";

export function ClientTabs() {
  return (
    <Tabs defaultValue="swap" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="swap">Swap</TabsTrigger>
        <TabsTrigger value="liquidity">Add Liquidity</TabsTrigger>
      </TabsList>
      <TabsContent value="swap" className="mt-4">
        <SwapInterface />
      </TabsContent>
      <TabsContent value="liquidity" className="mt-4">
        <AddLiquidity />
      </TabsContent>
    </Tabs>
  );
} 