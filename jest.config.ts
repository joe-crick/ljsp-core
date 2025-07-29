import type { Config } from "jest";

const config: Config = {
  testEnvironment: "node",
  verbose: true,
  rootDir: "tests",
  testPathIgnorePatterns: ["./lib", "./node_modules/", "./dist"],
  transform: {
    "^.+\\.ts$": ["ts-jest", {
      useESM: true,
    }]
  },
  extensionsToTreatAsEsm: ['.ts'],
  coverageReporters: ["json-summary", "text", "text-summary", "lcov"]
};

export default config;
