let commonConfig = require('./webpack.config.js');
let webpack = require('webpack');
let Merge = require('webpack-merge');

module.exports = function (env) {
    return Merge(commonConfig, {
        plugins: [
          new webpack.LoaderOptionsPlugin({
              minimize: true,
              debug: false
          }),
          new webpack.DefinePlugin({
              'process.env': {
                  'NODE_ENV': JSON.stringify('production')
              }
          }),
          new webpack.optimize.UglifyJsPlugin({
              // Eliminate comments
              comments: false,
              beautify: false,
              mangle: {
                  screw_ie8: true,
                  keep_fnames: true
              },
              compress: {
                  screw_ie8: true,

                  // remove warnings
                  warnings: false,

                  // Drop console statements
                  drop_console: true
              },
              comments: false
          })
        ]
    })
}