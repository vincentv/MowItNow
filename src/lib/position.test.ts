import { describe, it, expect } from "vitest";
import {
  type Coordinate,
  type Position,
  type Zone,
  ZoneC,
  isDirection,
} from "./position.js";

describe("isDirection", () => {
  it.each(["N", "E", "W", "S"])("should return true for %s", (dir) => {
    expect(isDirection(dir)).toBe(true);
  });

  it.each(["n", "NE", "up", "DOWN", "null", "0", ""])(
    "should return false for %s",
    (dir) => {
      expect(isDirection(dir)).toBe(false);
    },
  );
});

describe("Zone", () => {
  describe("construtor", () => {
    it("should throw an error when initialized with invalid coordinates", () => {
      expect(() => new ZoneC([1, 1], [0, 0])).toThrow(
        "[ZoneC] Invalid coordinates : bottomLeftCoord(1,1) > topRightCoord(0,0)",
      );
    });
  });

  describe("isInside", () => {
    const zone = new ZoneC([0, 0], [5, 5]);

    it.each<[boolean, Coordinate | Position, Zone]>([
      [true, [0, 0], zone],
      [true, [5, 5], zone],
      [true, [2, 3], zone],
      [true, [2, 3, "N"], zone],
      [true, [2, 3, "E"], zone],
      [true, [2, 3, "W"], zone],
      [true, [2, 3, "S"], zone],
      [false, [-1, 0], zone],
      [false, [0, -1], zone],
      [false, [4, 6], zone],
      [false, [5, 6], zone],
      [false, [6, 4], zone],
      [false, [6, 5], zone],
      [false, [6, 5, "E"], zone],
    ])("should return %s for %s in %s", (expected, coord, inZone) => {
      expect(inZone.isInside(coord)).toBe(expected);
    });
  });

  describe("toString", () => {
    const zone = new ZoneC([0, 0], [5, 5]);

    it("should return a string representation of the Zone", () => {
      expect(zone.toString()).toBe("[[0,0] [5,5]]");
    });
  });
});
