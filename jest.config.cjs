module.exports = {
    moduleFileExtensions: [
        'js'
    ],
    transform: {
      '\\.[jt]sx?$': 'babel-jest',
    },
    testMatch: [
        '**/test/**/*.test.(ts|js)','**/*.steps.(ts|js)'
    ]
};