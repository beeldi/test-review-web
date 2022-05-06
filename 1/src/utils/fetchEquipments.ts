const equipments = require('./data/equipments.json');

export function fetchEquipments() {
    return Promise.resolve(equipments);
}

export function fetchEquipment(key) {
    return Promise.resolve(equipments.find((equipment) => equipment.key === key))
}
