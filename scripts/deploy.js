import { ethers } from "hardhat";

async function main() {
  const Social = await ethers.getContractFactory("SocialProtocol");
  const social = await Social.deploy();
  await social.waitForDeployment();
  console.log("SocialProtocol deployed to:", social.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
