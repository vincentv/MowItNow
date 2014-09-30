/*global describe,it*/
'use strict';

var assert = require('assert');

var Coordinate  = require('../lib/coordinate.js'),
    Position    = require('../lib/position.js'),
    Zone        = require('../lib/zone.js'),
    Mower       = require('../lib/mower.js');

var fixtures = [
    { ori:{x:1,y:2,dir:'N'}, des:{x:1,y:3,dir:'N'}, cmd:'GAGAGAGAA' },
    { ori:{x:3,y:3,dir:'E'}, des:{x:5,y:1,dir:'E'}, cmd:'AADAADADDA'},
    { ori:{x:0,y:0,dir:'S'}, des:{x:0,y:1,dir:'N'}, cmd:'ADADA'},
    { ori:{x:5,y:0,dir:'S'}, des:{x:5,y:1,dir:'N'}, cmd:'AGAGA'},
    { ori:{x:5,y:5,dir:'N'}, des:{x:5,y:4,dir:'S'}, cmd:'ADADA'},
    { ori:{x:0,y:5,dir:'N'}, des:{x:0,y:4,dir:'S'}, cmd:'AGAGA'}
];

describe('Mower', function() {
    var zone = new Zone(new Coordinate(5,5));

    describe('run()', function () {
        fixtures
        .forEach(function(d) {
            it('['+d.des.x+', '+d.des.y+', '+ d.des.dir +'] if origin = ['+d.ori.x+', '+d.ori.y+', '+ d.ori.dir +'] and cmd '+ d.cmd, function (){
                var mower = new Mower(zone, new Position(new Coordinate(d.ori.x, d.ori.y), d.ori.dir));

                mower.run(d.cmd);

                assert.equal(mower.position.toString(), '['+d.des.x+', '+d.des.y+', '+ d.des.dir +']');
            });
        });
    });
});
