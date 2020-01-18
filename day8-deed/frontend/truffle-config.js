const fs = require('fs');
const HDWalletProvider = require("truffle-hdwallet-provider-privkey");

const secrets = JSON.parse(
    fs.readFileSync('.secrets').toString().trim()
);

// const privateKey1 = secrets.privateKey1;
// const privateKey2 = secrets.privateKey2;


module.exports = {
    networks: {
        ropsten: {
            provider: () => {
                return new HDWalletProvider(
                    privateKeys,
                    // secrets.privateKeys,
                   // [privateKey1,privateKey2],
                    // secrets.seed,
                    `https://ropsten.infura.io/v3/${secrets.projectId}`);
           },
           network_id: 3 
        }
    }
}
