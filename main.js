const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleRepairer = require('role.repairer');
const actionSpawn = require('action.spawn');
const roleTower = require('role.tower');
const roleWorker = require('role.worker');

module.exports.loop = function () {
    
    let myRoom = Game.spawns["Spawn1"].room;
    let RCL = myRoom.controller.level;
    let extensions = myRoom.find(FIND_MY_STRUCTURES, { filter: (structure) => structure.structureType == STRUCTURE_EXTENSION });
    let fullExtensions = extensions.filter(extension => extension.energy == extension.energyCapacity).length;
    
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    if(Game.spawns['Spawn1'].energy == Game.spawns.Spawn1.energyCapacity && fullExtensions >= Math.floor(extensions.length/3)){
        actionSpawn.create(RCL, fullExtensions);
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        if(creep.memory.role == 'worker') {
            roleWorker.run(creep);
        }
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }
    
    roleTower.defend();
}