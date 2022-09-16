//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Token is ERC20 {
    constructor() ERC20("Hulk", "HULk") {
        _mint(msg.sender, 100000 * 10**uint256(18));
    }
}