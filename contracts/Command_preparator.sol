pragma solidity ^0.5.0;

contract Command_preparator{

    struct Data {
        UPC[] upcs;
        mapping (string => UPCIds) UpcToIndex;
        uint numUPC;

        Command[] commands;
        uint numCommands;

        Traject[] trajects;
        uint numTrajects;
        
    }

    struct UPC {                                // store the weight and volume of a specific product (UPC)
        string UPC;// could be deleted
        uint Weight;        
        uint Volume;
        mapping(uint => Product) uniqueProduct; // mapping all unique instantiation of the product
        uint numberProduct;                     // number of unique instantiation
    }

    struct UPCIds {         // index of the UPC array that doesn't allowed duplication
        uint ID;
        bool isValue;
    }

    struct Product {
        uint[] commandIDs; // dynamic list of commands that id link to this unique product
        uint8 size;
    }

    struct Command {
        uint[] TrajectIDs;  // dynamic list of trajectIDs taken by the command
        uint8 size;         // keep tracks of the number of traject the command take parts in
        uint totWeight;     // total weight of the command = sums of products weight
        uint totVolume;     // total volume of the command = sums of products volume

        bool done;          // 'true' when the command is ready to be charge
        //uint co2Emission
    }

    struct Traject {
        uint[] TrailerIDs;  // dynamic list of trailerID 
        uint truckID;       // truck that drive the command
        uint totWeight;     // total weight of the traject = sums of commands total weight
        uint totVolume;     // total volume of the traject = sums of commands total volume
        // uint fromID;
        // uint toID;

        bool done;          // true when the traject is done => co2Emission is valid
        uint co2Emission;   // only valid when => done = true
    }



    Data D;

    // get_numUPC
    // description: return the number of registered product on the contract
    // input: N/A
    // output: number of registered product
    function get_numUPC() public view returns(uint nb){
        return D.numUPC;
    }

    // get_upc_weight
    // description: return the weight of a registered product
    // input: _upc of the product
    // output: weight of the product
    function get_upc_weight(string memory _upc) public view returns(uint Weight){
        return D.upcs[D.UpcToIndex[_upc].ID].Weight;
    }

    // get_upc_Volume
    // description: return the volume of a registered product
    // input: _upc of the product
    // output: volume of the product
    function get_upc_Volume(string memory _upc) public view returns(uint Volume){
        return D.upcs[D.UpcToIndex[_upc].ID].Volume;
    }

    // New_product
    // description: register a new product (same UPC can't be registered twice)
    // input: _UPC, _weight, _volume of the new product
    // output:
    function New_product(string memory _upc, uint _weight, uint _volume) public returns(uint) {

        require(D.UpcToIndex[_upc].isValue == false, 'product already registered');
        // Product not generated yet
        D.UpcToIndex[_upc].isValue = true;   // no duplication of upc
        D.UpcToIndex[_upc].ID = D.numUPC;
        D.numUPC++;
        

        UPC memory newUPC;
        newUPC.UPC = _upc;
        newUPC.Weight = _weight;
        newUPC.Volume = _volume;
        newUPC.numberProduct = 0;
        D.upcs.push(newUPC);

        return 1;
    }

    // new_command
    // description: create a new command and return the ID of the command
    // input: N/A
    // return: ID of the command (index in the commands array)
    function new_command() public returns(uint commandID){
        
        Command memory newCommand;
        newCommand.size = 0;
        newCommand.totWeight = 0;
        newCommand.totVolume = 0;
        newCommand.done = false;

        D.commands.push(newCommand);
        D.numCommands++;

        return (D.numCommands - 1);  // return the index (commandID) of this new command
    }
    
    // Associate_command
    // description: add to a unique product's commandIDs list, a new command
    // input:
    // return:
     function Associate_Command(string memory _upc, uint _unique, uint _commandID) public returns(uint) {

         require(_commandID < D.numCommands, 'this command does not exist');
         require(D.UpcToIndex[_upc].isValue == true, 'must be a product registered');
         
         uint8 size =  D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size;   // index that point where to add the command in the array
         // if first command that we add to the product
         if (size == 0){
             D.upcs[D.UpcToIndex[_upc].ID].numberProduct++;       //new instantiation of the product 
         }
         else{
             uint index = D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].commandIDs[size - 1];    // last command
             require(D.commands[index].done == true, 'a command not completed is already assigned to this product');
             // require that the product is really list and needed in the command
         }

         D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].commandIDs.push(_commandID); // add the command to the list
         D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size++;

         D.commands[_commandID].totWeight += D.upcs[D.UpcToIndex[_upc].ID].Weight;  // add product weight and volume to traject
         D.commands[_commandID].totVolume += D.upcs[D.UpcToIndex[_upc].ID].Volume;

         return 1;
     }

    // get_product_commands_size
    // description: return the size of a product's command list
    // input: _upc and _unique of a unique product
    // return: commandIDs list size
    function get_product_commands_size(string memory _upc, uint _unique) public view returns(uint){
        require(D.UpcToIndex[_upc].isValue == true, 'must be a product registered');
        require(D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size != 0, 'No command registered yet');

        return D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size;
    }

    // get_product_commandID
    // description: return a single commandID of the list
    // input: _upc and _unique of a unique product + _index of the commandIDs list we want to check
    // return: commandID
    function get_product_commandID(string memory _upc, uint _unique, uint _index) public view returns(uint){

        require(D.UpcToIndex[_upc].isValue == true, 'must be a product registered');
        require(D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size != 0, 'No command registered yet');
        require(_index < D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size, 'index out of bound');
        
        
        return D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].commandIDs[_index];  // return the trajectID of the index
    }

    // get_command_info
    // description: return the info of a command
    // input: _commandID
    // return: total weight of the command, total volume of the command and if the command is done or not
    function get_command_info(uint _commandID) public view returns(uint, uint, bool){
        require(_commandID < D.numCommands, 'this command does not exist');

        return (D.commands[_commandID].totWeight, D.commands[_commandID].totVolume, D.commands[_commandID].done);
    }

    // command_completed
    // description: set the command completed on the blockchain, it can now be store in a traject
    // input: _commandID
    // return: 
    function command_completed(uint _commandID) public returns(bool){

        require(_commandID < D.numCommands, 'this command does not exist');
        require(D.commands[_commandID].done == false, 'this command is already done');

        D.commands[_commandID].done = true;
        return true;

    }

    // new_traject_ID
    // description: create a new traject
    // input: N/A
    // return: the trajectID of the new traject (index of the trajects list)
    function new_traject_ID() public returns(uint trajectID){
        
        Traject memory newTraject;
        //newTraject.truckID = _TruckID;
        newTraject.totWeight = 0;
        newTraject.totVolume = 0;
        newTraject.done = false;
        newTraject.co2Emission = 0;

        D.trajects.push(newTraject);
        D.numTrajects++;

        return (D.numTrajects - 1);
    }
    // Associate_traject
    // description: add a command to a traject
    // input:
    // return:
     function Associate_Traject(uint _commandID, uint _trajectID) public returns(uint) {

         require(_commandID < D.numCommands, 'this command does not exist');
         require(_trajectID < D.numTrajects, 'this traject does not exist');
         D.command[_commandID].
         uint8 size =  D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size;   // index that point where to add the command in the array
         // if first command that we add to the product
         if (size == 0){
             D.upcs[D.UpcToIndex[_upc].ID].numberProduct++;       //new instantiation of the product 
         }
         else{
             uint index = D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].commandIDs[size - 1];    // last command
             require(D.commands[index].done == true, 'a command not completed is already assigned to this product');
             // require that the product is really list and needed in the command
         }

         D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].commandIDs.push(_commandID); // add the traject to the list
         D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size++;

         D.commands[_commandID].totWeight += D.upcs[D.UpcToIndex[_upc].ID].Weight;  // add product weight and volume to traject
         D.commands[_commandID].totVolume += D.upcs[D.UpcToIndex[_upc].ID].Volume;

         return 1;
     }
    function get_traject_info(uint _trajectID) public view returns(uint, uint, bool){
        require(_trajectID < D.numTrajects, 'this traject does not exist');

        return (D.trajects[_trajectID].totWeight, D.trajects[_trajectID].totVolume, D.trajects[_trajectID].done);
    }

    function traject_start(uint trajectID, uint CO2Counter, uint time) public returns(bool){

    }

    function trajetc_stop(uint trajectID, uint CO2Counter, uint time) public returns(bool){

    }
}