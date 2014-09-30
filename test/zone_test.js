/*global describe,it*/
'use strict';

var assert = require('assert');

var Coordinate  = require('../lib/coordinate'),
    Zone        = require('../lib/zone');


describe('Zone', function() {

    describe('isInside', function () {
        var zone = new Zone(new Coordinate(5, 5));

        it("[0, 5] is inside " + zone.toString(), function () {
            var coordinate = new Coordinate(0, 5);
            assert.ok(zone.isInside(coordinate));
        });
        it("[2, 3] is inside " + zone.toString(), function () {
            var coordinate = new Coordinate(2, 3);
            assert.ok(zone.isInside(coordinate));
        });

        it("[6, 0] is not inside " + zone.toString(), function () {
            var coordinate = new Coordinate(6, 0);
            assert.ok(!zone.isInside(coordinate));
        });

        it("[7, 6] is not inside " + zone.toString(), function () {
            var coordinate = new Coordinate(7, 6);
            assert.ok(!zone.isInside(coordinate));
        });

    });
});


