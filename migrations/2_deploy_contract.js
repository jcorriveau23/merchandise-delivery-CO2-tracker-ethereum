var Command_preparator = artifacts.require("./Command_preparator");

module.exports = function (deployer) {
  deployer.deploy(Command_preparator);
};
