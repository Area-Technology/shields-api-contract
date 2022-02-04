import * as chai from 'chai';
import { Signer } from 'ethers';
import chaiAsPromised from 'chai-as-promised';
import { expect } from 'chai';
import { jestSnapshotPlugin } from 'mocha-chai-jest-snapshot';
import { ShieldsAPI } from '../typechain';
chai.use(chaiAsPromised);
chai.use(jestSnapshotPlugin());

//@ts-ignore
import { ethers } from 'hardhat';

const SHIELDS_ADDRESS = '0x0747118C9F44C7a23365b2476dCD05E03114C747';
const EMBLEMWEAVER_ADDRESS = '0x3E2063199F7b98b8188B7649d95bd0C82f4B0001';
const FIELD_GENERATOR = '0x0230eB753Df1A12063B357EB5e3A4F9Ce0780C1F';
const HARDWARE_GENERATOR = '0x355944B17A0770190eCB375ec3E64b98Cb31a576';
const FRAME_GENERATOR = '0x3b6cdEC2F91F4C7780C966B7Bfc6a8f55083863e';

describe('ShieldsAPI', function () {
  let accounts: Signer[] = [];
  let addresses: string[] = [];
  let shieldsAPI: ShieldsAPI;

  this.beforeAll(async () => {
    accounts = await ethers.getSigners();
    addresses = await Promise.all(accounts.map(signer => signer.getAddress()));

    const ShieldsAPI = await ethers.getContractFactory('ShieldsAPI');
    shieldsAPI = (await ShieldsAPI.deploy(SHIELDS_ADDRESS)) as ShieldsAPI;
    await shieldsAPI.deployed();
  });

  it('should be initialized with generator addresses', async function () {
    expect(await shieldsAPI.shields()).to.equal(SHIELDS_ADDRESS);
    expect(await shieldsAPI.emblemWeaver()).to.equal(EMBLEMWEAVER_ADDRESS);
    expect(await shieldsAPI.fieldGenerator()).to.equal(FIELD_GENERATOR);
    expect(await shieldsAPI.hardwareGenerator()).to.equal(HARDWARE_GENERATOR);
    expect(await shieldsAPI.frameGenerator()).to.equal(FRAME_GENERATOR);
  });

  // Shields
  it('should retrieve correct shield data', async function () {
    expect(await shieldsAPI.getShield(1)).to.matchSnapshot();
    expect(await shieldsAPI.getShield(5)).to.matchSnapshot();
  });
  it('should retrieve correct shield svg using ids', async function () {
    expect(await shieldsAPI['getShieldSVG(uint256)'](1)).to.matchSnapshot();
    expect(await shieldsAPI['getShieldSVG(uint256)'](5)).to.matchSnapshot();
  });
  it('should retrieve correct shield svg using configuration', async function () {
    expect(
      await shieldsAPI['getShieldSVG(uint16,uint24[4],uint16,uint16)'](
        1,
        [0xff0000, 0x00ff00, 0, 0],
        116,
        3
      )
    ).to.matchSnapshot();
  });
  it('should retrieve correct shield built booleans', async function () {
    expect(await shieldsAPI.isShieldBuilt(1)).to.equal(true);
    expect(await shieldsAPI.isShieldBuilt(5)).to.equal(false);
  });

  // Fields
  it('should retrieve the correct field data', async function () {
    expect(
      await shieldsAPI.getField(1, [0xff0000, 0x00ff00, 0, 0])
    ).to.matchSnapshot();
  });
  it('should return the perfect field title', async function () {
    expect(await shieldsAPI.getFieldTitle(0, [0, 0, 0, 0])).to.equal('Perfect');
  });
  it('should return a perfect red field svg', async function () {
    expect(
      await shieldsAPI.getFieldSVG(0, [0xff0000, 0, 0, 0])
    ).to.matchSnapshot();
  });

  // Hardware
  it('should retrieve the correct hardware data', async function () {
    expect(await shieldsAPI.getHardware(1)).to.matchSnapshot();
  });
  it('should return the rose title', async function () {
    expect(await shieldsAPI.getHardwareTitle(116)).to.equal('Rose');
  });
  it('should return a rose', async function () {
    expect(await shieldsAPI.getHardwareSVG(116)).to.matchSnapshot();
  });

  // Frames
  it('should retrieve the correct frame data', async function () {
    expect(await shieldsAPI.getFrame(1)).to.matchSnapshot();
  });
  it('should return the adorned frame title', async function () {
    expect(await shieldsAPI.getFrameTitle(1)).to.equal('Adorned');
  });
  it('should return the adorned frame svg', async function () {
    expect(await shieldsAPI.getFrameSVG(1)).to.matchSnapshot();
  });
});
