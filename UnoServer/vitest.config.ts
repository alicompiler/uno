const { defineConfig } = require('vitest/config');

module.exports = defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['**/*.test.ts'],
        coverage: {
            exclude: ['**/GameMocks.ts'],
        },
    },
});
