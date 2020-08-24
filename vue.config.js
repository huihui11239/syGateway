

module.exports = {
  // 基本路径
  publicPath: "./",
  // 输出文件目录
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,

  configureWebpack: () => { },
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,

  parallel: require("os").cpus().length > 1,

  // 第三方插件配置
  pluginOptions: {
  },
  css: {
    sourceMap: true // 开启 CSS source maps
  },


  devServer: {
    open: true,
    inline: false,
    proxy: {
      '/web': {
        target: 'http://192.168.1.201:8080/',
        changeOrigin: true,
        pathRewrite: {
          '^/rng': ''
        }
      }
    }
  },




};
