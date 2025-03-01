import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { sepolia } from 'wagmi/chains';

// Configure wagmi config with RainbowKit's getDefaultConfig
export const wagmiConfig = getDefaultConfig({
  appName: 'Simple Trading Interface',
  projectId: '39a0bc11fd79be5a0b6de00df7655461', // Demo projectId, replace with your own in production
  chains: [sepolia],
  transports: {
    [sepolia.id]: http()
  }
});

// Export chains for RainbowKit provider
export const chains = [sepolia]; 