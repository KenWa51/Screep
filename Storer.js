module.exports = {
    run: function(creep) {
        if (creep.memory.full == true && creep.carry.energy == 0) {
            creep.memory.full = false;
        }
        else if (creep.memory.full == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.full = true;
        }
        
        if (creep.memory.full == true) {
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: (s) => (s.structureType == STRUCTURE_SPAWN|| s.structureType == STRUCTURE_EXTENSION|| s.structureType == STRUCTURE_TOWER)&& s.energy < s.energyCapacity});

            if (structure == undefined) {
                structure = creep.room.storage;
            }
            if (structure != undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }else{
                creep.moveTo(9,24)
            }
        }
        else {
            let container;
            container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE) &&
                             s.store[RESOURCE_ENERGY] > 100
            });
            if (container != undefined) {
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }
            }
            if (container == undefined) {
                var source = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
                if (creep.pickup(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
    }
};