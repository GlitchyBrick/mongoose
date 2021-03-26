const { Schema, model } = require('mongoose');

const Arsenal = Schema({
    id: String,
    AK: {
        default: '0',
        type: Number
    },
    Pistols: {
        default: '0',
        type: Number
    },
    RPG: {
        default: '0',
        type: Number
    },
    Snipers: {
        default: '0',
        type: Number
    },
    Jets: {
        default: '0',
        type: Number
    },
    Nukes: {
        default: '0',
        type: Number
    },
    Heli: {
        default: '0',
        type: Number
    },
    Aircraft: {
        default: '0',
        type: Number
    },
    Submerine: {
        default: '0',
        type: Number
    },
    Ship: {
        default: '0',
        type: Number
    },
    Tank: {
        default: '0',
        type: Number
    },
    Shotgun: {
        default: '0',
        type: Number
    }
});
module.exports = model('Arsenal', Arsenal);
