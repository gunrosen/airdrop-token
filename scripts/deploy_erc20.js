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

    // Deploy ERC20 token
    const Erc20 = await hre.ethers.getContractFactory("Token");
    const erc20Contract = await Erc20.deploy();
    await erc20Contract.deployed();

    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Erc20 address:", erc20Contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });