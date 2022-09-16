// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KEP is ERC20, ERC20Burnable, Ownable {

    mapping (address => bool) public isWhiteListed;


    event AddedWhiteList(address _user);
    event RemovedWhiteList(address _user);

    constructor() ERC20("Kep Token", "KEP") {
        _mint(msg.sender, 1000000000 * 10 ** decimals());
    }

    function addWhiteList(address _goodUser) public onlyOwner {
        isWhiteListed[_goodUser] = true;
        emit AddedWhiteList(_goodUser);
    }

    function removeWhiteList (address _clearedUser) public onlyOwner {
        isWhiteListed[_clearedUser] = false;
        emit RemovedWhiteList(_clearedUser);
    }

    /**
     * @dev See {IERC20-transfer}.
     *
     * Requirements:
     *
     * - `recipient` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(isWhiteListed[msg.sender]  || isWhiteListed[recipient], "EpicWar: blacklisted");

        return super.transfer(recipient, amount);
    }

    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of {ERC20}.
     *
     * Requirements:
     *
     * - `sender` and `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     * - the caller must have allowance for ``sender``'s tokens of at least
     * `amount`.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        require(isWhiteListed[sender] || isWhiteListed[recipient], "EpicWar: blacklisted");

        return super.transferFrom(sender, recipient, amount);
    }

}