const  path = require('path');

module.exports = {
  output: path.resolve(__dirname, '../public'),
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:4000'
      }
    }
  }
}
