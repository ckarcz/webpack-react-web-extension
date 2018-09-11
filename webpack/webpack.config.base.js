/**
 * Base webpack config common to all build types.
 */

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfigFactory = (env) => {

  const projectDir = process.cwd();
  const outputDir = path.resolve(projectDir, env.OUTPUT_PATH);

  return {
    entry: {
      background: [path.join(projectDir, 'src/extension/background/background.js')],
      popup: [path.join(projectDir, 'src/extension/popup/popup.js')],
      options: [path.join(projectDir, 'src/extension/options/options.js')]
    },
    output: {
      path: outputDir,
      filename: 'js/[name].bundle.js',
    },
    plugins: [
      new CleanWebpackPlugin([outputDir], {
        root: process.cwd(),
        verbose: true,
        beforeEmit: true
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': `'${env.NODE_ENV}'`
        }
      }),
      new WriteFilePlugin(),
      new HtmlWebpackPlugin({
        template: path.join(projectDir, 'src/extension/background/background.pug'),
        filename: 'html/background.html',
        chunks: ['background'],
        inject: false,
      }),
      new HtmlWebpackPlugin({
        template: path.join(projectDir, 'src/extension/popup/popup.pug'),
        filename: 'html/popup.html',
        chunks: ['popup'],
        inject: false,
      }),
      new HtmlWebpackPlugin({
        template: path.join(projectDir, 'src/extension/options/options.pug'),
        filename: 'html/options.html',
        chunks: ['options'],
        inject: false,
      }),
      new CopyWebpackPlugin([{
        from: path.join(projectDir, `src/extension/manifest.${env.NODE_ENV}.json`),
        to: 'manifest.json'
      }]),
      new CopyWebpackPlugin([{
        from: path.join(projectDir, 'src/assets'),
        to: 'assets'
      }])
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['env']
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        path.join(projectDir, 'src'),
        'node_modules',
      ],
    }
  };
};

module.exports = baseConfigFactory;
