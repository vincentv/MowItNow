"use strict";

var Coordinate = require('./coordinate');

var Position = function (coordinate, direction){

    this.coordinate = coordinate;
    this.direction = direction;

    if(!this.isValid()) {
        throw new Error('coordinate or direction is invalid');
    }
};

Position.prototype.toString = function () {
    return '[' + this.coordinate.x + ', ' + this.coordinate.y + ', ' + this.direction + ']';
};

Position.prototype.isValid = function () {
    return this.coordinate instanceof Coordinate && this.coordinate.isValid() && 0 <= 'NEWS'.indexOf(this.direction);
};

module.exports = Position;
