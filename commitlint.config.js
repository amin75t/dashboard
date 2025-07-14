module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["docs", "marge", "update", "ci", "fixed", "refactor", "test", "init"],
    ],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
  },
};
