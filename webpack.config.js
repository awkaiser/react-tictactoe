/* eslint-disable no-var */

var path = require('path')

module.exports = {
  entry: './src/app.jsx',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              compact: false
            }
          }
        ]
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'app.js'
  },
  stats: {
    modules: false
  }
}
