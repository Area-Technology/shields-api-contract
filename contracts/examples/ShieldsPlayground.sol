// SPDX-License-Identifier: The Unlicense
pragma solidity ^0.8.9;

import "@rari-capital/solmate/src/tokens/ERC721.sol";
import "@areatechnology/shields-api/contracts/ShieldsAPIConsumer.sol";
import "base64-sol/base64.sol";

contract ShieldsPlayground is ERC721, ShieldsAPIConsumer {
    struct Shield {
        uint16 field;
        uint16 hardware;
        uint16 frame;
        uint24[4] colors;
    }
    uint256 private counter;
    mapping(uint256 => Shield) private _storage;

    constructor() ERC721("Shields Playground", "SHIELDSPLAY") {}

    function mint(
        uint16 field,
        uint24[4] memory colors,
        uint16 hardware,
        uint16 frame
    ) public {
        unchecked {
            counter++;
        }
        _storage[counter] = Shield(field, hardware, frame, colors);
        _mint(msg.sender, counter);
    }

    function tokenURI(uint256 id) public view override returns (string memory) {
        require(id <= counter);
        Shield memory _shield = _storage[id];
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        abi.encodePacked(
                            '{"name": "Shield", "description": "...", "image": "',
                            abi.encodePacked(
                                "data:image/svg+xml;base64,",
                                Base64.encode(
                                    abi.encodePacked(
                                        ShieldsAPI.getShieldSVG(
                                            _shield.field,
                                            _shield.colors,
                                            _shield.hardware,
                                            _shield.frame
                                        )
                                    )
                                )
                            ),
                            '"}'
                        )
                    )
                )
            );
    }
}
