var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/app'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  // absolute path in JS file.
  resolve: {
    root: [
      path.resolve('./client'),
      path.resolve('./client/themes')
    ]
  },
  module: {
    loaders: [
    // js
    {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'client')
    },
    // CSS
    { 
        test: /\.scss$/, 
        include: path.join(__dirname, 'client/themes'),
        loader: "style!css?-url!autoprefixer?{browsers:['last 4 version']}!sass?sourceMap&includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib")
      }
    ]
  }
};
