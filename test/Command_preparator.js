const Command_preparator = artifacts.require('Command_preparator');

contract('Command_preparator', () => {
	it('Should deploy smart contract properly', async () => {
		const command_preparator = await Command_preparator.deployed();
		console.log(command_preparator.address);
		assert(command_preparator.address != '');
	});
});