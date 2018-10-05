const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

// entry point -> output

module.exports = {
  entry: "./src/app.js",
  output: {
    // node function - makes sure the path works across all filesystems
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/" /* base path for all assets - refresh */
  },
  // loader - npm i babel-core babel-loader
  // also .babelrc file for presets
  module: {
    rules: [
      {
        // all js files except node_modules folder - anything app.js imports
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        // '?' means the s optional (scss and css files)
        test: /\.s?css$/,
        // use allows us to have multiple loaders
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [htmlPlugin],
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "src"),
    historyApiFallback: true /* redirect 404's to /index.html  - refresh */,
    port: 3000,
    open: true,
    proxy: {
      "/api": "http://localhost:8080"
    }
  },
  // webpack 4 requirement
  mode: "development"
};

// react-router refreshing/url links
// https://tylermcginnis.com/react-router-cannot-get-url-refresh/

// inside package.json build script
// -p shorthand for production - not recommended - https://webpack.js.org/guides/production/ (cli alternatives)
