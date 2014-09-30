'use strict';

var Coordinate  = require('./coordinate'),
    Position    = require('./position');

var directions = ['N', 'W', 'S', 'E'],
    instructionDirection    = ['D', 'G'],
    instructionMovement     = ['A'];


function _isInstruction(ref, value) {
    return 0 <= ref.indexOf(value);
}

function _rotateIndex(index) {
    var length = directions.length;

    return (index >= length) ? 0 : (index < 0) ? length -1 : index;
}

function _newPosition(x, y, dir) {
    return new Position(new Coordinate(x, y), dir);
}

function _nextLocation (curPos) {
    var inc = 1,
    direction = curPos.direction,
    nextX = curPos.coordinate.x,
    nextY = curPos.coordinate.y;

    if ('S' === direction || 'W' === direction) {
        inc = -1;
    }

    if ('S' === direction || 'N' === direction) {
        nextY += inc;
    } else {
        nextX += inc;
    }

    return _newPosition(nextX, nextY, direction);
}

function  _nextDirection (curPos, instruction) {
    var curIndex, nextIndex;

    curIndex = directions.indexOf(curPos.direction);

    nextIndex = ('G' === instruction) ? curIndex + 1 : curIndex - 1;
    nextIndex = _rotateIndex(nextIndex);

    return _newPosition(curPos.coordinate.x, curPos.coordinate.y, directions[nextIndex]);
}


exports.move = function (position, instruction) {

    if(_isInstruction(instructionDirection, instruction)) {
        return _nextDirection(position, instruction);
    }
    else if(_isInstruction(instructionMovement, instruction)) {
        return _nextLocation(position);
    }

    return -1;
};

