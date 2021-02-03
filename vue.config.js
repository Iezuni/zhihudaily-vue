module.exports = {
  productionSourceMap: false,

  pwa: {
    name: '每日知乎',
    themeColor: '#eaedf7',
    manifestOptions: {
      background_color: '#eaedf7'
    },
    workboxOptions: {
      skipWaiting: true,
    },
    clientsClaim: true,
  },
  configureWebpack: {
    output: {
      filename: "[name].[hash:5].js",
      chunkFilename: "[name].[hash:5].js",
    },
    externals: {
      vue: "Vue",
      axios: "axios",
      "js-base64": "Base64"
    }
  }
}