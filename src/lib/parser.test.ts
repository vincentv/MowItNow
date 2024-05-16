import { beforeEach, describe, it, expect, assert } from "vitest";
import { InstructionSet } from "./instructions.js";
import { parse } from "./parser.js";

describe("parse", () => {
  let data: string;

  beforeEach(() => {
    data = `5 5\n1 2 N\nGAGAGAGAA\n3 3 E\nAADAADADDA`;
  });

  it("should parse the data and return an InstructionSet", () => {
    const instructionSet: InstructionSet = {
      zoneSize: [5, 5],
      mowers: [
        {
          initialPosition: [1, 2, "N"],
          commands: ["G", "A", "G", "A", "G", "A", "G", "A", "A"],
        },
        {
          initialPosition: [3, 3, "E"],
          commands: ["A", "A", "D", "A", "A", "D", "A", "D", "D", "A"],
        },
      ],
    };

    assert.doesNotThrow(() => parse(data));
    expect(parse(data)).toMatchObject(instructionSet);
  });

  it("should return an error if the data is missing", () => {
    data = "";

    const result = parse(data);
    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe(
      `Failed to parse instructions: Some data seem to be missing`,
    );
  });

  it("should return an error if the data is incomplete", () => {
    data = `5 5\n1 2 N\nGAGAGAGAA\n3 3 E`;

    const result = parse(data);
    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe(
      `Failed to parse instructions: Some data seem to be missing`,
    );
  });

  it("should return an error if the zone size is invalid", () => {
    data = `5 -1\n1 2 N\nGAGAGAGAA\n3 3 E\nAADAADADDA`;

    const result = parse(data);
    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe(
      `Failed to parse instructions: Invalid coordinate for top right corner (5 -1)`,
    );
  });

  it("should return an error if the initial position is invalid", () => {
    data = `5 5\n1 2 X\nGAGAGAGAA\n3 3 E\nAADAADADDA`;

    const result = parse(data);
    expect(result).toBeInstanceOf(Error);
    expect((result as Error).message).toBe(
      `Failed to parse instructions: Invalid initial position at 2 (1 2 X)`,
    );
  });

  it.each([
    [`5 5\n1 2 N\nGAGAGAGAX\n3 3 E\nAADAADADDA`, "GAGAGAGAX", 3],
    [`5 5\n1 2 N\nGAGAGAGAA\n3 3 E\nAAD.ADADDA`, "AAD.ADADDA", 5],
  ])(
    "should return an error if the commands are invalid",
    (data, inError, line) => {
      const result = parse(data);
      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe(
        `Failed to parse instructions: Invalid commands at ${line} (${inError})`,
      );
    },
  );
});
