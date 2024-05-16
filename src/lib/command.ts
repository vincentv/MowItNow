import type { Direction, Position } from "./position.js";

export type Command = "D" | "G" | "A";

export function isCommand(value: string): value is Command {
  return ["D", "G", "A"].includes(value);
}

export function nextPosition(current: Position, command: Command): Position {
  const [x, y, d] = current;

  if (command !== "A") {
    return [x, y, nextDirection(d, "D" === command ? 1 : -1)];
  }

  const offset = ["S", "W"].includes(d) ? -1 : 1;
  return ["S", "N"].includes(d) ? [x, y + offset, d] : [x + offset, y, d];
}

export function nextDirection(current: Direction, offset: 1 | -1): Direction {
  const SortedDirections: Direction[] = ["N", "E", "S", "W"];
  const currentIndex = SortedDirections.indexOf(current);
  const nextIndex = currentIndex + offset;

  if (nextIndex >= SortedDirections.length) {
    return SortedDirections[0];
  }

  if (nextIndex < 0) {
    return SortedDirections[SortedDirections.length - 1];
  }

  return SortedDirections[nextIndex];
}
