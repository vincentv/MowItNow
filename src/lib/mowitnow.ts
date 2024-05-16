import type { InstructionSet } from "./instructions.js";
import { MowerC } from "./mower.js";
import { type Zone, ZoneC } from "./position.js";

interface Notifier {
  debug(value: unknown): void;
  error(value: unknown): void;
  info(value: unknown): void;
}

export function run(instructions: InstructionSet, notifier: Notifier): void {
  const { mowers, zoneSize } = instructions;

  try {
    const zone: Zone = new ZoneC([0, 0], zoneSize);
    notifier.debug("Starts ...");

    mowers.forEach(({ initialPosition, commands }) => {
      const mower = MowerC.create(zone, initialPosition);
      notifier.info(`${mower} : starts ...`);
      const last = commands.reduce((current, command) => {
        const next = current.move(command);
        notifier.debug(`${current} → ${next}`);
        return next;
      }, mower);
      notifier.info(`${last} : stopped !`);
    });

    notifier.debug("Finished !");
  } catch (error) {
    notifier.error(error);
  }
}
