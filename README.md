# TradeZ

## About TradeZ

TradeZ is a minimal, user-friendly decentralized trading interface that simplifies token exchange. We've stripped away unnecessary complexity to focus on what matters most: providing a straightforward way to exchange tokens at transparent, fixed rates.

**Why overcomplicate the wheel?**

Built for the ETHDenver Hackathon 2024, TradeZ demonstrates how trading doesn't need to be complicated. Our interface provides all the essential functionality without the overwhelming features found in many trading platforms.

## Features

- **Simple Swap Interface**: Exchange tokens with just a few clicks
- **Fixed Rate Pool**: Transparent pricing with predictable rates
- **Add Liquidity**: Contribute to the trading pool with the correct token ratio
- **Wallet Integration**: Seamless connection with your Web3 wallet
- **Responsive Design**: Works on desktop and mobile devices
- **Server-Side Optimization**: Minimal client-side rendering for better performance

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Smart Contracts**: Solidity, Hardhat
- **Wallet Connection**: RainbowKit, wagmi
- **Styling**: Tailwind CSS, shadcn/ui
- **Deployment**: Sepolia Testnet

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v18 or later)
- npm or yarn
- Git
- MetaMask or another Web3 wallet browser extension
- Some Sepolia ETH for testing (available from [Sepolia faucets](https://sepolia-faucet.pk910.de/))

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/certifiedp/TradeZ.git
cd TradeZ
```

### Frontend Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Create a `.env.local` file in the `frontend` directory:

```
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
npm start
```

### Backend Setup

1. Install dependencies:

```bash
cd backend
npm install
```

2. Create a `.env` file in the `backend` directory using the provided example:

```bash
cp .env.example .env
```

3. Edit the `.env` file with your own values:
   - `PRIVATE_KEY`: Your Ethereum private key (without 0x prefix)
   - `SEPOLIA_API_URL`: Your Alchemy/Infura Sepolia API URL

4. Compile the contracts:

```bash
npx hardhat compile
```

5. Deploy to Sepolia testnet:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

6. Note the deployed contract address and update it in `frontend/lib/contractConfig.ts`

## 🔍 Project Structure

```
TradeZ/
├── frontend/                 # Next.js frontend application
│   ├── app/                  # Next.js app directory
│   ├── components/           # React components
│   │   ├── providers/        # Context providers
│   │   ├── trading/          # Trading-specific components
│   │   ├── ui/               # UI components from shadcn
│   │   └── wallet/           # Wallet connection components
│   ├── lib/                  # Utility functions and configurations
│   └── public/               # Static assets
│
└── backend/                  # Hardhat project for smart contracts
    ├── contracts/            # Solidity smart contracts
    ├── scripts/              # Deployment scripts
    └── test/                 # Contract tests
```

## Usage

1. **Connect Wallet**: Click the "Connect Wallet" button in the top-right corner
2. **Swap Tokens**: 
   - Go to the "Swap" tab
   - Enter the amount of tokens you want to exchange
   - Click "Swap" to execute the transaction
3. **Add Liquidity**:
   - Go to the "Add Liquidity" tab
   - Enter the amount for one token (the other will be calculated automatically)
   - Click "Add Liquidity" to provide liquidity to the pool

## Screenshots

![Trading Interface](https://via.placeholder.com/800x450/4F46E5/FFFFFF?text=Trading+Interface)
![Liquidity Pool](https://via.placeholder.com/800x450/4F46E5/FFFFFF?text=Liquidity+Pool)

## Testing

### Frontend Tests

```bash
cd frontend
npm test
```

### Smart Contract Tests

```bash
cd backend
npx hardhat test
```

### Problem Statement

Many DeFi trading interfaces are unnecessarily complex, with overwhelming UIs and complicated features that alienate new users. TradeZ addresses this by providing a minimalist trading experience focused on usability and transparency.

### Innovation

TradeZ uses a hybrid rendering approach that optimizes for both performance and interactivity, leveraging Next.js 15's Server and Client Components. This creates a fast, responsive user experience while maintaining all the functionality expected from a trading interface.

### Technical Implementation

- Smart contract implements a simple but effective constant product pool
- Frontend optimizes client/server rendering boundaries for optimal performance
- RainbowKit integration provides seamless wallet connection
- Responsive design works across all devices
