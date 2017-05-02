let _ = require('lodash');
let webpack = require('webpack');
let path = require('path');

let babelOptions = {
    "presets": ["es2015"]
};

function isVendor(module) {
    return module.context && module.context.indexOf('node_modules') !== -1;
}

let entries = {
    index: './index.tsx'
};

module.exports = {
    context: __dirname + '/src',
    entry: entries,
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    devServer: {
        open: true, // to open the local server in browser
        contentBase: __dirname,
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
	
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
        modules: [path.resolve(__dirname, "src"), "node_modules"]
        //modulesDirectories: ['src', 'node_modules'],
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
          names: ['vendor'],
          minChunks: function (module, count) {
              // creates a common vendor js file for libraries in node_modules
              return isVendor(module);
          }
      }),
      new webpack.optimize.CommonsChunkPlugin({
          name: "commons",
          chunks: _.keys(entries),
          minChunks: function (module, count) {
              // creates a common vendor js file for libraries in node_modules
              return !isVendor(module) && count > 1;
          }
      })
    ],

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader' 1st 
            // then 'babel-loader'
            // NOTE : loaders run right to left (think of them as a cmd line pipe)
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                  {
                      loader: 'babel-loader',
                      options: babelOptions
                  },
                  {
                      loader: 'awesome-typescript-loader'
                  }
                ]
            },

            // All files with a '.js' extension will be handled by 'babel-loader'.
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                  {
                      loader: 'babel-loader',
                      options: babelOptions
                  }
                ]
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    }
};