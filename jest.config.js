/** @type {import('jest').Config} */

module.exports = {
  preset: "jest-preset-angular",
  roots: ["<rootDir>/src/"],
  modulePaths: ["<rootDir>/src/"],
  setupFilesAfterEnv: ["<rootDir>/src/setupJest.ts"],
  reporters: ["default", "jest-junit"],
};
