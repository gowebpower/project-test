module.exports = {
  entry: './src/js/app.js',
  // entry: {
  //   'hehe': './src/js/app.js',
  //   'hehe2': './src/js/app2.js'

  // },
  output: {
    path: '__dirname',
    filename: 'app.bundle.js'
    // filename: '[name].js'
  },
  devtool:'source-map',
  module: {
    preLoaders:[
      { test:/\.js$/, loader: 'jshint-loader', exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.js$/, loader: 'babel?presets[]=es2015', exclude: /node_modules/ } ,
      { test: /\.css$/, loaders: ['style-loader', 'css-loader']},
      { test: /\.html$/, loader: 'raw'}
    ]
  }
};