var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');


module.exports.loop = function () {
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    
    var myRoom = Game.spawns["Spawn1"].room;
    var RCL = myRoom.controller.level;
    let extensions = myRoom.find(FIND_MY_STRUCTURES, { filter: (s) => s.structureType == STRUCTURE_EXTENSION && s.energy == s.energyCapacity});
    
    Game.spawns['Spawn1'].energy
    let bodyParts;
    switch(extensions.length){
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
    }

    if(Game.spawns['Spawn1'].energy == Game.spawns.Spawn1.energyCapacity){
        if(harvesters.length < RCL*3) {
            var newName = 'Harvester' + Game.time;
            console.log(`Spawning new harvester: ${newName} (${bodyParts})`);
            Game.spawns['Spawn1'].spawnCreep(bodyParts, newName, 
                {memory: {role: 'harvester'}});
        }
        else if(upgraders.length < RCL*4) {
            var newName = 'Upgrader' + Game.time;
            console.log(`Spawning new upgrader: ${newName} (${bodyParts})`);
            Game.spawns['Spawn1'].spawnCreep(bodyParts, newName, 
                {memory: {role: 'upgrader'}});
        }
        else if(builders.length < RCL*5) {
            var newName = 'Builder' + Game.time;
            console.log(`Spawning new builder: ${newName} (${bodyParts})`);
            Game.spawns['Spawn1'].spawnCreep(bodyParts, newName, 
                {memory: {role: 'builder', subrole: 'harvest'}});
        }
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}