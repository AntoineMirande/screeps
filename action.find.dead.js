const actionFindDead = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if (creep.carry.energy < creep.carryCapacity) {
            let tombstones = creep.pos.findInRange(FIND_TOMBSTONES, 6, {
                filter: (tombstone) => {
                    return tombstone.store.RESOURCE_ENERGY > 10;
                }
            });
            let resources = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 6, {
                filter: (resource) => {
                    return resource.amount > 10;
                }
            });
            if (tombstones.length) {
                console.log('tombstone', tombstones[0], Object.keys(tombstones[0]));
                if (creep.withdraw(tombstones[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say('picking');
                    creep.moveTo(tombstones[0], {visualizePathStyle: { stroke: '#ffaa00' }});
                }
            }
            else if (resources.length) {
                if (creep.pickup(resources[0]) == ERR_NOT_IN_RANGE) {
                    creep.say('picking');
                    creep.moveTo(resources[0], {visualizePathStyle: { stroke: '#ffaa00' }});
                }
            }
        }
    }
};

module.exports = actionFindDead;