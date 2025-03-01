'use client';

import { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { poolAbi, contractAddress, tradingConfig } from '@/lib/contractConfig';

export function PoolInfo() {
  const [supplyX, setSupplyX] = useState<string>('--');
  const [supplyY, setSupplyY] = useState<string>('--');
  
  // Read the pool state from the smart contract
  const { data: poolState, isLoading, isError } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: poolAbi,
    functionName: 'pool_state',
  });

  useEffect(() => {
    if (poolState && Array.isArray(poolState)) {
      // Convert BigInt to string to avoid serialization issues
      setSupplyX(poolState[0].toString());
      setSupplyY(poolState[1].toString());
    }
  }, [poolState]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Pool Information</CardTitle>
        <CardDescription>
          Current liquidity ratio is {tradingConfig.poolRatio}:1 ({tradingConfig.tokenX.symbol}:{tradingConfig.tokenY.symbol})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total {tradingConfig.tokenX.symbol} Supply:</span>
            <span className="font-medium">{supplyX} {tradingConfig.tokenX.symbol}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total {tradingConfig.tokenY.symbol} Supply:</span>
            <span className="font-medium">{supplyY} {tradingConfig.tokenY.symbol}</span>
          </div>
          <Separator className="my-2" />
          {isLoading && <div className="text-sm text-center text-muted-foreground">Loading pool data...</div>}
          {isError && <div className="text-sm text-center text-destructive">Error loading pool data</div>}
        </div>
      </CardContent>
    </Card>
  );
} 