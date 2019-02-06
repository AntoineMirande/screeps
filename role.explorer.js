const roleExplorer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        let nearestController = creep.room.find(FIND_STRUCTURES, {
            filter: function(structure) {
                return (structure.structureType == STRUCTURE_CONTROLLER);
                // TODO: filter on range and control
            }
        });

        if(nearestController) {
            creep.moveTo(nearestController);
        }
    }
};

module.exports = roleExplorer;