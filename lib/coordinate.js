"use strict";

require('./vendor/number');

var Coordinate = function (x, y){
    this.x = x;
    this.y = y;

    if(!this.isValid()) {
        throw new Error('X and Y must be an integer');
    }
};

Coordinate.prototype.toString = function () {
    return '[' + this.x + ', ' + this.y + ']';
};

Coordinate.prototype.isValid = function () {
    return Number.isInteger(this.x) && Number.isInteger(this.y);
};

module.exports = Coordinate;
