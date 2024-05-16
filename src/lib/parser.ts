import { type Command, isCommand } from "./command.js";
import { type InstructionSet } from "./instructions.js";
import { type Coordinate, isDirection, Position } from "./position.js";

function parseCoordinate(value: string): Coordinate | -1 {
  const result = /^(?<x>\d+) (?<y>\d+)$/.exec(value);
  if (result === null || result.groups === undefined) {
    return -1;
  }
  const { x, y } = result.groups;

  return [Number.parseInt(x, 10), Number.parseInt(y, 10)];
}

function parsePosition(value: string): Position | -1 {
  const result = /^(?<x>\d+) (?<y>\d+) (?<d>\w)$/.exec(value);

  if (
    result === null ||
    result.groups === undefined ||
    !isDirection(result.groups.d)
  ) {
    return -1;
  }

  const { x, y, d } = result.groups;
  return [Number.parseInt(x, 10), Number.parseInt(y, 10), d];
}

function parseCommands(value: string): Command[] | -1 {
  const result = /^(?<cmds>\w*)$/.exec(value);

  if (result === null || result.groups === undefined) {
    return -1;
  }

  const commands = result.groups.cmds.split("");
  return commands.every(isCommand) ? commands : -1;
}

export function parse(data: string): InstructionSet | Error {
  const lines = data.trim().split("\n");

  if (lines.length < 3 || lines.length % 2 === 0) {
    console.debug(lines);
    return new Error(
      `Failed to parse instructions: Some data seem to be missing`,
    );
  }

  const topRightCorner = parseCoordinate(lines[0]);
  if (topRightCorner === -1) {
    return new Error(
      `Failed to parse instructions: Invalid coordinate for top right corner (${lines[0]})`,
    );
  }

  let mowers: InstructionSet["mowers"] = [];
  for (let i = 1; i < lines.length; i += 2) {
    const initialPosition = parsePosition(lines[i]);

    if (initialPosition === -1) {
      return new Error(
        `Failed to parse instructions: Invalid initial position at ${i + 1} (${lines[i]})`,
      );
    }

    const commands = parseCommands(lines[i + 1]);
    if (commands === -1) {
      return new Error(
        `Failed to parse instructions: Invalid commands at ${i + 2} (${lines[i + 1]})`,
      );
    }

    mowers = [
      ...mowers,
      {
        initialPosition,
        commands,
      },
    ];
  }

  return {
    zoneSize: topRightCorner,
    mowers,
  };
}
