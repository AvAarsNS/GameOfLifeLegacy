module.exports = {
    moduleFileExtensions: [
        'ts',
        'js'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testMatch: [
        '**/test/**/*.test.(ts|js)',
        '**/*.steps.(ts|js)'
    ],
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json'
        }
    },
};
