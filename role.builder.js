const roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        let roleBuilderTask = require('role.builder.task');
        

	    if(creep.memory.subrole == 'harvest'){
	        if (creep.carry.energy == creep.carryCapacity){
	            creep.say('?');
                roleBuilderTask.findTask(creep);
	        }
	        else{
                let sources = Game.spawns["Spawn1"].room.find(FIND_STRUCTURES, {
                    filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                                   i.store[RESOURCE_ENERGY] > 0
                });
                if(creep.withdraw(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
	        }
        }
        else if (creep.memory.subrole == 'structure') {
            let structureTargets = Game.spawns["Spawn1"].room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
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
	    else if(creep.memory.subrole == 'building'){
            let buildingTargets = Game.spawns["Spawn1"].room.find(FIND_CONSTRUCTION_SITES);
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
	}
};

module.exports = roleBuilder;