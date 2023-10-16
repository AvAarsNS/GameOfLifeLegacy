module.exports = {
    moduleFileExtensions: [
        'ts',
        'js'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            // ts-jest configuration goes here
        }],
    },
    testMatch: [
        '**/test/**/*.test.(ts|js)',
        '**/*.steps.(ts|js)'
    ]
};
