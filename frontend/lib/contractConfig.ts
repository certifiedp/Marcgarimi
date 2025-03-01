export const poolAbi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "addX",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "addY",
        "type": "uint256"
      }
    ],
    "name": "add_liquidity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pool_state",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "supply_x",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "supply_y",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "deposited_x",
        "type": "uint256"
      }
    ],
    "name": "swap_y",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "deposited_y",
        "type": "uint256"
      }
    ],
    "name": "swap_x",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Replace with the actual deployed contract address on Sepolia
export const contractAddress = "0xA403656190bA1eA5D4B893D365647cb77DdEa927";

// Configuration for the trading pairs
export const tradingConfig = {
  tokenX: {
    name: 'Token X',
    symbol: 'X',
    decimals: 18
  },
  tokenY: {
    name: 'Token Y',
    symbol: 'Y',
    decimals: 18
  },
  // The pool ratio is 5:1 (X:Y) as defined in the smart contract
  poolRatio: 5
}; 