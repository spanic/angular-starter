/** @type {import('jest').Config} */

module.exports = {
  preset: "jest-preset-angular",
  globalSetup: "jest-preset-angular/global-setup",
  roots: ["<rootDir>/src/"],
  modulePaths: ["<rootDir>"],
  setupFilesAfterEnv: ["<rootDir>/src/setupJest.ts"],
  moduleNameMapper: {
    d3: "<rootDir>/node_modules/d3/dist/d3.min.js",
    "^d3-(.*)$": "<rootDir>/node_modules/d3-$1/dist/d3-$1.min.js",
  },
  reporters: ["default", "jest-junit"],
};
