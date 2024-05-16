export type Coordinate = [number, number];

export type Direction = "N" | "E" | "W" | "S";

export type Position = [number, number, Direction];

export interface Zone {
  isInside(position: Position | Coordinate): boolean;
}

export function isDirection(value: string): value is Direction {
  return ["N", "E", "W", "S"].includes(value);
}

export class ZoneC {
  readonly bottomLeftCoord: Coordinate;
  readonly topRightCoord: Coordinate;

  constructor(bottomLeftCoord: Coordinate, topRightCoord: Coordinate) {
    if (
      bottomLeftCoord[0] > topRightCoord[0] ||
      bottomLeftCoord[1] > topRightCoord[1]
    ) {
      throw new Error(
        `[${this.constructor.name}] Invalid coordinates : bottomLeftCoord(${bottomLeftCoord}) > topRightCoord(${topRightCoord})`,
      );
    }
    this.bottomLeftCoord = bottomLeftCoord;
    this.topRightCoord = topRightCoord;
  }

  isInside(coordinate: Coordinate | Position): boolean {
    return (
      this.bottomLeftCoord[0] <= coordinate[0] &&
      this.bottomLeftCoord[1] <= coordinate[1] &&
      this.topRightCoord[0] >= coordinate[0] &&
      this.topRightCoord[1] >= coordinate[1]
    );
  }

  toString(): string {
    return `[[${this.bottomLeftCoord}] [${this.topRightCoord}]]`;
  }
}
