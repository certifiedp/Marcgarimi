// Script to deploy the Pool contract
const hre = require("hardhat");

async function main() {
  console.log("Deploying Pool contract...");
  
  // Get the contract factory
  const Pool = await hre.ethers.getContractFactory("Pool");
  
  // Deploy the contract
  const pool = await Pool.deploy();
  
  // Wait for deployment to finish
  await pool.waitForDeployment();
  
  const address = await pool.getAddress();
  console.log("Pool contract deployed to:", address);
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 