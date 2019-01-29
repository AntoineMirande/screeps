const actionSpawn = {

    create: function(RCL, fullExtensions){

        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        // let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        let workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');

        let workerBodyParts = Array(Math.floor(fullExtensions/2)+1).fill(WORK).concat([CARRY,MOVE]);
        let harvesterBodyParts = [WORK].concat(Array(Math.floor(fullExtensions/2)).fill(CARRY)).concat([MOVE,MOVE]);
        // let repairerBodyParts = [WORK].concat(Array(Math.floor(fullExtensions/2)+1).fill(CARRY)).concat([MOVE]);
        let builderBodyParts = [WORK].concat(Array(Math.floor(fullExtensions/2)).fill(CARRY)).concat([MOVE,MOVE]);
        let upgraderBodyParts = [WORK].concat(Array(Math.floor(fullExtensions/2)).fill(CARRY)).concat([MOVE,MOVE]);

        if(harvesters.length < RCL*2) {
            let newName = 'Harvester' + Game.time;
            console.log(`Spawning new harvester: ${newName} (${harvesterBodyParts})`);
            Game.spawns['Spawn1'].spawnCreep(harvesterBodyParts, newName, 
                {memory: {role: 'harvester'}});
        }
        else if(workers.length < RCL) {
            let newName = 'Worker' + Game.time;
            console.log(`Spawning new worker: ${newName} (${workerBodyParts})`);
            Game.spawns['Spawn1'].spawnCreep(workerBodyParts, newName, 
                {memory: {role: 'worker'}});
        }
        else if(builders.length < RCL*2) {
            let newName = 'Builder' + Game.time;
            console.log(`Spawning new builder: ${newName} (${builderBodyParts})`);
            Game.spawns['Spawn1'].spawnCreep(builderBodyParts, newName, 
                {memory: {role: 'builder', subrole: 'harvest'}});
        }
        else if(upgraders.length < RCL*2) {
            let newName = 'Upgrader' + Game.time;
            console.log(`Spawning new upgrader: ${newName} (${upgraderBodyParts})`);
            Game.spawns['Spawn1'].spawnCreep(upgraderBodyParts, newName, 
                {memory: {role: 'upgrader'}});
        }
        else if(repairers.length < 1) {
            let newName = 'Repairer' + Game.time;
            console.log(`Spawning new repairer: ${newName} (${repairerBodyParts})`);
            Game.spawns['Spawn1'].spawnCreep(repairerBodyParts, newName, 
                {memory: {role: 'repairer'}});
        }
    }
};

module.exports = actionSpawn;