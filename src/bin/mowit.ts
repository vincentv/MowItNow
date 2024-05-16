#! /usr/bin/env node

// eslint-disable no-console
import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { run, parse } from "../lib/index.js";

const userArgs = process.argv;

const helpFlags = ["-h", "--help"];
const versionFlags = ["-v", "--version"];
const flags = [...helpFlags, ...versionFlags, "--debug"];

const filepath = userArgs.filter((arg) => !flags.includes(arg))[2];

if (userArgs.some((arg) => helpFlags.includes(arg)) || filepath === undefined) {
  console.info("usage : mowit <filepath>");
  process.exit(0);
}

if (userArgs.some((arg) => versionFlags.includes(arg))) {
  await import(
    join(dirname(fileURLToPath(import.meta.url)), "..", "package.json"),
    { assert: { type: "json" } }
  )
    .then((data) => console.info(data.default.version))
    .finally(() => process.exit(0));
}

readFile(filepath)
  .then((buffer) => {
    const instructions = parse(buffer.toString());
    if (instructions instanceof Error) {
      throw instructions;
    }
    run(instructions, console);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(-1);
  });
