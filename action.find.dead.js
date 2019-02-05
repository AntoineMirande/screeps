const actionFindDead = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if (creep.carry.energy < creep.carryCapacity) {
            let tombstones = creep.pos.findInRange(FIND_TOMBSTONES, 3);
            let ressources = creep.pos.findInRange(FIND_DROPPED_RESOURCES, 3);
            if (tombstones) {
                if (creep.withdraw(tombstones[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say('picking');
                    creep.moveTo(tombstones[0], {visualizePathStyle: { stroke: '#ffaa00' }});
                }
            }
            else if (ressources) {
                if (creep.pickup(ressources[0]) == ERR_NOT_IN_RANGE) {
                    creep.say('picking');
                    creep.moveTo(ressources[0], {visualizePathStyle: { stroke: '#ffaa00' }});
                }
            }
        }
    }
};

module.exports = actionFindDead;