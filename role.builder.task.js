let roleBuilderTask = {
    
    /** @param {Creep} creep **/
    findTask: function(creep){
        
        let buildingTargets = Game.spawns["Spawn1"].room.find(FIND_CONSTRUCTION_SITES);
        let structureTargets = Game.spawns["Spawn1"].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
            }
        });
        
	    if(creep.memory.subrole != 'harvest' && creep.carry.energy == 0) {
            creep.memory.subrole = 'harvest';
            creep.say('🔄 harvest');
	    }
	    else {
            if(buildingTargets.length > 0){
    	        creep.memory.subrole = 'building';
                creep.memory.target = buildingTargets[0].id;
    	        creep.say('🚧 build');
	        }
	        else if(structureTargets.length > 0){
	            creep.memory.subrole = 'structure';
                creep.memory.target = structureTargets[0].id;
	            creep.say('⚡ struct');
	        }
        }
    }
};

module.exports = roleBuilderTask;