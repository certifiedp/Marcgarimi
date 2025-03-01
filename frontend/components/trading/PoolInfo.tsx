// 'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { tradingConfig } from '@/lib/contractConfig';
import { ClientPoolInfo } from './ClientPoolInfo';

export function PoolInfo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Pool Information</CardTitle>
        <CardDescription>
          Current liquidity ratio is {tradingConfig.poolRatio}:1 ({tradingConfig.tokenX.symbol}:{tradingConfig.tokenY.symbol})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ClientPoolInfo />
      </CardContent>
    </Card>
  );
} 