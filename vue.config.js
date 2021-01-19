const path = require("path");

module.exports = {
  productionSourceMap: false,

  pwa: {
    name: '每日知乎',
    themeColor: '#eaedf7',
    manifestOptions: {
      background_color: '#eaedf7'
    }
  },
  configureWebpack: {
    entry: {
      index: "./src/main.js"
    },
    output: {
      filename: "[name].[hash:5].js",
      chunkFilename: "[name].[hash:5].js",
      path: path.resolve(__dirname, "dist")
    },
    externals: {
      vue: "Vue",
      axios: "axios"
    }
  }
}