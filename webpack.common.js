const webpack = require('webpack');
const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
    entry: {
        app: './assets/js/app.js'
    },
    plugins: [
        new HardSourceWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin({
            clearConsole: false,
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery'
        })
    ],
    module: {
        rules: [
            {
                test: require.resolve('jquery'),
                use: [
                    { loader: 'expose-loader', options: '$' }
                ]
            },
            {
                test: require.resolve('./assets/js/mindy'),
                use: [
                    { loader: 'expose-loader', options: 'mindy' }
                ]
            },
            {
                test: require.resolve('wnumb'),
                use: [
                    { loader: 'expose-loader', options: 'wNumb' }
                ]
            },
            {
                test: require.resolve('nouislider'),
                use: [
                    { loader: 'expose-loader', options: 'noUiSlider' }
                ]
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build/js')
    }
};
