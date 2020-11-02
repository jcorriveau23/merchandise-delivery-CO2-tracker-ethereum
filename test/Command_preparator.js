const Command_preparator = artifacts.require('Command_preparator');

contract('Command_preparator', () => {
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 1 - contract deploy test
	it('Should deploy smart contract properly', async () => {
		const command_preparator = await Command_preparator.deployed();
		assert(command_preparator.address != '');
	});
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 2 - New_product function
	// New_product(upc, weight, volume)
	// fill the mappings between upc and (weight + volume) to create a database
	// an upc can only be registered once
	it('Should add the product', async () => {
		const command_preparator = await Command_preparator.deployed();
		await command_preparator.New_product("10000000000001", 3, 2);

		let weight = await command_preparator.get_upc_weight.call("10000000000001");
		assert.equal(weight, 3, "the weight has been registered correctly");
		let volume = await command_preparator.get_upc_Volume.call("10000000000001");
		assert.equal(volume, 2, "the volume has been registered correctly");
	});
	it('Cant add a duplicate UPC to the chain', async () => {
		const command_preparator = await Command_preparator.deployed();
		try {
			await command_preparator.New_product("10000000000001", 3, 2);
			await command_preparator.New_product("10000000000001", 3, 2); // duplicate call an error should occur on the console
		}
		catch(e){
			console.log('error: ' + e.reason) // print the error
			assert.equal(e.reason, "product already registered", "product with same UPC was added to the chain");
		}
	});

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 3 - Associate_command function
	// Associate_command(upc, unique)
	// association an open command to a product
	it('Cant add a command to a not registered product', async () => {
		const command_preparator = await Command_preparator.deployed();
		try {
			
			await command_preparator.new_command();
			await command_preparator.Associate_Command("30000000000003", 3);  // the product was not registered an error should occur on the console
		}
		catch(e){
			console.log('error: ' + e.reason) // print the error
			assert.equal(e.reason, "must be a product registered", "added a command to a product not registered...");
		}
	});

	it('A command can be add to a registered product', async () => {
		const command_preparator = await Command_preparator.deployed();
		await command_preparator.command_completed("ipfs link in string");
		caca = await command_preparator.new_command();
		//console.log(caca);
		await command_preparator.New_product("300000000000033", 3, 2);		// register product weight and volume
		await command_preparator.Associate_Command("300000000000033", 1);	// associate a traject to a specific product

		let commandID = await command_preparator.get_product_commandID.call("300000000000033", 1, 0);
		console.log('command ID added: ' + commandID);
		assert.equal(commandID, 1, "commandID was not set correctly");
	});

//	it('cant assign a second command if the last command is not done', async () => {
//		const command_preparator = await Command_preparator.deployed();
//		await command_preparator.New_product("111111111111", 3, 2);		// register product weight and 
//
//		
//		for(i=0; i < 2; i++){
//			await command_preparator.command_completed("ipfs link in string");
//			order[i] = await command_preparator.new_command();  // commandID 2 and then 3
//			try{
//				await command_preparator.Associate_Command('111111111111', 1)
//			}
//			catch(e){
//				console.log(e.reason)
//				assert.equal(e.reason, 'a command not completed is already assigned to this product', "a command not completed is already assigned to this product");
//			}
//		}
//	});

	it('multiple commands can be assign to a registered product', async () => {
		const command_preparator = await Command_preparator.deployed();
		await command_preparator.New_product("3000000000000333", 3, 2);		// register product weight and volume

		for (let i=0; i<10; i++){  		// associate 10 traject to a specific product
			await command_preparator.command_completed("ipfs link in string");
			await command_preparator.new_command();
			await command_preparator.Associate_Command("3000000000000333", 1);
			let command = await command_preparator.get_product_commandID.call("3000000000000333", 1, i); // index i of commandIDs list
			console.log('added: ' + i +' => ' + command);
		}

		let command = await command_preparator.get_product_commandID.call("3000000000000333", 1, 2);  // index 2 of traject list
		assert.equal(command, 4, "command was not set correctly");  // index 2 trajecst ID must equal to 2 in this case
	});

	it('revert when trying to view a commandID with index greater than commandIDs list', async () => {
		const command_preparator = await Command_preparator.deployed();
		await command_preparator.New_product("30000000000003333", 3, 2);		// register product weight and volume
		await command_preparator.command_completed("ipfs link in string");
		await command_preparator.new_command();
		
		await command_preparator.Associate_Command("30000000000003333", 3);

		try{
			await command_preparator.get_product_commandID.call('30000000000003333', 3, 4)  // should be reverted 
		}
		catch(e){
			assert.equal(e.toString().includes("index out of bound"), true, "an error should have occured: index out of bound");
		}

	});

	it('can get the lenght of a product command list', async () => {
		const command_preparator = await Command_preparator.deployed();
		await command_preparator.New_product("3000000000033333", 3, 2);		// register product weight and volume

		for (let i=0; i<10; i++){  		// associate 10 traject to a specific product
			await command_preparator.command_completed("ipfs link in string");
			await command_preparator.new_command();
			await command_preparator.Associate_Command("3000000000033333", 1);
			let command = await command_preparator.get_product_commandID.call("3000000000033333", 1, i); // index i of commandIDs list
			console.log('added: ' + i +' => ' + command);
		}

		let size = await command_preparator.get_product_commands_size.call("3000000000033333", 1);  // index 2 of traject list
		assert.equal(size, 10, "the size of the product's command list does not correspond");  // index 2 trajecst ID must equal to 2 in this case
	});
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 4 - Associate traject function

});
