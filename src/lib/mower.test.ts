import { describe, it, expect } from "vitest";
import { type Command } from "./command.js";
import { Mower, MowerC } from "./mower.js";
import type { Position, Zone } from "./position.js";

describe("Mower", () => {
  const zone = {
    isInside: (position: Position) =>
      position[0] >= 0 &&
      position[0] <= 5 &&
      position[1] >= 0 &&
      position[1] <= 5,

    toString: () => "[[0,0] [5, 5]]",
  } satisfies Zone & { toString(): string };

  describe("create", () => {
    it("should create a new Mower with valid initial position", () => {
      const initialPosition: Position = [1, 2, "N"];
      const mower: Mower = MowerC.create(zone, initialPosition);
      expect(`${mower}`).toContain(initialPosition);
    });

    it("should throw an error when creating a Mower with invalid initial position", () => {
      const initialPosition: Position = [6, 6, "N"];

      expect(() => MowerC.create(zone, initialPosition)).toThrow(
        `Invalid position, ${initialPosition} is not in ${zone}`,
      );
    });
  });

  describe("move", () => {
    it("should move the Mower to the next position when the next position is inside the zone", () => {
      const initialPosition: Position = [1, 2, "N"];
      const mower = MowerC.create(zone, initialPosition);
      const command: Command = "A";
      const expectedPosition: Position = [1, 3, "N"];

      const result = mower.move(command);
      expect(result.position).toEqual(expectedPosition);
      expect(result).not.toBe(mower);
    });

    it("should not move the Mower when the next position is outside the zone", () => {
      const initialPosition: Position = [1, 5, "N"];
      const mower: Mower = MowerC.create(zone, initialPosition);
      const command: Command = "A";
      const expectedPosition: Position = [1, 5, "N"];

      const result = mower.move(command);
      expect(result.position).toEqual(expectedPosition);
      expect(result).toBe(mower);
    });
  });

  describe("toString", () => {
    it("should return a string representation of the Mower", () => {
      const initialPosition: Position = [1, 2, "N"];
      const mower: Mower = MowerC.create(zone, initialPosition);
      expect(mower.toString()).toMatch(/Mower #\w+ \(\[1,2,N\]\)/);
    });
  });
});
