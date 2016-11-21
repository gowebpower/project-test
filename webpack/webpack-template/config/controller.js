const HtmlWebpackPlugin = require('html-webpack-plugin');
const parts = require('./parts');

module.exports = (function(){
  const pages = [
    
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: 'app/html/pages/index.pug',
      chunks: [ 'src/vendor/main', 'src/global/config', 'src/global/main', 'src/home/main'],
      chunksSortMode: parts.chunksSort([ 'src/vendor/main', 'src/global/config', 'src/global/main', 'src/home/main'])
    }),

    new HtmlWebpackPlugin({
      filename: 'article-temp.html',
      inject: 'body',
      template: 'app/html/pages/article.pug',
      chunks:  [ 'src/vendor/main', 'src/global/config', 'src/global/main', 'src/article-temp/main'],
      chunksSortMode: parts.chunksSort([ 'src/vendor/main', 'src/global/config', 'src/global/main', 'src/article-temp/main'])
    }),

    new HtmlWebpackPlugin({
      filename: 'pre-reg.html',
      inject: 'body',
      template: 'app/html/pages/pre-reg.pug',
      chunks:  [ 'src/vendor/main', 'src/global/config', 'src/global/main', 'src/pre-reg/main'],
      chunksSortMode: parts.chunksSort([ 'src/vendor/main', 'src/global/config', 'src/global/main', 'src/pre-reg/main'])
    }),

    new HtmlWebpackPlugin({
      filename: 'design-assets.html',
      inject: 'body',
      template: 'app/html/pages/design-assets.pug',
      chunks: [ 'src/vendor/main', 'src/global/main'],
      chunksSortMode: 'dependency'
    })

  ];
  return pages;
})();



