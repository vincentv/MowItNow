import { describe, it, expect } from "vitest";
import {
  isCommand,
  nextPosition,
  nextDirection,
  type Command,
} from "./command.js";
import type { Direction, Position } from "./position.js";

describe("isCommand", () => {
  it.each<[boolean, string]>([
    [true, "D"],
    [true, "G"],
    [true, "A"],
    [false, "B"],
    [false, "null"],
    [false, ""],
  ])("should return %s for %s", (expected, command) => {
    expect(isCommand(command)).toBe(expected);
  });
});

describe("nextPosition", () => {
  it.each<[Position, Position, Command]>([
    [[0, 0, "E"], [0, 0, "N"], "D"],
    [[0, 1, "S"], [0, 1, "E"], "D"],
    [[3, 3, "N"], [3, 3, "W"], "D"],
    [[1, 2, "W"], [1, 2, "S"], "D"],
    [[0, 0, "W"], [0, 0, "N"], "G"],
    [[0, 1, "N"], [0, 1, "E"], "G"],
    [[3, 3, "S"], [3, 3, "W"], "G"],
    [[1, 2, "E"], [1, 2, "S"], "G"],
    [[0, 1, "N"], [0, 0, "N"], "A"],
    [[1, 1, "E"], [0, 1, "E"], "A"],
    [[2, 3, "W"], [3, 3, "W"], "A"],
    [[1, 1, "S"], [1, 2, "S"], "A"],
  ])(
    "should return %s for current position %s and command %s",
    (expected, current, command) => {
      const result = nextPosition(current, command);
      expect(result).toEqual(expected);
    },
  );
});

describe("nextDirection", () => {
  it.each<[Direction, Direction, 1 | -1]>([
    ["E", "N", 1],
    ["S", "E", 1],
    ["N", "W", 1],
    ["W", "S", 1],
    ["W", "N", -1],
    ["N", "E", -1],
    ["S", "W", -1],
    ["E", "S", -1],
  ])(
    "should return %s for direction %s and offset %s",
    (expected, direction, offset) => {
      expect(nextDirection(direction, offset)).toBe(expected);
    },
  );
});
