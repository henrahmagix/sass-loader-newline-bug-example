const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: '[name].css',
});

module.exports = {
    entry: {
        app: './src/js/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.sass$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                    fallback: 'style-loader',
                }),
            },
        ],
    },
    plugins: [
        extractSass,
        new webpack.NamedModulesPlugin(),
    ],
};
