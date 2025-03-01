'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { poolAbi, contractAddress, tradingConfig } from '@/lib/contractConfig';
import { useWriteContract, useAccount } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { toast } from 'sonner';

export function AddLiquidity() {
  const { isConnected } = useAccount();
  const [amountX, setAmountX] = useState<string>('');
  const [amountY, setAmountY] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Update the Y amount based on X and the pool ratio
  useEffect(() => {
    if (amountX) {
      try {
        const xValue = parseFloat(amountX);
        // Calculate Y based on the 5:1 ratio from the contract
        const yValue = xValue / tradingConfig.poolRatio;
        setAmountY(yValue.toString());
      } catch (e) {
        setAmountY('');
      }
    } else {
      setAmountY('');
    }
  }, [amountX]);

  // Setup contract write hooks
  const { writeContract, isPending, isSuccess, isError, error } = useWriteContract();

  // Handle success and error states
  useEffect(() => {
    if (isSuccess) {
      toast.success('Liquidity added successfully!');
      setAmountX('');
      setAmountY('');
      setIsLoading(false);
    }
    if (isError) {
      toast.error(`Failed to add liquidity: ${error?.message || 'Unknown error'}`);
      setIsLoading(false);
    }
  }, [isSuccess, isError, error]);

  // Handle the add liquidity
  const handleAddLiquidity = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }
    
    if (!amountX || !amountY || parseFloat(amountX) <= 0 || parseFloat(amountY) <= 0) {
      toast.error('Please enter valid amounts');
      return;
    }
    
    // Verify the ratio is correct
    const xValue = parseFloat(amountX);
    const yValue = parseFloat(amountY);
    const ratio = xValue / yValue;
    
    if (Math.abs(ratio - tradingConfig.poolRatio) > 0.01) {
      toast.error(`Amounts must maintain the ${tradingConfig.poolRatio}:1 ratio`);
      return;
    }
    
    setIsLoading(true);
    try {
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: poolAbi,
        functionName: 'add_liquidity',
        args: [parseEther(amountX), parseEther(amountY)]
      });
    } catch (e) {
      setIsLoading(false);
      toast.error(`Failed to add liquidity: ${(e as Error).message}`);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add Liquidity</CardTitle>
        <CardDescription>
          Provide tokens to the pool in a {tradingConfig.poolRatio}:1 ratio ({tradingConfig.tokenX.symbol}:{tradingConfig.tokenY.symbol})
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amountX">{tradingConfig.tokenX.symbol} Amount</Label>
          <Input
            id="amountX"
            type="number"
            placeholder="0.0"
            value={amountX}
            onChange={(e) => setAmountX(e.target.value)}
            disabled={isLoading || isPending}
          />
        </div>
        
        <div className="flex justify-center">
          <div className="rounded-full bg-muted px-3 py-1 text-xs">
            {tradingConfig.poolRatio}:1 ratio
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="amountY">{tradingConfig.tokenY.symbol} Amount</Label>
          <Input
            id="amountY"
            type="number"
            placeholder="0.0"
            value={amountY}
            onChange={(e) => setAmountY(e.target.value)}
            disabled
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            Amount calculated automatically based on the {tradingConfig.poolRatio}:1 ratio
          </p>
        </div>
        
        <Separator />
        
        <div className="text-sm text-muted-foreground">
          <p>Adding liquidity requires you to deposit both tokens in the specified ratio.</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleAddLiquidity}
          disabled={!isConnected || isLoading || isPending || !amountX || !amountY || parseFloat(amountX) <= 0 || parseFloat(amountY) <= 0}
        >
          {isLoading || isPending ? 'Processing...' : isConnected ? 'Add Liquidity' : 'Connect Wallet to Add Liquidity'}
        </Button>
      </CardFooter>
    </Card>
  );
} 