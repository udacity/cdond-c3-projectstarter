"use strict";

var compilerOptions = require("./tsconfig.json");

module.exports = function(wallaby) {
  return {
    files: [
      "src/**/*.tsx",
      "src/**/*.ts",
      "package.json",
      "!src/**/*.spec.tsx",
      "!src/**/*.spec.ts"
    ],
    tests: ["src/**/*.spec.tsx", "src/**/*.spec.ts"],
    env: {
      type: "node",
      runner: "node"
    },
    compilers: {
      "**/*.ts?(x)": wallaby.compilers.typeScript(compilerOptions)
    },
    testFramework: "jest",
    debug: true,
    bootstrap: function(wallaby) {
      wallaby.testFramework.configure(require("./package.json").jest);
    }
  };
};