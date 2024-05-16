import { beforeEach, describe, expect, it, vi } from "vitest";
import { InstructionSet } from "./instructions.js";
import { run } from "./mowitnow.js";
import { Coordinate } from "./position.js";

describe("run", () => {
  let notifier!: {
    debug: (data: unknown) => void;
    error: (data: unknown) => void;
    info: (data: unknown) => void;
  };

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

  beforeEach(() => {
    notifier = {
      debug: vi.fn(),
      error: vi.fn(),
      info: vi.fn(),
    };
  });

  it("should call notifier during the execution of instructionSet", () => {
    run(instructionSet, notifier);
    expect(notifier.debug).toHaveBeenCalledTimes(21);
    expect(notifier.error).toHaveBeenCalledTimes(0);

    expect(notifier.debug).toHaveBeenNthCalledWith(1, "Starts ...");
    expect(notifier.debug).toHaveBeenNthCalledWith(21, "Finished !");

    expect(notifier.info).toHaveBeenNthCalledWith(
      1,
      expect.stringMatching(/Mower #\w+ \(\[1,2,N\]\) : starts/),
    );
    expect(notifier.info).toHaveBeenNthCalledWith(
      2,
      expect.stringMatching(/Mower #\w+ \(\[1,3,N\]\) : stopped/),
    );

    expect(notifier.info).toHaveBeenNthCalledWith(
      3,
      expect.stringMatching(/Mower #\w+ \(\[3,3,E\]\) : starts/),
    );
    expect(notifier.info).toHaveBeenNthCalledWith(
      4,
      expect.stringMatching(/Mower #\w+ \(\[5,1,E\]\) : stopped/),
    );
  });

  it("should notify an error and stop the execution if the zone size is invalid", () => {
    const invalidInstrutionSet = {
      ...instructionSet,
      zoneSize: [5, -1] satisfies Coordinate,
    };
    run(invalidInstrutionSet, notifier);

    expect(notifier.debug).toHaveBeenCalledTimes(0);
    expect(notifier.debug).toHaveBeenCalledTimes(0);
    expect(notifier.error).toHaveBeenCalledTimes(1);
  });
});
