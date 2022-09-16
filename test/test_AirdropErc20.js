const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const {anyValue} = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const {expect} = require("chai");
const hre = require("hardhat");

const dataAirdrop = [
    {
        address: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
        amount: 1111
    },
    {
        address: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        amount: 12
    },
    {
        address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        amount: 13
    },
    {
        address: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
        amount: 15
    },
    {
        address: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
        amount: 1
    },
    {
        address: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
        amount: 120
    },
    {
        address: "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
        amount: 115
    },
    {
        address: "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
        amount: 5000
    },
    {
        address: "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
        amount: 12000
    },
]

describe.only("AirdropErc20", function () {
    async function initFixture() {
        // Contracts are deployed using the first signer/account by default
        const [deployer] = await ethers.getSigners();

        const Erc20 = await hre.ethers.getContractFactory("Token");
        const erc20Contract = await Erc20.deploy();
        await erc20Contract.deployed();

        // Deploy Airdrop contract
        const AirdropErc20 = await hre.ethers.getContractFactory("AirdropErc20");
        const airdropErc20Contract = await AirdropErc20.deploy(erc20Contract.address);
        await airdropErc20Contract.deployed();

        // Transfer erc20 to airdrop contract
        // await erc20Contract.connect(deployer).transfer(airdropErc20Contract.address, ethers.utils.parseUnits("150000"));

        // Deployer approve erc20 to airdrop contract
        await erc20Contract.connect(deployer).approve(airdropErc20Contract.address, ethers.utils.parseUnits("150000"));

        console.log("Deploying contracts with the account:", deployer.address);
        console.log("Erc20 address:", erc20Contract.address);
        console.log("AirdropErc20 address:", airdropErc20Contract.address);
        console.log("AirdropErc20 owner address:", await airdropErc20Contract.owner());
        console.log("AirdropErc20 token address:", await airdropErc20Contract.tokenAddress());

        console.log("Deployer approve for AirdropErc20 using:", await erc20Contract.allowance(deployer.address, airdropErc20Contract.address));

        return {erc20Contract, airdropErc20Contract, deployer};
    }

    describe("Test airdrop", function () {
        it("Should airdrop right", async function () {
            const {erc20Contract, airdropErc20Contract, deployer} = await loadFixture(initFixture);
            let arrAddress = []
            let arrAmount = []
            for (let i=0 ; i < dataAirdrop.length ; i++){
                arrAddress.push(dataAirdrop[i].address)
                arrAmount.push(ethers.utils.parseUnits(dataAirdrop[i].amount.toString()))
            }
            await erc20Contract.connect(deployer).transfer(arrAddress[1], ethers.utils.parseUnits("100"))
            console.log("BALANCE CHECK ERC20")
            console.log(`Balance of deployer: ${await erc20Contract.balanceOf(deployer.address)}`)
            console.log(`Balance of airdrop contract: ${await erc20Contract.balanceOf(airdropErc20Contract.address)}`)
            console.log(`Balance of user 1: ${await erc20Contract.balanceOf(arrAddress[1])}`)


            await airdropErc20Contract.connect(deployer).dropTokens(arrAddress,arrAmount)
            // Check results
            let check = false
            for (let i=0 ; i < dataAirdrop.length ; i++){
                const amount = await erc20Contract.balanceOf(dataAirdrop[i].address)
                if (parseInt(ethers.utils.formatEther(amount)) === dataAirdrop[i].amount) {
                    check = true
                }
                console.log(`${check} ${dataAirdrop[i].address} : ${ethers.utils.formatEther(amount)}`)
            }
        });
    });
});
