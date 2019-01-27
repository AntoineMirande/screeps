var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        var buildingTargets = Game.spawns["Spawn1"].room.find(FIND_CONSTRUCTION_SITES);
        var structureTargets = Game.spawns["Spawn1"].room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
        });
        var home = Game.spawns["Spawn1"].room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                }
        });

	    if(creep.memory.subrole != 'harvest' && creep.carry.energy == 0) {
            creep.memory.subrole = 'harvest';
            creep.say('🔄 harvest');
	    }
	    if(creep.memory.subrole == 'harvest' && creep.carry.energy == creep.carryCapacity) {
	        if(buildingTargets.length > 0){
    	        creep.memory.subrole = 'building';
    	        creep.say('🚧 build');
	        }
	        else if(feedingTargets.length > 0){
	            creep.memory.subrole = 'structure';
	            creep.say('⚡ struct');
	        }
	        else{
	            creep.memory.subrole = 'home';
	            creep.say('⚡ home');
	        }
	    }

	    if(creep.memory.subrole == 'harvest'){
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	    else if(creep.memory.subrole == 'building'){
            creep.memory.target = buildingTargets[0].id;
            if(creep.build(Game.getObjectById(creep.memory.target)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.target), {visualizePathStyle: {stroke: '#ffffff'}});
            }
	    }
        else if (creep.memory.subrole == 'structure') {
            creep.memory.target = structureTargets[0].id;
            if(creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.target), {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else if (creep.memory.subrole == 'home') {
            creep.memory.target = home[0].id;
            if(creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.target), {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
	}
};

module.exports = roleBuilder;