/*global describe,it*/
'use strict';

var assert = require('assert');

var Coordinate = require('../lib/coordinate');


describe('Coordinate', function() {
    var errorMsg = /X and Y must be an integer/;

    it("throw an error on init if X is not an integer", function () {
        assert.throws(function () {var c = new Coordinate('X', 0); }, errorMsg);
    });

    it("throw an error on init if Y is not an integer", function () {
        assert.throws(function () {var c = new Coordinate(1, 'Y'); }, errorMsg);
    });


    it("does not throw an error on init if X and Y are integer", function () {
        assert.doesNotThrow(function () {var c = new Coordinate(1, 1); });
    });
});

