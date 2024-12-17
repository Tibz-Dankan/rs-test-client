require("dotenv").config();
const { ethers } = require("ethers");

// Load environment variables
const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// Contract ABI
const ABI = [
  "function processConversion(address walletToCharge, string inputNumber, uint8 inputBase, uint8 outputBase) public pure returns (address, string, uint8, uint8, string, string)",
];

(async () => {
  try {
    // Set up provider and signer
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    // Connect to the deployed contract
    const converterContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      ABI,
      wallet
    );

    // Test data
    const walletToCharge = "0x0000000000000000000000000000000000000000"; // Dummy address
    const inputNumber = "1a"; // Example input in hexadecimal
    const inputBase = 16; // Hexadecimal
    const outputBase = 2; // Decimal

    // Call processConversion
    const result = await converterContract.processConversion(
      walletToCharge,
      inputNumber,
      inputBase,
      outputBase
    );

    console.log("Conversion Result:");
    console.log("Wallet Charged:", result[0]);
    console.log("Input Number:", result[1]);
    console.log("Input Base:", result[2]);
    console.log("Output Base:", result[3]);
    console.log("Output Number:", result[4]);
    console.log("Output Hexadecimal:", result[5]);
  } catch (error) {
    console.error("Error:", error);
  }
})();
