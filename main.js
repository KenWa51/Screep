//-------CONFIG-------\\

const SpawningEnabled = true
const MaxMiners = 3
const MaxUpgraders = 3
const MaxBuilders = 1
const MaxRepairers = 1
const MaxStorers = 1

//-------ROLES-------\\

var roles = {
    miner: require('Miner'),
    upgrader: require('Upgrader'),
    builder: require('Builder'),
    repairer: require('Repairer'),
    storer: require('Storer'),
};

//-------LOOP-------\\

module.exports.loop = function() { // <--- Loop 
    
    if (SpawningEnabled == true) { // <--- Checks if spawning is enabled.
        if(_.sum(Game.creeps, (c) => c.memory.role == "miner") < MaxMiners){
            Game.spawns[1].spawnCreep([WORK, WORK, MOVE],Math.random(),{memory: {role: 'miner'}});
        }else if(_.sum(Game.creeps, (c) => c.memory.role == "storer") < MaxStorers){
            Game.spawns[1].spawnCreep([CARRY, CARRY, CARRY, MOVE],Math.random(),{memory: {role: 'storer', full: false}});
        }else if(_.sum(Game.creeps, (c) => c.memory.role == "upgrader") < MaxUpgraders){
            Game.spawns[1].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE],Math.random(),{memory: {role: 'upgrader', full: false}});
        }else if(_.sum(Game.creeps, (c) => c.memory.role == "builder") < MaxBuilders){
            if(Game.spawns[1].room.find(FIND_CONSTRUCTION_SITES) != undefined){
                Game.spawns[1].spawnCreep([WORK, WORK, CARRY, MOVE],Math.random(),{memory: {role: 'builder', full: false}});
            }
        }else if(_.sum(Game.creeps, (c) => c.memory.role == "repairer") < MaxRepairers){
            if(Game.spawns[1].room.find(FIND_STRUCTURES, {filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL}) != undefined){
                Game.spawns[1].spawnCreep([WORK, CARRY, CARRY, MOVE],Math.random(),{memory: {role: 'repairer', full: false}});
            }
        }
        
    }
    
    for (let name in Game.creeps) {
        
        var creep = Game.creeps[name];
        
        if(creep != undefined){
            
            roles[creep.memory.role].run(creep);
            
        }
        
    }
    if(Game.time % 20 == 0){
        for (let name in Memory.creeps) {
            if (Game.creeps[name] == undefined) {
                delete Memory.creeps[name];
            }
        }
    }
    
    
}