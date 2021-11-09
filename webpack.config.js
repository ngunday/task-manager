const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, options) => {
  const port = 8888;
  const hostUrl = `http://localhost:${port}`;
  const isDevelopment = options.mode === 'development';

  return {
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      hot: false,
      port,
    },
    devtool: 'inline-source-map',
    entry: path.resolve(__dirname, 'src/index.ts'),
    externals: { fdc3: 'fdc3', fin: 'fin' },
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: 'ts-loader' },
        {
          test: /\.js$/,
          use: ['source-map-loader'],
          enforce: 'pre',
        },
        {
          test: /\.(eot|gif|jpg|otf|png|svg|ttf|woff|woff2)$/,
          use: 'file-loader',
        },
      ],
    },
    performance: {
      hints: false,
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'res/app.json'),
            transform(buffer) {
              const json = JSON.parse(buffer.toString());
              // json.platform.applicationIcon = `${hostUrl}${json.platform.applicationIcon}`;
              // json.platform.defaultWindowOptions.url = `${hostUrl}${json.platform.defaultWindowOptions.url}`;
              return JSON.stringify(json, null, 2);
            },
          },
          { from: path.resolve(__dirname, 'res/openfin-icon.png') },
        ],
      }),
      new HtmlWebpackPlugin({
        favicon: path.resolve(__dirname, 'res/favicon.ico'),
        template: path.resolve(__dirname, 'res/index.html'),
      }),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
    },
  };
};
