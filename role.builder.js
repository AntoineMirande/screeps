let roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        let roleBuilderTask = require('role.builder.task');
        
        let buildingTargets = Game.spawns["Spawn1"].room.find(FIND_CONSTRUCTION_SITES);
        let structureTargets = Game.spawns["Spawn1"].room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
            }
        });

	    if(creep.memory.subrole == 'harvest'){
	        if (creep.carry.energy == creep.carryCapacity){
	            creep.say('?');
                roleBuilderTask.findTask(creep);
	        }
	        else{
    	        let sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
	        }
        }
	    else if(creep.memory.subrole == 'building'){
            if (buildingTargets.find(target => target.id == creep.memory.target) && creep.carry.energy > 0) {
                if(creep.build(Game.getObjectById(creep.memory.target)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.target), {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                creep.say('?');
                roleBuilderTask.findTask(creep);
            }
	    }
        else if (creep.memory.subrole == 'structure') {
            if (structureTargets.find(target => target.id == creep.memory.target) && creep.carry.energy > 0) {
                if(creep.transfer(Game.getObjectById(creep.memory.target), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.target), {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                creep.say('?');
                roleBuilderTask.findTask(creep);
            }
        }
	}
};

module.exports = roleBuilder;