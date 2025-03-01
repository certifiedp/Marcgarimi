//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.0;

contract Pool {

    uint256 public supply_x = 5;
    uint256 public supply_y = 1;
    uint256 ratio = 5;

    // returns the state of the pool
    function pool_state() public view returns (uint256, uint256) {
        return (supply_x, supply_y);
    }

    // 5:1 x:y ratio
    function add_liquidity(uint256 addX, uint256 addY) public {
        require(addX > 0, "Invalid Input");
        require(addY > 0 && addX == ratio * addY);
        supply_x += addX;
        supply_y += addY;
    }

    function swap_x(uint256 deposited_y) public {
        require(deposited_y > 0, "Invalid Input");
        uint256 new_supply_y = deposited_y + supply_y;
        uint256 difference_x = ratio / deposited_y;
        require(difference_x <= supply_x, "Not enough liquidity");
        uint256 swapped_x = supply_x - difference_x;
        supply_x = swapped_x;
        supply_y = new_supply_y;
    }

    function swap_y(uint256 deposited_x) public {
        require(deposited_x > 0, "Invalid Input");
        uint256 new_supply_x = deposited_x + supply_x;
        uint256 difference_y = ratio / deposited_x;
        require(difference_y <= supply_y, "Not enough liquidity");
        uint256 swapped_y = supply_y - difference_y;
        supply_y = swapped_y;
        supply_x = new_supply_x;
    }
}