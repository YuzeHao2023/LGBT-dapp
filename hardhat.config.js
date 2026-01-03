import "@nomicfoundation/hardhat-toolbox";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type import('hardhat/config').HardhatUserConfig */
export default {
  solidity: "0.8.17",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  networks: {
    hardhat: {}
  }
};
