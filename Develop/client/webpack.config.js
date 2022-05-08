const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: "development",
    // Entry point for files
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    // Output for our bundles
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
// TODO: Add and configure workbox plugins for a service worker and manifest file.
  new HtmlWebpackPlugin({
    template: './index.html',
    title: 'JATE'
  }),

  // Injects our custom service worker
  new InjectManifest({
    swSrc: "./src-sw.js",
    swDest: "src-sw.js",
}),

  
new WebpackPwaManifest({
  fingerprints: false,
  inject: true,
  name: 'JATE - Just Another Text Editor',
  short_name: 'J.A.T.E.',
  description: 'Just Another Text Editor!',
  background_color: '#7eb4e2',
  theme_color: '#7eb4e2',
  start_url: '/',
  publicPath: '/',
  icons: [
    {
      src: path.resolve('src/images/logo.png'),
      sizes: [96, 128, 192, 256, 384, 512],
      destination: path.join('assets', 'icons'),
    },
  ],
}),
//////////
],
// TODO: Add CSS loaders and babel to webpack.

module: {
  // CSS loaders
  rules: [
    {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    },
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      // We use babel-loader in order to use ES6.
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: [
            "@babel/plugin-proposal-object-rest-spread",
            "@babel/transform-runtime",
          ],
        },
      },
    },
  ],
},
};
};