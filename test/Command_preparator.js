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
	// Test 3 - Associate_traject function
	// Associate_traject(upc, unique, TrajectID)
	// association a traject to a product (max of 10 trajects that we can add to a product)
	it('Cant add a traject to a not registered product', async () => {
		const command_preparator = await Command_preparator.deployed();
		try {
			await command_preparator.new_traject_ID();
			await command_preparator.new_traject_ID();
			await command_preparator.Associate_Traject("30000000000003", 3, 1);  // the product was not registered an error should occur on the console
		}
		catch(e){
			console.log('error: ' + e.reason) // print the error
			assert.equal(e.reason, "must be a product registered", "added a traject to a product not registered...");
		}
	});

	it('A traject can be add to a registered product', async () => {
		const command_preparator = await Command_preparator.deployed();
		await command_preparator.new_traject_ID();
		await command_preparator.new_traject_ID();
		await command_preparator.New_product("300000000000033", 3, 2);		// register product weight and volume
		await command_preparator.Associate_Traject("300000000000033", 1, 1);	// associate a traject to a specific product

		let trajects = await command_preparator.get_product_traject.call("300000000000033", 1, 0);
		console.log('traject added: ' + trajects);
		assert.equal(trajects, 1, "traject was not set correctly");
	});

	it('multiple traject can be assign to a registered product', async () => {
		const command_preparator = await Command_preparator.deployed();
		await command_preparator.New_product("3000000000000333", 3, 2);		// register product weight and volume
		await command_preparator.new_traject_ID();

		for (let i=0; i<10; i++){  		// associate 10 traject to a specific product
			
			await command_preparator.new_traject_ID();
			await command_preparator.Associate_Traject("3000000000000333", 1, 1+i);
			let trajects = await command_preparator.get_product_traject.call("3000000000000333", 1, i);
			console.log('added: ' + i +' => ' + trajects);
		}

		let trajects = await command_preparator.get_product_traject.call("3000000000000333", 1, 2);  // index 2 of traject list
		assert.equal(trajects, 3, "traject was not set correctly");  // index 2 trajecst ID must equal to 3
	});

	it('revert when trying to view a traject with index greater than trajects list', async () => {
		const command_preparator = await Command_preparator.deployed();
		await command_preparator.New_product("30000000000003333", 3, 2);		// register product weight and volume
		await command_preparator.new_traject_ID();
		await command_preparator.new_traject_ID();

		await command_preparator.Associate_Traject("30000000000003333", 1, 1);

		try{
			await command_preparator.get_product_traject.call('30000000000003333', 1, 4)  // should return 
		}
		catch(e){
			assert.equal(e.toString().includes("index out of bound"), true, "an error should have occured: index out of bound");
		}

		
	});

	it('can get the lenght of a product traject list', async () => {

	});
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 4 -
});
