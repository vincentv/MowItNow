/*global describe,it*/
'use strict';

var assert = require('assert');

var Coordinate  = require('../lib/coordinate'),
    Position    = require('../lib/position');


describe('Position', function() {
    var errorMsg = /coordinate or direction is invalid/;

    it("throw an error on init if coordinate is invalid", function () {
        var errorMsg = /X and Y must be an integer/;

        assert.throws(function () {var p = new Position(new Coordinate('X', 0), 'N'); }, errorMsg);
        assert.throws(function () {var p = new Position(new Coordinate('X', 'Y'), 'N'); }, errorMsg);
        assert.throws(function () {var p = new Position(new Coordinate(0, 'Y'), 'N'); }, errorMsg);
    });

    it("throw an error on init if direction is invalid", function () {
        var coordinate = new Coordinate(0, 0),
            errorMsg = /coordinate or direction is invalid/;

        assert.throws(function () {var p = new Position(coordinate, 'A'); }, errorMsg);
        assert.throws(function () {var p = new Position(coordinate, 2); }, errorMsg);
    });

    it("does not throw an error on init if coordinate and direction are valid", function () {
        var coordinate = new Coordinate(0, 0);
        assert.doesNotThrow(function () {var p = new Position(coordinate, 'N');});
    });
});

