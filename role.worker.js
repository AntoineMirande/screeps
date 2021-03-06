const roleWorker = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            let sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            let targets = Game.spawns[creep.memory.spawn].room.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                               i.store[RESOURCE_ENERGY] < i.storeCapacity
            });
            if(targets.length > 0) {
                let closest = creep.pos.findClosestByRange(targets);
                if(creep.transfer(closest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closest, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                targets = Game.spawns[creep.memory.spawn].room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
                });
                if(targets.length > 0) {
                    let closest = creep.pos.findClosestByRange(targets);
                    if(creep.transfer(closest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closest, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
	}
};

module.exports = roleWorker;