const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleRepairer = require('role.repairer');
const actionSpawn = require('action.spawn');
const roleTower = require('role.tower');
const roleWorker = require('role.worker');

module.exports.loop = function () {
    
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    let mySpawns = Game.spawns;
    for (let mySpawn in mySpawns) {
        actionSpawn.create(mySpawn);
    
        if(Game.spawns[mySpawn].spawning) { 
            let spawningCreep = Game.creeps[Game.spawns[mySpawn].spawning.name];
            Game.spawns[mySpawn].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns[mySpawn].pos.x + 1, 
                Game.spawns[mySpawn].pos.y, 
                {align: 'left', opacity: 0.8});
        }
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
};