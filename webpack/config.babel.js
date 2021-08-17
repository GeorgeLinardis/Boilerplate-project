import path from 'path';
import { ENV_DEVELOPMENT, NODE_ENV } from '../config/envs';

const rootPath = process.cwd();
const buildPath = path.join(rootPath, 'build');

const config =  {
  devtool: 'eval-source-map',
  mode: 'development',
  devServer: {
    contentBase: '/build/',
    host: '0.0.0.0',
    port: 3030,
    quiet: true,
    inline: true,
    publicPath: '/build/',
  },
  entry: path.join(rootPath, 'src/index'),
  output: {
    path: buildPath,
    filename: NODE_ENV === ENV_DEVELOPMENT ? '[name].js' : '[name].[hash].js',
  },
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
    ]
  },
}

export default config;
