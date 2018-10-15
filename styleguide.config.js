const path = require('path');

module.exports = {
    propsParser: require('react-docgen-typescript').parse,
    require: [path.join(__dirname, 'src/index.css')],
    webpackConfig: require('react-scripts-ts/config/webpack.config.dev'),
    exampleMode: 'collapse',
    usageMode: 'collapse',
    pagePerSection: true,
    sections: [
        {
            name: 'Generic Components',
            components: 'src/components/**/*.tsx',
        },
        {
            name: 'Creator Components',
            components: 'src/creator/components/creator-wizard/**/*.tsx',
        }
    ],
};