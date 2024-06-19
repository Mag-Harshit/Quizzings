// webpack.config.js

const path = require('path');

module.exports = {
  entry: './src/index.js',  // entry point of your application
  output: {
    path: path.resolve(__dirname, 'dist'),  // output directory
    filename: 'bundle.js'  // output bundle file name
  },
  module: {
    rules: [
      // add loaders or rules for different file types (e.g., JS, CSS, etc.)
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',  // example loader for JavaScript (requires babel)
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    fallback: {
      "zlib": require.resolve("browserify-zlib"),
      "async_hooks": require.resolve("async_hooks-browserify"),
      "querystring": require.resolve("querystring-es3"),
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "fs": false,
      "http": require.resolve("stream-http"),
      "stream": require.resolve("stream-browserify")
    }
  }
};