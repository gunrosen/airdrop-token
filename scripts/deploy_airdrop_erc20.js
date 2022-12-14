// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // We get the contract to deploy
    const [deployer] = await hre.ethers.getSigners();

    // Deploy Airdrop contract
    const AirdropErc20 = await hre.ethers.getContractFactory("AirdropErc20");
    const airdropErc20Contract = await AirdropErc20.deploy('0xeb74C1d56e2CBe9AE59722Cc76080288855305cE');
    await airdropErc20Contract.deployed();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("AirdropErc20 address:", airdropErc20Contract.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });