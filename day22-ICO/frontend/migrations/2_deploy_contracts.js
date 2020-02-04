const ICO = artifacts.require("ICO.sol");

module.exports = function(deployer) {
  deployer.deploy(ICO, 'MarmaJ', 'MRMAJ', 18, web3.utils.toWei('1000'));
};
