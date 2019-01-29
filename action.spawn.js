const actionSpawn = {

    create: function(RCL, fullExtensions){

        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        // let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        let workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');

        let workerBodyParts = [WORK].fill(Math.floor(fullExtensions/2)+1).concat([CARRY,MOVE]);
        let harvesterBodyParts = [WORK].concat([CARRY].fill(fullExtensions+1)).concat([MOVE]);
        // let repairerBodyParts = [WORK].concat([CARRY].fill(fullExtensions+1)).concat([MOVE]);
        let builderBodyParts = [WORK].concat([CARRY].fill(fullExtensions+1)).concat([MOVE]);
        let upgraderBodyParts = [WORK].concat([CARRY].fill(fullExtensions+1)).concat([MOVE]);

        if(workers.length < RCL*2) {
            let newName = 'Worker' + Game.time;
            console.log(`Spawning new worker: ${newName} (${workerBodyParts})`);
            Game.spawns['Spawn1'].spawnCreep(workerBodyParts, newName, 
                {memory: {role: 'worker'}});
        }
        if(harvesters.length < RCL*2) {
            let newName = 'Harvester' + Game.time;
            console.log(`Spawning new harvester: ${newName} (${harvesterBodyParts})`);
            Game.spawns['Spawn1'].spawnCreep(harvesterBodyParts, newName, 
                {memory: {role: 'harvester'}});
        }
        /*else if(repairers.length < 1) {
            let newName = 'Repairer' + Game.time;
            console.log(`Spawning new repairer: ${newName} (${repairerBodyParts})`);
            Game.spawns['Spawn1'].spawnCreep(repairerBodyParts, newName, 
                {memory: {role: 'repairer'}});
        }*/
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
    }
};

module.exports = actionSpawn;