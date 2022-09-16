require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");
const {DEPLOY_ACCOUNT_PRIVATE_KEY} = process.env;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.4",
    networks: {
        localhost:{
            url: "http://127.0.0.1:8545/"
        },
        mumbai: {
            url: `https://matic-mumbai.chainstacklabs.com/`,
            chainId: 80001,
            accounts: [`${DEPLOY_ACCOUNT_PRIVATE_KEY}`]
        },
        bsc_testnet: {
            url: `https://data-seed-prebsc-1-s2.binance.org:8545/`,
            chainId: 97,
            gasPrice: 50000000000,
            accounts: [`${DEPLOY_ACCOUNT_PRIVATE_KEY}`]
        },
    },
};
