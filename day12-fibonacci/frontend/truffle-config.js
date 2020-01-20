const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  compilers: {
    solc: {
      version: '0.5.2'
    }
  },
  networks: {
    ganache: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};

