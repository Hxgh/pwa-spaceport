// const webpack = require('webpack')

module.exports = {
  // 生产环境是否生成 sourceMap 文件
  //前端代理跨域
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://192.168.104.77:8081',
  //       ws: true,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': '/api'
  //       }
  //     }
  //   },
  //   port: 8888,
  //   host: '0.0.0.0'
  // },
  //使用jQuery
  // configureWebpack: {
  //   plugins: [
  //     new webpack.ProvidePlugin({
  //       $: 'jquery',
  //       jQuery: 'jquery',
  //       jquery: 'jquery',
  //       'window.jQuery': 'jquery',
  //       'root.jQuery': 'jquery'
  //     })
  //   ]
  // },
  productionSourceMap: true,

  lintOnSave: undefined,

  pwa: {
    name: 'Spaceport',
    themeColor: '#32C4EE',
    msTileColor: '#FFDA44',
    manifestOptions: {
      background_color: '#DEF8FF'
    }
  }
}
