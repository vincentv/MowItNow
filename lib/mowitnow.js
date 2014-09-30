'use strict';

var Coordinate  = require('./coordinate.js'),
    Position    = require('./position.js'),
    Zone        = require('./zone.js'),
    Mower       = require('./mower.js');


function strToInt(value) {
    return parseInt(value, 10);
}

exports.run = function(entries) {

    var i = 1,
        length = entries.length,
        corner = entries[0].split(' '),
        zone = new Zone(new Coordinate(strToInt(corner[0]), strToInt(corner[1])));

    for (i; i < length; i += 2) {
        var mower, pos = entries[i].split(' ');

        mower = new Mower(zone, new Position(new Coordinate(strToInt(pos[0]), strToInt(pos[1])), pos[2]));
        mower.run(entries[i + 1]);
    }

};
