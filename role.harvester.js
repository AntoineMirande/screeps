let actionFindDead = require('action.find.dead');

const roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        actionFindDead.run(creep);

        if(!creep.picking) {
    	    if(creep.carry.energy < creep.carryCapacity) {
                let containers = Game.spawns[creep.memory.spawn].room.find(FIND_STRUCTURES, {
                    filter: (i) => i.structureType == STRUCTURE_CONTAINER
                });
                let sources = Game.spawns[creep.memory.spawn].room.find(FIND_STRUCTURES, {
                    filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                                   i.store[RESOURCE_ENERGY] > 0
                });
                let workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
                if (sources.length && workers.length > 1) {
                    if(creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
                else if (containers.length && workers.length > 1) {
                    const path = creep.pos.findPathTo(Game.flags.Flag1);
                    if(path.length > 0) {
                        creep.move(path[0].direction);
                    }
                }
                else{
                    let sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                }
            }
            else {
                let targets = Game.spawns[creep.memory.spawn].room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION ||
                                    structure.structureType == STRUCTURE_SPAWN ||
                                    structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                        }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
	}
};

module.exports = roleHarvester;