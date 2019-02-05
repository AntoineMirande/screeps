const findDead = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.enegy < creep.carryCapacity) {
            let tombstones = creep.pos.findInRange(FIND_TOMBSTONES, 3);
            let ressources = creep.pos.findInRange(FIND_DROPPED_RESSOURCES, 3);
            if (tombstones) {
                if (creep.withdraw(tombstones[0], RESSOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say('picking');
                    console.log('picking');
                    creep.moveTo(tombstones[0], {visualizePathStyle: { stroke: '#ffaa00' }});
                }
            }
            if (creep.pickup(ressources[0]) == ERR_NOT_IN_RANGE) {
                creep.say('picking');
                console.log('picking');
                creep.moveTo(ressources[0], {visualizePathStyle: { stroke: '#ffaa00' }});
            }
        }
    }
};

module.exports = findDead;