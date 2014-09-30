/*global describe,it*/
'use strict';
var assert = require('assert');

var PubSub      = require('../lib/vendor/publish.js'),
    MowItNow    = require('../lib/mowitnow.js');

var fixtures = {
    data: ["5 5", "1 2 N", "GAGAGAGAA", "3 3 E", "AADAADADDA"],
    topics: ['movements/started', 'movements/stopped'],
    targets: ['[1, 3, N]', '[5, 1, E]']
};

describe('MowItNow.', function() {

    it('runs tondeuses', function () {
        MowItNow.run(fixtures.data);
    });

    fixtures
    .topics
    .forEach(function (topic) {
        it('use topic ' + topic, function () {

            PubSub.subscribe(topic, function (msg, pos) {
                assert.ok(/\[\d+,\s\d+,\s[NEWS]\]/.test(pos));
                assert.equal(topic, msg);

                if('movements/stopped' === topic) {
                    assert.ok(-1 < fixtures.targets.indexOf(pos));
                }
            });

            MowItNow.run(fixtures.data);
        });
    });
});

