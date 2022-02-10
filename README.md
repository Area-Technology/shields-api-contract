# Shields API

The Shields API contract makes it simple to work with the Shields design system on-chain.

## Installation

To install with [**Foundry**](https://github.com/gakonst/foundry):

```sh
forge install areatechnology/shields-api
```

To install with [**Hardhat**](https://github.com/nomiclabs/hardhat) or [**Truffle**](https://github.com/trufflesuite/truffle):

```sh
npm install @areatechnology/shields-api
```

## Usage

Import the `ShieldsAPIConsumer` contract and inherit it to access ShieldsAPI and all its methods.

```sol

import "@areatechnology/shields-api/contracts/ShieldsAPIConsumer.sol";

contract MyContract is ShieldsAPIConsumer {

  function myFunction() public {
    // Any methods in the ShieldsAPI contract can be accessed this way
    string memory svg = ShieldsAPI.getShieldSVG(1);
  }

}
```

## Shields

### getShield(uint256 shieldId)

Returns complete information about a Shield in the Shields collection.

```sol
function getShield(uint256 shieldId) external view returns (IShields.Shield memory);
```

### getShieldSVG(uint256 shieldId)

Returns an svg string for a Shield in the Shields collection. If unbuilt, the SVG will be of a Shield Badge.

```sol
function getShieldSVG(uint256 shieldId) external view returns (string memory);
```

### getShieldSVG(uint16 field, uint24[4] memory colors, uint16 hardware, uint16 frame)

Returns an svg string for a Shield with the specified configuration.

```sol
function getShieldSVG(uint16 field, uint24[4] memory colors, uint16 hardware, uint16 frame) external view returns (string memory);
```

### getShieldSVG(uint16 field, uint24[4] memory colors, uint16 hardware, uint16 frame)

Returns an svg string for a Shield with the specified configuration.

```sol
function getShieldSVG(uint16 field, uint24[4] memory colors, uint16 hardware, uint16 frame) external view returns (string memory);
```

### isShieldBuilt(uint256 shieldId)

Returns true if the Shield with the specified id has been built in the Shields collection.

```sol
function isShieldBuilt(uint256 shieldId) external view returns (bool);
```

## Fields

### getField(uint16 field, uint24[4] memory colors)

Returns complete information about a Field.

```sol
function getField(uint16 field, uint24[4] memory colors) external view returns (IFieldGenerator.FieldData memory);
```

### getFieldTitle(uint16 field, uint24[4] memory colors)

Returns the title for a Field.

```sol
function getFieldTitle(uint16 field, uint24[4] memory colors) external view returns (string memory);
```

### getFieldSVG(uint16 field, uint24[4] memory colors)

Returns an svg string for a Field with the specified id and colors.

```sol
function getFieldSVG(uint16 field, uint24[4] memory colors) external view returns (string memory);
```

## Hardware

### getHardware(uint16 hardware)

Returns complete information about a Hardware.

```sol
function getHardware(uint16 hardware) external view returns (IHardwareGenerator.HardwareData memory);
```

### getHardwareTitle(uint16 hardware)

Returns the title for a Hardware.

```sol
function getHardwareTitle(uint16 hardware) external view returns (string memory);
```

### getHardwareSVG(uint16 hardware)

Returns an svg string for a Hardware with the specified id.

```sol
function getHardwareSVG(uint16 hardware) external view returns (string memory);
```

## Frames

### getFrame(uint16 frame)

Returns complete information about a Frame.

```sol
function getFrame(uint16 frame) external view returns (IFrameGenerator.FrameData memory);
```

### getFrameTitle(uint16 frame)

Returns the title for a Frame.

```sol
function getFrameTitle(uint16 frame) external view returns (string memory);
```

### getFrameSVG(uint16 frame)

Returns an svg string for a Frame with the specified id.

```sol
function getFrameSVG(uint16 frame) external view returns (string memory);
```
