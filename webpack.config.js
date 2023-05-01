const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const PrettierPlugin = require("webpack-prettier-plugin");

module.exports = {
  entry: "./main.js",
  output: {
    path: path.join(__dirname, "build"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  mode: "production",
  devServer: {
    static: {
      directory: path.join(__dirname, "index.html"),
    },
    compress: true,
    port: 3000,
  },
  devtool: "source-map",
  plugins: [
    new PrettierPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "index.html"),
    }),
  ],
};
