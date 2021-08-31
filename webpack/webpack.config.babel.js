import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { ENV_DEVELOPMENT, NODE_ENV } from '../config/envs';

const rootPath = process.cwd();
const buildPath = path.join(rootPath, 'public');
const templatesPath = path.join(rootPath, 'templates');

const config =  {
  devtool: 'eval-source-map',
  mode: 'development',
  entry: path.join(rootPath, 'src/index'),
  output: {
    path: buildPath,
    filename: NODE_ENV === ENV_DEVELOPMENT ? '[name].js' : '[name].[hash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'My app',
      template: path.join(templatesPath, 'index.html'),
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },
}

export default config;
