/// <reference types="vitest" />
import { configDefaults, defineConfig } from "vitest/config";

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  test: {
    include: [...configDefaults.include, "./test/**/*.ts"],
    coverage: {
      exclude: [...(configDefaults.coverage.exclude ?? []), "bin/**", "lib/**"],
    },
  },
});
