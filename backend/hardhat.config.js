require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// Get the private key and API URL from the .env file
// (or use an empty string if not defined)
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const SEPOLIA_API_URL = process.env.SEPOLIA_API_URL || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: SEPOLIA_API_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      chainId: 11155111
    },
    // You can also add other networks here
    hardhat: {
      // Local development network
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
