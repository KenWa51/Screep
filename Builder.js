module.exports = {
    run: function(creep) {
        if (creep.memory.full == true && creep.carry.energy == 0) {
            creep.memory.full = false;
        }
        else if (creep.memory.full == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.full = true;
        }
        
        if (creep.memory.full == true) {
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (constructionSite != undefined) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite);
                }
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