const path = require("path");
const fs = require('fs');
const HDWalletProvider = require("truffle-hdwallet-provider");
const secrets = JSON.parse(
  fs.readFileSync(".secrets").toString().trim()
);

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  compilers: {
    solc: {
      version: '0.5.7'
    }
  },
  networks: {
    ropsten: {
      provider: () => {
        return new HDWalletProvider(secrets.seed, `https://ropsten.infura.io/v3/${secrets.projectId}`);
      },
      network_id: '3',
    },
    test: {
      provider: () => {
        return new HDWalletProvider(mnemonic, "http://127.0.0.1:8545/");
      },
      network_id: '*',
    },
  }
};