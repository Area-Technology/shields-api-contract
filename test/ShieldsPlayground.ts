import * as chai from 'chai';
import { Signer } from 'ethers';
import chaiAsPromised from 'chai-as-promised';
import { expect } from 'chai';
import { jestSnapshotPlugin } from 'mocha-chai-jest-snapshot';
import { ShieldsAPI, ShieldsPlayground } from '../typechain';
chai.use(chaiAsPromised);
chai.use(jestSnapshotPlugin());

//@ts-ignore
import { ethers } from 'hardhat';

const SHIELDS_ADDRESS = '0x0747118C9F44C7a23365b2476dCD05E03114C747';

describe('ShieldsAPI', function () {
  let accounts: Signer[] = [];
  let addresses: string[] = [];
  let shieldsAPI: ShieldsAPI;
  let shieldsPlayground: ShieldsPlayground;

  this.beforeAll(async () => {
    accounts = await ethers.getSigners();
    addresses = await Promise.all(accounts.map(signer => signer.getAddress()));

    const ShieldsAPI = await ethers.getContractFactory('ShieldsAPI');
    shieldsAPI = (await ShieldsAPI.deploy(SHIELDS_ADDRESS)) as ShieldsAPI;
    await shieldsAPI.deployed();

    const ShieldsPlayground = await ethers.getContractFactory(
      'ShieldsPlayground'
    );
    shieldsPlayground = (await ShieldsPlayground.deploy()) as ShieldsPlayground;
    await shieldsPlayground.deployed();
  });

  it('should allow minting', async function () {
    expect(
      shieldsPlayground.mint(
        0,
        [0x000000, 0x000000, 0x000000, 0x000000],
        116,
        5
      )
    ).to.eventually.be.fulfilled;
    const tokenURI = await shieldsPlayground.tokenURI(1);
    expect(tokenURI).to.matchSnapshot();
  });
});
