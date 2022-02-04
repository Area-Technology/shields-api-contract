// SPDX-License-Identifier: The Unlicense
pragma solidity ^0.8.9;

import {IShieldsAPI} from "./interfaces/IShieldsAPI.sol";

abstract contract ShieldsAPIConsumer {
    IShieldsAPI internal constant ShieldsAPI =
        IShieldsAPI(0x740CBbF0116a82F64e83E1AE68c92544870B0C0F);
}
