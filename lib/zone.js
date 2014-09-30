'use strict';

var Coordinate = require('./coordinate');

var origin = new Coordinate(0, 0);

var Zone = function (extremity) {
    this.origin = origin;
    this.extremity = extremity;
};

Zone.prototype.isInside = function (coordinate) {

    if (!(coordinate instanceof Coordinate)) {
        throw new Error('coordinate must be an instance of Coordinate');
    }

    var ok = true;

    ok = ok && this.origin.x <= coordinate.x && this.origin.y <= coordinate.y;
    ok = ok && this.extremity.x >= coordinate.x && this.extremity.y >= coordinate.y;

    return ok;
};

Zone.prototype.toString = function () {
    return '[' + this.origin.toString() + ', ' + this.extremity.toString() + ']';
};

Zone.prototype.isValid = function () {
    return !!this.origin.isValid() && !!this.extremity.isValid();
};

module.exports = Zone;
