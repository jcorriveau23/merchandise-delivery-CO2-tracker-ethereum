pragma solidity ^0.5.0;

contract Command_preparator{

uint numUPC = 0;
uint numTrajects = 0;

Product[][] products;  // [UpcId][UniquenessID]
Traject[] traject;
    
    struct Product {
        string upc;
        uint uniquenessID;
        uint[] trajectID;
    }
    
    struct Traject {
        uint TruckID;
        uint totWeight;
        uint totVolume; 
        uint CO2eq;
    }
    
    
    mapping (string => uint) UpcToWeight;
    mapping (string => uint) UpcToVolume;
    mapping (string => uint) UpcToId;
    
    function init_traject(uint _TruckID) public returns(uint id){
        Traject memory newTraject = Traject(_TruckID, 0, 0, 0);
        
        return id;
    }
    
    function get_numUPC() public view returns(uint nb){
        return numUPC;
    }
    
    function get_upc_weight(string memory _upc) public view returns(uint Weight){
        return UpcToWeight[_upc];
    }
    
    function get_upc_Volume(string memory _upc) public view returns(uint Volume){
        return UpcToVolume[_upc];
    }
    function New_product(string memory _upc, uint _unit, uint _weight, uint _volume, uint _trajectID) public returns(uint Weight) {
        require(UpcToId[_upc] == 0);
        // Product not generated yet
        UpcToWeight[_upc] = _weight;
        UpcToVolume[_upc] = _volume;
        UpcToId[_upc] = numUPC;
        numUPC++;
        
        return 1; 
        
    
        
        //Product memory newProduct = Product(_upc, _unit, _trajectID, 0);
        
        // trajectsIDWeight[_trajectID] += _weight;
        // trajectsIDVolume[_trajectID] += _volume;
    }
}
