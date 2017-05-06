const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.config.js');
let webpack = require('webpack');

module.exports = function (env) {
    return Merge(CommonConfig, {})
}