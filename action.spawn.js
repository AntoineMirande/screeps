let actionSpawn = {

    create: function(RCL, fullExtensions){

        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
        
        let bodyParts;
        switch(fullExtensions.length){
            case 0:
                bodyParts = [WORK,CARRY,MOVE];
                break;
            case 1:
                bodyParts = [WORK,CARRY,MOVE,MOVE];
                break;
            case 2:
                bodyParts = [WORK,WORK,CARRY,MOVE];
                break;
            case 3:
                bodyParts = [WORK,WORK,CARRY,MOVE,MOVE];
                break;
            case 4:
                bodyParts = [WORK,WORK,WORK,CARRY,MOVE];
                break;
            case 5:
                bodyParts = [WORK,WORK,WORK,CARRY,MOVE,MOVE];
                break;
            default:
                bodyParts = [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE];
        }

        if(harvesters.length < RCL*2) {
            let newName = 'Harvester' + Game.time;
            console.log(`Spawning new harvester: ${newName} (${bodyParts})`);
            Game.spawns['Spawn1'].spawnCreep(bodyParts, newName, 
                {memory: {role: 'harvester'}});
        }
        else if(repairers.length < RCL*1-1) {
            let newName = 'Repairer' + Game.time;
            console.log(`Spawning new repairer: ${newName} (${bodyParts})`);
            Game.spawns['Spawn1'].spawnCreep(bodyParts, newName, 
                {memory: {role: 'repairer'}});
        }
        else if(builders.length < RCL*2-1) {
            let newName = 'Builder' + Game.time;
            console.log(`Spawning new builder: ${newName} (${bodyParts})`);
            Game.spawns['Spawn1'].spawnCreep(bodyParts, newName, 
                {memory: {role: 'builder', subrole: 'harvest'}});
        }
        else if(upgraders.length < RCL*2) {
            let newName = 'Upgrader' + Game.time;
            console.log(`Spawning new upgrader: ${newName} (${bodyParts})`);
            Game.spawns['Spawn1'].spawnCreep(bodyParts, newName, 
                {memory: {role: 'upgrader'}});
        }
    }
};

module.exports = actionSpawn;