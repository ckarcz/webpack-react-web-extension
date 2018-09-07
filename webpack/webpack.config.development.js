/**
 * Base webpack config common to all build types.
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfigFactory = require('./webpack.config.base.js');

const overrideConfigFactory = (env) => {

  const projectDir = process.cwd();
  const outputDir = path.resolve(projectDir, env.OUTPUT_PATH);

  env.DEV_SRV = env.DEV_SRV || false;
  env.DEV_SRV_HTTPS = env.DEV_SRV_HTTPS || true;
  env.DEV_SRV_HOST = env.DEV_SRV_HOST || 'localhost';
  env.DEV_SRV_PORT = env.DEV_SRV_PORT || 8080;
  env.DEV_SRV_URL = env.DEV_SRV_URL || `${env.DEV_SRV_HTTPS ? 'https' : 'http'}://${env.DEV_SRV_HOST}:${env.DEV_SRV_PORT}`;

  console.log(env.DEV_SRV);
  console.log(env.DEV_SRV_URL);

  return {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': `'${env.NODE_ENV}'`
        }
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.pug/,
          use: [
            {
              loader: 'raw-loader'
            },
            {
              loader: 'pug-html-loader',
              query: {
                pretty: true,
                data: {
                  DEV_SRV: env.DEV_SRV,
                  DEV_SRV_URL: env.DEV_SRV_URL
                }
              }
            }
          ]
        }
      ]
    },
    devServer: {
      https: env.DEV_SRV_HTTPS,
      host: env.DEV_SRV_HOST,
      port: env.DEV_SRV_PORT,
      contentBase: outputDir,
      publicPath: '/',
      hot: true,
      hotOnly: true,
      compress: false,
      disableHostCheck: true
    },
  };
};

module.exports = (env) => {
  const baseConfig = baseConfigFactory(env);
  const overrideConfig = overrideConfigFactory(env);
  const mergedConfig = merge(baseConfig, overrideConfig);
  return mergedConfig;
};
