const  path = require('path');

module.exports = {
  output: path.resolve(__dirname, '../public'),
  devServer: {
    host: options.devhost,
    https: true,
    port: options.devport, // 8084?
    open: false, // opens browser window automatically
    vueDevtools: ctx.vueDevtools,
    proxy: {
      '/': {
        target: options.appurl, // 'http://localhost:8085', // pathRewrite: {'^/api': ''}
        secure: false
      }
    }
  },
}
