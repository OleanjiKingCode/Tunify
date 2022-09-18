
const hre = require("hardhat");
const filesys = require("fs");

async function main() {
  const Tunify = await ethers.getContractFactory("Tunify");
  const tunify = await Tunify.deploy();
  await tunify.deployed();
  console.log("Tunify dapp deployed to:", tunify.address);

  
  filesys.writeFileSync('./constant.js' , `
  export const TunifyAddress ="${tunify.address}"
  `)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
