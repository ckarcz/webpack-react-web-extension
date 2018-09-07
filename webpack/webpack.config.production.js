/**
 * Base webpack config common to all build types.
 */

/* eslint-disable no-console */

const merge = require('webpack-merge');

const baseConfigFactory = require('./webpack.config.base');

const overrideConfigFactory = (env) => {
  return {
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
                pretty: true
              }
            }
          ]
        }
      ]
    },
  };
};

module.exports = (env) => {
  const baseConfig = baseConfigFactory(env);
  const overrideConfig = overrideConfigFactory(env);
  const mergedConfig = merge(baseConfig, overrideConfig);
  return mergedConfig;
};
