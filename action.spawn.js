const actionSpawn = {

    create: function(mySpawn){

        let myRoom = Game.spawns[mySpawn].room;
        let RCL = myRoom.controller.level;
        let extensions = myRoom.find(FIND_MY_STRUCTURES, { filter: (structure) => structure.structureType == STRUCTURE_EXTENSION });
        let fullExtensions = extensions.filter(extension => extension.energy == extension.energyCapacity).length;
        let containers = Game.spawns[mySpawn].room.find(FIND_STRUCTURES, {
            filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                           i.store[RESOURCE_ENERGY] < i.storeCapacity
        });
        let towers = Game.spawns[mySpawn].room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_TOWER }
        });
        let buildingTargets = Game.spawns[mySpawn].room.find(FIND_CONSTRUCTION_SITES);

        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        let workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');

        let workerBodyParts = Array(Math.floor(fullExtensions/2.1)+1).fill(WORK)
            .concat(Array(Math.ceil(fullExtensions/100)+1).fill(CARRY))
            .concat(Array(Math.ceil(fullExtensions/100)+1).fill(MOVE));
        let harvesterBodyParts = [WORK,CARRY,MOVE];
        let repairerBodyParts = [WORK].concat(Array(Math.floor(fullExtensions/2)+1).fill(CARRY)).concat([MOVE]);
        let builderBodyParts = [WORK].concat(Array(Math.floor(fullExtensions/3)).fill(CARRY)).concat([MOVE,MOVE]);
        let upgraderBodyParts = Array(Math.floor(fullExtensions/3)+1).fill(WORK)
            .concat(Array(Math.ceil(fullExtensions/100)+1).fill(CARRY))
            .concat(Array(Math.ceil(fullExtensions/100)+1).fill(MOVE));
        
        if (Game.spawns[mySpawn].energy >= 200) {
            if(harvesters.length < 3) {
                let newName = 'Harvester' + Game.time;
                console.log(`Spawning new harvester: ${newName} (${harvesterBodyParts})`);
                Game.spawns[mySpawn].spawnCreep(harvesterBodyParts, newName, 
                    {memory: {role: 'harvester', spawn: mySpawn}});
            }
            else if (Game.spawns[mySpawn].energy == Game.spawns[mySpawn].energyCapacity && fullExtensions >= Math.ceil(extensions.length/3)) {
                if(workers.length < 3 && containers.length) {
                    let newName = 'Worker' + Game.time;
                    console.log(`Spawning new worker: ${newName} (${workerBodyParts})`);
                    Game.spawns[mySpawn].spawnCreep(workerBodyParts, newName, 
                        {memory: {role: 'worker', spawn: mySpawn}});
                }
                else if(builders.length < 2 && (buildingTargets.length || towers.length)) {
                    let newName = 'Builder' + Game.time;
                    console.log(`Spawning new builder: ${newName} (${builderBodyParts})`);
                    Game.spawns[mySpawn].spawnCreep(builderBodyParts, newName, 
                        {memory: {role: 'builder', subrole: 'harvest', spawn: mySpawn}});
                }
                else if(upgraders.length < RCL*2+1) {
                    let newName = 'Upgrader' + Game.time;
                    console.log(`Spawning new upgrader: ${newName} (${upgraderBodyParts})`);
                    Game.spawns[mySpawn].spawnCreep(upgraderBodyParts, newName, 
                        {memory: {role: 'upgrader', spawn: mySpawn}});
                }
                else if(repairers.length < 1 && containers.length == 0) {
                    let newName = 'Repairer' + Game.time;
                    console.log(`Spawning new repairer: ${newName} (${repairerBodyParts})`);
                    Game.spawns[mySpawn].spawnCreep(repairerBodyParts, newName, 
                        {memory: {role: 'repairer', spawn: mySpawn}});
                }      
            }
        }
    }
};

module.exports = actionSpawn;