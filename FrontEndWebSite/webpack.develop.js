let commonConfig = require('./webpack.config.js');
let webpack = require('webpack');
let Merge = require('webpack-merge');

module.exports = function (env) {
    return Merge(commonConfig, {})
}