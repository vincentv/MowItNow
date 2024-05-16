import type { Command } from "./command.js";
import type { Coordinate, Position } from "./position.js";

export interface MowerInstructions {
  initialPosition: Position;
  commands: readonly Command[];
}

export interface InstructionSet {
  zoneSize: Coordinate;
  mowers: readonly MowerInstructions[];
}
