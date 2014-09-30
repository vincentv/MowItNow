'use strict';
// @see http://addyosmani.com/resources/essentialjsdesignpatterns/book/
// @see https://github.com/addyosmani/pubsubz/blob/master/pubsubz.js

// Storage for topics that can be broadcast
// or listened to
var topics = {};

// An topic identifier
var subUid = -1;

var PubSub = {
    // Publish or broadcast events of interest
    // with a specific topic name and arguments
    // such as the data to pass along
    publish: function( topic, args ) {

        if ( !topics[topic] ) {
            return false;
        }

        var subscribers = topics[topic];

        if(subscribers) {
            subscribers
            .forEach(function (subscriber) {
                subscriber.func.call(this, topic, args );
            });
        }

        return this;
    },

    // Subscribe to events of interest
    // with a specific topic name and a
    // callback function, to be executed
    // when the topic/event is observed
    subscribe: function( topic, func ) {

        if (!topics[topic]) {
            topics[topic] = [];
        }

        subUid += 1;
        var token = ( subUid ).toString();
        topics[topic].push({
            token: token,
            func: func
        });
        return token;
    },

    // Unsubscribe from a specific
    // topic, based on a tokenized reference
    // to the subscription
    unsubscribe: function( token ) {
        for ( var m in topics ) {
            if ( topics[m] ) {
                for ( var i = 0, j = topics[m].length; i < j; i += 1 ) {
                    if ( topics[m][i].token === token ) {
                        topics[m].splice( i, 1 );
                        return token;
                    }
                }
            }
        }
        return this;
    }
};

module.exports = PubSub;
