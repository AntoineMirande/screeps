const actionFindDead = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if (creep.carry.energy < creep.carryCapacity) {
            let tombstones = creep.pos.findInRange(FIND_TOMBSTONES, 3, {
                filter: (tombstone) => {
                    return tombstone.store[RESOURCE_ENERGY];
                }
            });
            let resources = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 3, {
                filter: (resource) => {
                    return resource.amount;
                }
            });
            if (tombstones.length) {
                if (creep.withdraw(tombstones[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say('picking');
                    creep.memory.picking = true;
                    creep.moveTo(tombstones[0], {visualizePathStyle: { stroke: '#ffaa00' }});
                }
            }
            else if (resources.length) {
                if (creep.pickup(resources[0]) == ERR_NOT_IN_RANGE) {
                    creep.say('picking');
                    creep.memory.picking = true;
                    creep.moveTo(resources[0], {visualizePathStyle: { stroke: '#ffaa00' }});
                }
            }
            else {
                creep.memory.picking = false;
            }
        }
    }
};

module.exports = actionFindDead;