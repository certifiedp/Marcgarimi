'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { poolAbi, contractAddress, tradingConfig } from '@/lib/contractConfig';
import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { toast } from 'sonner';

type SwapDirection = 'xToY' | 'yToX';

export function SwapInterface() {
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState<string>('');
  const [direction, setDirection] = useState<SwapDirection>('xToY');
  const [isLoading, setIsLoading] = useState(false);
  const [estimatedOutput, setEstimatedOutput] = useState<string>('0');

  // Determine the function name based on swap direction
  const functionName = direction === 'xToY' ? 'swap_y' : 'swap_x';
  
  // Get pool state for calculations
  const { data: poolState } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: poolAbi,
    functionName: 'pool_state',
  });
  
  // Setup contract write hooks
  const { writeContract, isPending, isSuccess, isError, error } = useWriteContract();

  // Calculate estimated output based on the pool state
  useEffect(() => {
    if (poolState && amount && parseFloat(amount) > 0) {
      try {
        const amountBN = parseEther(amount);
        const ratio = tradingConfig.poolRatio;
        const supplyX = (poolState as any)[0];
        const supplyY = (poolState as any)[1];
        
        // Very simplified calculation based on the smart contract logic
        // In a real app, this should mirror the contract's exact math
        if (direction === 'xToY') {
          // Depositing X, getting Y
          const estimatedY = amountBN / BigInt(ratio);
          setEstimatedOutput(formatEther(estimatedY));
        } else {
          // Depositing Y, getting X
          const estimatedX = amountBN * BigInt(ratio);
          setEstimatedOutput(formatEther(estimatedX));
        }
      } catch (e) {
        setEstimatedOutput('0');
      }
    } else {
      setEstimatedOutput('0');
    }
  }, [amount, direction, poolState]);

  // Handle success and error states
  useEffect(() => {
    if (isSuccess) {
      toast.success('Swap executed successfully!');
      setAmount('');
      setIsLoading(false);
    }
    if (isError) {
      toast.error(`Swap failed: ${error?.message || 'Unknown error'}`);
      setIsLoading(false);
    }
  }, [isSuccess, isError, error]);

  // Handle the swap
  const handleSwap = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    setIsLoading(true);
    try {
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: poolAbi,
        functionName,
        args: [parseEther(amount)]
      });
    } catch (e) {
      setIsLoading(false);
      toast.error(`Transaction failed: ${(e as Error).message}`);
    }
  };

  // Toggle the swap direction
  const toggleDirection = () => {
    setDirection(prev => prev === 'xToY' ? 'yToX' : 'xToY');
    setAmount('');
  };

  // Get token labels based on direction
  const inputToken = direction === 'xToY' ? tradingConfig.tokenX : tradingConfig.tokenY;
  const outputToken = direction === 'xToY' ? tradingConfig.tokenY : tradingConfig.tokenX;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Swap Tokens</CardTitle>
        <CardDescription>Trade {inputToken.name} for {outputToken.name} at a simple fixed rate</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">You Pay</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="amount"
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isLoading || isPending}
            />
            <div className="w-24 text-right font-medium">{inputToken.symbol}</div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full" 
            onClick={toggleDirection}
            disabled={isLoading || isPending}
          >
            ↓↑
          </Button>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="receive">You Receive (estimated)</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="receive"
              type="text"
              placeholder="0.0"
              value={estimatedOutput}
              disabled
              className="bg-muted"
            />
            <div className="w-24 text-right font-medium">{outputToken.symbol}</div>
          </div>
        </div>
        
        <Separator />
        
        <div className="text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Rate</span>
            <span>
              {direction === 'xToY' 
                ? `1 ${inputToken.symbol} = ${1/tradingConfig.poolRatio} ${outputToken.symbol}` 
                : `1 ${inputToken.symbol} = ${tradingConfig.poolRatio} ${outputToken.symbol}`}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleSwap}
          disabled={!isConnected || isLoading || isPending || !amount || parseFloat(amount) <= 0}
        >
          {isLoading || isPending ? 'Processing...' : isConnected ? 'Swap' : 'Connect Wallet to Swap'}
        </Button>
      </CardFooter>
    </Card>
  );
} 