// https://jestjs.io/docs/en/configuration.html
// https://basarat.gitbook.io/typescript/intro-1/jest#step-2-configure-jest

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    "roots": [
        "<rootDir>/test"
    ],
    "testMatch": [
        "**/__tests__/**/*.+(ts|tsx)",
        "**/?(*.)+(spec|test).+(ts|tsx)"
    ],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
}