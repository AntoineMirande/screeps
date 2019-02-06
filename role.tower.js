let roleTower = {

    /** @param {Game} game **/
    defend: function() {
        towers = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
                    filter: { structureType: STRUCTURE_TOWER }
                })
        _.forEach(towers, function(tower){
            let closestDamagedStructure = tower.room.find(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            closestDamagedStructure.sort((a,b) => a.hits - b.hits);
            if(closestDamagedStructure.length && tower.energy > 700) {
                tower.repair(closestDamagedStructure[0]);
            }
            let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }
        })
	}
};

module.exports = roleTower;