
var assert = require('assert');
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
	it('A product weight and volume can be registered', async () => {
		const command_preparator = await Command_preparator.deployed();
		await command_preparator.New_product("10000000000001", 3, 2);

		let weight = await command_preparator.get_upc_weight.call("10000000000001");
		assert.equal(weight, 3, "the weight has been registered correctly");
		let volume = await command_preparator.get_upc_Volume.call("10000000000001");
		assert.equal(volume, 2, "the volume has been registered correctly");
	});
	it('Cant registered a duplicate UPC to the chain', async () => {
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

	
	it("a command can be initiated by a loading attendant", async () => {
		const command_preparator = await Command_preparator.deployed();
		orderID = -1;

		await command_preparator.new_command();
		var orderID = await command_preparator.get_current_command_id();
		console.log('order created ID: ' + orderID) // print the error
		assert.equal(orderID, 0, "could not initiate the first command of the contract")
	});

	
	it("can't open 2 itinerary at the same time", async () => {
		const command_preparator = await Command_preparator.deployed();
		try{
			await command_preparator.new_command();
		}
		catch(e){
			console.log('error: ' + e.reason) // print the error
			assert.equal(e.reason, "already have an open command", "user cant open a new order if already have one not close");
		}
		
	});

	it('Cant add a command to a not registered product', async () => {
		const command_preparator = await Command_preparator.deployed();
		try {
			
			await command_preparator.Associate_Command("30000000000003", 3);  // the product was not registered an error should occur on the console
		}
		catch(e){
			console.log('error: ' + e.reason) // print the error
			assert.equal(e.reason, "must be a product registered", "added a command to a product not registered...");
		}
		await command_preparator.command_completed("ipfs link in string");
	});

	it('A command can be add to a registered product', async () => {
		const command_preparator = await Command_preparator.deployed();
		
		caca = await command_preparator.new_command();

		await command_preparator.New_product("300000000000033", 3, 2);		// register product weight and volume
		await command_preparator.Associate_Command("300000000000033", 1);	// associate a traject to a specific product
		await command_preparator.command_completed("ipfs link in string");

		let commandID = await command_preparator.get_product_commandID.call("300000000000033", 1, 0);
		console.log('command ID added: ' + commandID);
		assert.equal(commandID, 1, "commandID was not set correctly");

		
	});

	it('multiple commands can be assign to a registered product', async () => {
		const command_preparator = await Command_preparator.deployed();
		await command_preparator.New_product("3000000000000333", 3, 2);		// register product weight and volume

		for (let i=0; i<10; i++){  		// associate 10 traject to a specific product
			
			await command_preparator.new_command();
			await command_preparator.Associate_Command("3000000000000333", 1);
			await command_preparator.command_completed("ipfs link in string");

			let command = await command_preparator.get_product_commandID.call("3000000000000333", 1, i); // index i of commandIDs list
			console.log('added: ' + i +' => ' + command);
		}

		let command = await command_preparator.get_product_commandID.call("3000000000000333", 1, 2);  // index 2 of traject list
		assert.equal(command, 4, "command was not set correctly");  // index 2 trajecst ID must equal to 4 in this case
	});

	it('revert when trying to view a commandID with index greater than commandIDs list size', async () => {
		const command_preparator = await Command_preparator.deployed();
		await command_preparator.New_product("30000000000003333", 3, 2);		// register product weight and volume
		
		await command_preparator.new_command();
		
		await command_preparator.Associate_Command("30000000000003333", 3);
		await command_preparator.command_completed("ipfs link in string");

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
			
			await command_preparator.new_command();
			await command_preparator.Associate_Command("3000000000033333", 1);
			await command_preparator.command_completed("ipfs link in string");
			let command = await command_preparator.get_product_commandID.call("3000000000033333", 1, i); // index i of commandIDs list
			console.log('added: ' + i +' => ' + command);
		}

		let size = await command_preparator.get_product_commands_size.call("3000000000033333", 1);  // index 2 of traject list
		assert.equal(size, 10, "the size of the product's command list does not correspond");  // index 2 trajecst ID must equal to 2 in this case
	});

	it('validate that a command weight and volume cummulate with adding product', async () => {
		const command_preparator = await Command_preparator.deployed();



		currentCommand = await command_preparator.get_current_command_id();
		console.log("current order: " + currentCommand)
		
		let info = await command_preparator.get_command_info(currentCommand);

		console.log("order ID: " + currentCommand)
		console.log("tot Weight: " + info[0]['words'][0])
		console.log("tot Volume: " +info[1]['words'][0])

		assert.equal(info[0]['words'][0], 3, "the weight has not incremented"); 
		assert.equal(info[1]['words'][0], 2, "the volume has not incremented"); 
		assert.equal(info[2], true, "order is not mark as done"); 
		assert.equal(info[3], "ipfs link in string", "ipfs link not stored correctly"); 
	});
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Test 4 - Associate traject function
	//const command_preparator = await Command_preparator.deployed();

	it('We can initiate a new Itinerary', async () => {
		const command_preparator = await Command_preparator.deployed();
		itineraryID = 8;

		await command_preparator.new_Itinerary();
		itineraryID = await command_preparator.get_trucker_current_ItineraryID()

		console.log("current itinerary: " + itineraryID)
		assert.equal(itineraryID, 0, "could not initiate de initirery");
	});

	it("can't open 2 itinerary at the same time", async () => {
		const command_preparator = await Command_preparator.deployed();
		try{
			await command_preparator.new_Itinerary();
		}
		catch(e){
			console.log('error: ' + e.reason) // print the error
			assert.equal(e.reason, "already have an open Itinerary", "user cant open a new Itinerary if already have one not close");
		}
		
	});

	it("cant close an open itinerary without associating a trailer to it", async () => {
		const command_preparator = await Command_preparator.deployed();

		try{
			await command_preparator.loading_completed("ipfs link in string"); // close itinerary as loading attendant
		}
		catch(e){
			console.log('error: ' + e.reason) // print the error
			assert.equal(e.reason, "a trailer must be assigned to this Itinerary before closing", "user cannot close an itinerary without associatin a trailer/container to it");	
		}
		await command_preparator.associate_trailer(666);					// add trailer to traject
		await command_preparator.loading_completed("ipfs link in string"); // close itinerary as loading attendant
	});

	it("can add orders to itinerary", async () => {
		const command_preparator = await Command_preparator.deployed();

		await command_preparator.new_Itinerary();

		itineraryID = await command_preparator.get_current_ItineraryID()
		console.log("current itinerary: " + itineraryID)
		await command_preparator.Associate_Itinerary(22);

		itineraryInfo = await command_preparator.get_Itinerary_info(itineraryID);
		console.log("current Loading attendant Itinerary ID: " + itineraryID)
		console.log("total Weight: " + itineraryInfo[0]['words'][0])
		console.log("total Volume: " + itineraryInfo[1]['words'][0])

		assert.equal(itineraryInfo[0]['words'][0], 3, "could not add order 22 to open itinerary")
		assert.equal(itineraryInfo[1]['words'][0], 2, "could not add order 22 to open itinerary")


		itineraryListSize = await command_preparator.get_command_Itinerary_list_size(22);
		itineraryID = await command_preparator.get_command_Itinerary_list_index(22, 0)
		
		console.log("Order 22 => itinerary list size: " + itineraryListSize)
		console.log("Order 22 => itinerary ID : " + itineraryID)

		assert.equal(itineraryListSize, 1, "itinerary not added to order")
		assert.equal(itineraryID, 1, "not the right itinerary added to the order")

		await command_preparator.associate_trailer(666)
		await command_preparator.loading_completed("ipfs link in string")

	});

	it("multiple order ID can be added to an itinerary and cummulated weight + Volume correspond", async () => {
		const command_preparator = await Command_preparator.deployed();
		var totWeight = 0;
		var totVolume = 0;

		await command_preparator.new_Itinerary();

		itineraryID = await command_preparator.get_current_ItineraryID();
		console.log("current itinerary: " + itineraryID);

		for (i = 0; i < 22; i++){
			await command_preparator.Associate_Itinerary(i);
			console.log("added itinerary: " + i)
			orderInfo = await command_preparator.get_command_info(i)

			totWeight += orderInfo[0]['words'][0]
			totVolume += orderInfo[1]['words'][0]
		}
		
		console.log("Weight cumulated: " + totWeight + ", Volume cumulated: " + totVolume)

		itineraryInfo = await command_preparator.get_Itinerary_info(itineraryID)

		assert.equal(totWeight, itineraryInfo[0]['words'][0], "Weight cumulated is not the same")
		assert.equal(totVolume, itineraryInfo[1]['words'][0], "Volume cumulated is not the same")

		await command_preparator.associate_trailer(666)
		await command_preparator.loading_completed("ipfs link in string")
	});

	it("A trucker can grab an itinerary", async () => {
		const command_preparator = await Command_preparator.deployed();
		
		itineraryID = -1;

		await command_preparator.grab_Itinerary(2);  // itinerary 2 from last test
		itineraryID = await command_preparator.get_trucker_current_ItineraryID();
		assert.equal(itineraryID, 2, "could not grab the itinerary ID")

	});
	
	it("a trucker can start a traject, by sending the CO2Counter truck Counter value and truckID", async () => {
		const command_preparator = await Command_preparator.deployed();

		itineraryID = await command_preparator.get_trucker_current_ItineraryID();
		
		CO2Counter = 9000
		truckID = 999
		await command_preparator.Itinerary_start(CO2Counter, truckID)

		itineraryInfo = await command_preparator.get_Itinerary_info(itineraryID)

		console.log("itinerary ID: " + itineraryID + "started")
		console.log("CO2 counter value: " + itineraryInfo[2]['words'][0])
		console.log("itinerary started: " + itineraryInfo[3])

		assert.equal(itineraryInfo[2]['words'][0], CO2Counter, "did not set CO2 Counter")
		assert.equal(itineraryInfo[3], true, "did not mark the itinerary as started")

	});

	it("a trucker can end a traject by sending the CO2Counter truck Counter value and truckID", async () => {
		const command_preparator = await Command_preparator.deployed();

		var itineraryID = await command_preparator.get_trucker_current_ItineraryID();
		
		var CO2Counter_start = 9000
		var CO2Counter_stop = 9900
		var truckID = 999
		await command_preparator.Itinerary_stop(CO2Counter_stop, truckID)

		itineraryInfo = await command_preparator.get_Itinerary_info(itineraryID)
		console.log("itinerary ID: " + itineraryID)
		console.log("CO2 counter value: " + itineraryInfo[2]['words'][0])
		console.log("itinerary done; " + itineraryInfo[4])

		assert.equal(itineraryInfo[2]['words'][0], CO2Counter_stop - CO2Counter_start, "did not calculate stop - start CO2 value")
		assert.equal(itineraryInfo[4], true, "did not mark the itinerary as done")

	});

	it("we can get from total CO2 itinerary emissions, specific emissions from one product", async () => {
		const command_preparator = await Command_preparator.deployed();

		var expectedProductCO2 = 0;
		var ProductCO2 = 0
		var UPC = "300000000000033"
		var Unique = 1
		var ProductWeight = 3
		var ProductVolume = 2
		var itineraryID = -1
		
		orderListSize = await command_preparator.get_product_commands_size(UPC, Unique)

		for(i = 0; i < orderListSize; i++){
			orderID = await command_preparator.get_product_commandID(UPC, Unique, i)
			console.log("participated in orderID: " + orderID)

			itineraryListSize = await command_preparator.get_command_Itinerary_list_size(orderID);

			for(j=0; j < itineraryListSize; j++){
				itineraryID = await command_preparator.get_command_Itinerary_list_index(orderID, j)
				console.log("participated in itineraryID: " + itineraryID);

				itineraryInfo = await command_preparator.get_Itinerary_info(itineraryID)
				
				itineraryCO2Emissions = itineraryInfo[2]['words'][0]
				itineraryTotalWeight = itineraryInfo[0]['words'][0]
				itineraryTotalVolume = itineraryInfo[1]['words'][0]

				expectedProductCO2 += parseInt(itineraryCO2Emissions * 0.5 * ((ProductWeight / itineraryTotalWeight) + (ProductVolume / itineraryTotalVolume)));
				ProductCO2 += parseInt(await command_preparator.get_product_emission(UPC, itineraryID));
				console.log("expected Product cumulate emissions: " + expectedProductCO2);
				console.log("from contract Product cumulate emissions: " + ProductCO2)

			}
		
			assert.equal(expectedProductCO2, ProductCO2, "Problem in CO2 product calculation")
		}
	});
});
