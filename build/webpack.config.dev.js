const webpack = require('webpack');
const path = require('path');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const baseConfig = require('./webpack.config');
const fs = require('fs');

module.exports = {
    ...baseConfig,
    mode: 'development',
    devtool: 'eval',
    resolve: {
        ...baseConfig.resolve,
    },
    plugins: [
        ...baseConfig.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshPlugin(),
    ],
    output: {
        ...baseConfig.output,
        publicPath: '/dist/',
        clean: false,
    },
    devServer: {
        port: 3000,
        host: '0.0.0.0',
        contentBase: path.resolve('out'),
        historyApiFallback: true,
        hot: true,
        hotOnly: true,
        inline: true,
        publicPath: '/',
        watchContentBase: true,
        writeToDisk: true,
        before: (
            app,
            // server,
            //  compile
        ) => {
            app.get('/api/data', (req, res) => {
                const json = fs.readFileSync(
                    path.resolve('./sample/sample.json'),
                );
                res.json(JSON.parse(json));
            });
        },
    },
};
