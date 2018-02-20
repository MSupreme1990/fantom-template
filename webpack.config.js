const Encore = require('@symfony/webpack-encore');
const fixes = Encore.isProduction() ? [] : ['./hmr.js'];
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

Encore
    .setOutputPath('build/')
    .setPublicPath('/build')
    .addEntry('js/app', ['./assets/js/app.js'].concat(fixes))
    .addStyleEntry('css/app', './assets/css/app.scss')
    .cleanupOutputBeforeBuild()
    .enableSassLoader()
    .enablePostCssLoader()
    .autoProvidejQuery()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction());

let config = Encore.getWebpackConfig();
config.plugins.push(
    // https://github.com/mzgoddard/hard-source-webpack-plugin
    new HardSourceWebpackPlugin()
);
module.exports = config;
