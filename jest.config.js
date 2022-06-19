/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    globals: {
        'ts-jest': {
            diagnostics: false,
        }
    },
    preset: 'ts-jest',
    testEnvironment: 'node',
};
