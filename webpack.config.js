module.exports = {
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: ['svg-loader']
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'resolve-url-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(woff|ttf|otf|eot|woff2|svg)$/i,
          loader: 'file-loader'
        }
      ]
    },
    resolve: {
      alias : {
        "icons": path.resolve(__dirname, "node_modules/vue-ionicons/dist")
      }
    }
  }