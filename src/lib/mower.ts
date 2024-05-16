import { type Command, nextPosition } from "./command.js";
import type { Position, Zone } from "./position.js";

export interface Mower {
  readonly position: Position;
  readonly zone: Zone;
  move(command: Command): Mower;
}

export class MowerC implements Mower {
  #id: string;
  readonly position: Position;
  readonly zone: Zone;

  static create(zone: Zone, initialPosition: Position): Mower {
    if (!zone.isInside(initialPosition)) {
      throw new Error(
        `[${this.name}] Invalid position, ${initialPosition} is not in ${zone}`,
      );
    }

    return new MowerC(zone, initialPosition);
  }

  private constructor(
    zone: Zone,
    initialPosition: Position,
    internalId?: string,
  ) {
    this.#id =
      internalId ?? crypto.getRandomValues(new Uint8Array(1)).toString();
    this.position = initialPosition;
    this.zone = zone;
  }

  move(command: Command): Mower {
    const next = nextPosition(this.position, command);

    if (!this.zone.isInside(next)) {
      return this;
    }

    return this.#clone(next);
  }

  toString(): string {
    return `Mower #${this.#id} ([${this.position}])`;
  }

  #clone(position: Position): Mower {
    return new MowerC(this.zone, position, this.#id);
  }
}
