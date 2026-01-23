const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: 'development',
  // IMPORTANT: If your config is inside the 'src' folder, use './index.js'
  // If your config is in the project root, use './src/index.js'
  entry: './src/index.js', 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
    clean: true, // Cleans the dist folder before building
  },
  // This is the missing block that caused the crash!
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    watchFiles: ['index.html', '*.scss', '*.js'], // Watch for changes
    hot: true,
    open: true,
  },
  module: {
    rules: [{
      test: /\.s?css$/,
      use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
    }]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserJSPlugin({})
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].bundle.css'
    }),
  ]
};