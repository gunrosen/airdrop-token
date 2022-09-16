//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";


contract AirdropErc20 is Ownable {

    address public tokenAddress;

    constructor(address _tokenAddr) {
        tokenAddress = _tokenAddr;
    }

    function updateTokenAddress(address newTokenAddr) public onlyOwner {
        tokenAddress = newTokenAddr;
    }

    function dropTokens(address[] memory _recipients, uint256[] memory _amount) public onlyOwner returns (bool) {
        require(_recipients.length == _amount.length, "Recipient array and amount array must be same length");
        for (uint i = 0; i < _recipients.length; i++) {
            require(_recipients[i] != address(0));
            require(IERC20(tokenAddress).transferFrom(msg.sender,_recipients[i], _amount[i]));
        }

        return true;
    }
}

