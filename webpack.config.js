const webpack = require('webpack');
const { join } = require('path');
const pathTo = path => join(__dirname, path);
const config = { module: {} };

// paths
const dist = pathTo('./dist');
const src = pathTo('./src');
const components= pathTo('./src/components');
const exclude = /node_modules/;

// Plugins
const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { extract } = ExtractTextPlugin;


// Context.
config.context = src;


// Entry.
config.entry = ['./components/styles/index.scss', './index.js'];


// Rules.
config.module.rules = [{
    test: /\.(js|jsx)$/,
    exclude: exclude,
    use: 'babel-loader',
}, {
    test: /\.(scss)$/,
    include: components,
    use: extract({
        use: 'css-loader!postcss-loader!sass-loader'
    }),
}];


// Output.
config.output = {
    path: dist,
    filename: 'script.js',
};


module.exports = env => {
    const shouldClean = env && env.production ? new CleanPlugin(['./dist']) : () => {};
    config.plugins = [
        shouldClean,
        new CopyPlugin([{ context: './images', from: '**/*', to: dist + '/images' }]),
        new CopyPlugin([{ from: './index.html', to: dist }]),
        new ExtractTextPlugin('style.css'),
    ];
    return config;
}
