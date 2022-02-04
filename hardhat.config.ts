import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import { task } from 'hardhat/config';
import { HardhatUserConfig } from 'hardhat/types';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import 'hardhat-gas-reporter';
import 'hardhat-change-network';
import '@nomiclabs/hardhat-etherscan';
import 'hardhat-watcher';
import 'solidity-coverage';

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.11',
    settings: { optimizer: { enabled: true, runs: 100 } }
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5'
  },
  gasReporter: {
    currency: 'USD'
  },
  watcher: {
    compile: {
      tasks: ['compile']
    }
  },
  mocha: {
    timeout: 40000
  }
};

export default config;
