module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    transform: {
        '^.+\\.vue$': 'jest-vue-preprocessor'
    },
    transformIgnorePatterns: ["/node_modules/(?!(@storybook/.*\\.vue$))"],
}