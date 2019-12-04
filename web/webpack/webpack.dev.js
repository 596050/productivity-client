const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlTemplate = require("html-webpack-template");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

const {
  API_URL,
  APP_MOUNT_ID,
  APP_HOSTNAME,
  NODE_ENV,
  PROJECT_TITLE,
  SERVER_PORT
} = process.env;

module.exports = {
  name: "client",
  target: "web",
  devtool: "source-map",
  mode: "development",
  devServer: {
    stats: "minimal",
    inline: true,
    port: SERVER_PORT,
    host: APP_HOSTNAME,
    contentBase: [path.resolve(__dirname, "../build")],
    historyApiFallback: {
      rewrites: [{ from: /.*\.html/, to: "/index.html" }]
    }
  },
  entry: ["webpack/hot/dev-server", path.resolve(__dirname, "../run.js")],
  output: {
    path: path.resolve(__dirname, "../build"),
    publicPath: "/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: [".web.js", ".js"],
    modules: ["./src", "node_modules"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      title: PROJECT_TITLE,
      inject: false,
      template: HtmlTemplate,
      appMountId: APP_MOUNT_ID,
      mobile: true,
      minify: {
        collapseWhitespace: true
      },
      meta: [
        {
          name: "viewport",
          content: [
            "width=device-width",
            "initial-scale=1",
            "maximum-scale=1",
            "user-scalable=0"
          ]
        }
      ]
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(NODE_ENV),
      "process.env.API_URL": JSON.stringify(API_URL),
      "process.env.APP_MOUNT_ID": JSON.stringify(APP_MOUNT_ID)
    })
  ]
};
