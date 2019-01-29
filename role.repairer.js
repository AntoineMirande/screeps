const roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        let repairTargets = Game.spawns["Spawn1"].room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax
        });
        
        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity && repairTargets.length) {
	        creep.memory.repairing = true;
	        creep.memory.target = repairTargets[0].id;
	        creep.say('⚡ repair');
	    }

        if(creep.memory.repairing){
            if (repairTargets.find(target => target.id == creep.memory.target) && creep.carry.energy > 0) {
                if(creep.repair(Game.getObjectById(creep.memory.target)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.target), { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
            else if(repairTargets.length){
                creep.memory.target = repairTargets[0].id;
            }
        }
        else {
            let sources = Game.spawns["Spawn1"].room.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                               i.store[RESOURCE_ENERGY] > 0
            });
            if (sources.length) {
                if(creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else{
                let sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
	}
};

module.exports = roleRepairer;