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

        mapping(address => uint) openCommandID;  // link the orderpicker to is current order ID
        mapping(address => uint) openTrajectID;  // link the trucker to is current traject ID
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
        uint[] commandIDs; // dynamic list of commands that is link to this unique product
        uint8 size;
    }

    struct Command {
        uint[] TrajectIDs;  // dynamic list of trajectIDs taken by the command
        uint8 size;         // keep tracks of the number of traject the command take parts in
        uint totWeight;     // total weight of the command = sums of products weight
        uint totVolume;     // total volume of the command = sums of products volume

        bool done;          // 'true' when the command is ready to be charge
        string ipfsCommandHash;
        //uint co2Emission
    }

    struct Traject {
        uint[] TrailerIDs;  // dynamic list of trailerID (some truc can carry more than one trailer)
        uint truckID;       // truck that drive the traject
        uint totWeight;     // total weight of the traject = sums of commands total weight
        uint totVolume;     // total volume of the traject = sums of commands total volume
        // uint fromID;
        // uint toID;
        bool loaded;         // true when the traject is fully charged
        bool done;          // true when the traject is done => co2Emission is valid
        uint co2Emission;   // only valid when => done = true
        string ipfsTrajectHash;
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
        
        uint _commandID = D.openCommandID[msg.sender];
        if(_commandID < D.numCommands){   
            require(D.commands[_commandID].done == true, "already have an open command");  
        }
        
        Command memory newCommand;
        newCommand.size = 0;
        newCommand.totWeight = 0;
        newCommand.totVolume = 0;
        newCommand.done = false;

        D.commands.push(newCommand);
        D.openCommandID[msg.sender] = D.numCommands;
        
        D.numCommands++;

        return (D.numCommands - 1);  // return the index (commandID) of this new command
    }

    // Associate_command
    // description: add to a unique product's commandIDs list, a new command
    // input:
    // return:
     function Associate_Command(string memory _upc, uint _unique) public returns(uint) {
        
        require(D.UpcToIndex[_upc].isValue == true, 'must be a product registered');
        
        uint _commandID = D.openCommandID[msg.sender];
        if(_commandID < D.numCommands){   
            require(D.commands[_commandID].done == false, "command must not be completed");  
        }
         
         uint8 size =  D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].size;   // index that point where to add the command in the unique product array
         // if first command that we add to the product
         if (size == 0){
             D.upcs[D.UpcToIndex[_upc].ID].numberProduct++;       //new instantiation of the product 
         }
         else{
             uint index = D.upcs[D.UpcToIndex[_upc].ID].uniqueProduct[_unique].commandIDs[size - 1];    // last command
             require(D.commands[index].done == true, 'a command not completed is already assigned to this product');
             // require that the traject is done not only the last command------------------------------------------------------------------------------------
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
    function get_command_info(uint _commandID) public view returns(uint, uint, bool, string memory){
        require(_commandID < D.numCommands, 'this command does not exist');

        return (D.commands[_commandID].totWeight, D.commands[_commandID].totVolume, D.commands[_commandID].done, D.commands[_commandID].ipfsCommandHash);
    }
    // get_command_info
    // description: return the info of a command
    // input: _commandID
    // return: total weight of the command, total volume of the command and if the command is done or not
    function get_current_command_id() public view returns(uint){

        return D.openCommandID[msg.sender];
    }

    // command_completed
    // description: set the command completed on the blockchain, it can now be store in a traject
    // input: _commandID
    // return: 
    function command_completed(string memory ipfsHash) public returns(bool){

        uint _commandID = D.openCommandID[msg.sender];
        require(D.commands[_commandID].done == false, 'this command is already done');

        //D.openCommandID[msg.sender] = 0;
        D.commands[_commandID].done = true;
        D.commands[_commandID].ipfsCommandHash = ipfsHash;
        return true;
    }

    // new_traject_ID
    // description: create a new traject
    // input: N/A
    // return: the trajectID of the new traject (index of the trajects list)
    function new_traject() public returns(uint trajectID){
        uint _trajectID = D.openTrajectID[msg.sender];
        
        if(_trajectID < D.numTrajects){   
            require(D.trajects[_trajectID].loaded == true, "already have an open traject");  
        }
        
        Traject memory newTraject;
        newTraject.truckID = 0;
        newTraject.totWeight = 0;
        newTraject.totVolume = 0;
        newTraject.loaded = false;
        newTraject.done = false;
        newTraject.co2Emission = 0;

        D.trajects.push(newTraject);
        D.openTrajectID[msg.sender] = D.numTrajects;
        D.numTrajects++;

        return (D.numTrajects - 1);
    }
    function loading_completed(string memory _IpfsTrajectHash) public returns(bool){
        uint _trajectID = D.openTrajectID[msg.sender];
        require(D.trajects[_trajectID].loaded == false, "traject is already loaded");
        D.trajects[_trajectID].loaded = true;
        D.trajects[_trajectID].ipfsTrajectHash = _IpfsTrajectHash;
    }
    
    function get_current_trajectID() public view returns(uint){
        return D.openTrajectID[msg.sender];
    }
    
    // Associate_traject
    // description: add a command to a traject
    // input: ID of a command and ID of the traject
    // return: 
     function Associate_Traject(uint _commandID) public returns(bool) {
        
        require(_commandID < D.numCommands, "this command does not exist");
        require(D.commands[_commandID].done == true, "this command is not completed");
        uint size = D.commands[_commandID].size; // index where to add the new trajectID
        if(size > 0){
            // if command was already assigned to a traject
            uint last_trajectID = D.commands[_commandID].TrajectIDs[size-1];
            require(D.trajects[last_trajectID].done == true, "a traject not completed is already assigned to that command");
        }
        
        uint _trajectID = D.openTrajectID[msg.sender];
        require(_trajectID < D.numTrajects, 'this traject does not exist');
        require(D.trajects[_trajectID].loaded == false, "this traject must not be already loaded");
        
        
        
        D.commands[_commandID].TrajectIDs.push(_trajectID);
        D.commands[_commandID].size++;
        
        D.trajects[_trajectID].totWeight += D.commands[_commandID].totWeight;
        D.trajects[_trajectID].totVolume += D.commands[_commandID].totVolume;
        
        return true;
     }
    function get_traject_info(uint _trajectID) public view returns(uint, uint, uint, uint, bool, bool, string memory){
        require(_trajectID < D.numTrajects, 'this traject does not exist');

        return (D.trajects[_trajectID].truckID, D.trajects[_trajectID].totWeight, D.trajects[_trajectID].totVolume, D.trajects[_trajectID].co2Emission, D.trajects[_trajectID].loaded, D.trajects[_trajectID].done, D.trajects[_trajectID].ipfsTrajectHash);
    }
    

    function traject_start(uint trajectID, uint CO2Counter, uint time) public returns(bool){

    }

    function trajetc_stop(uint trajectID, uint CO2Counter, uint time) public returns(bool){

    }
}