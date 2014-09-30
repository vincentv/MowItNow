"use strict";

var PubSub      = require('./vendor/publish'),
    Itineraire  = require('./itineraire');


function _run(mower, instructions) {
    instructions
    .split('')
    .forEach(mower.move, mower);
}


var Mower = function (zone, position) {
    this.zone = zone;
    this.position = position;
};


Mower.prototype.move = function (instruction) {
    var next = Itineraire.move(this.position, instruction);

    if(-1 === next || !next.isValid()) {
        return -1;
    }

    if(this.zone.isInside(next.coordinate)) {
        this.position = next;
    }
};

Mower.prototype.run = function (instructions) {
    PubSub.publish('movements/started', this.position.toString());

    _run(this, instructions);

    PubSub.publish('movements/stopped', this.position.toString());
};

module.exports = Mower;
