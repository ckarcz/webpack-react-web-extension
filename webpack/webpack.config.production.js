/**
 * Base webpack config common to all build types.
 */

const merge = require('webpack-merge');

const baseConfigFactory = require('./webpack.config.base');

const prodConfigFactory = (env) => {
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
  const prodConfig = prodConfigFactory(env);
  const mergedConfig = merge(baseConfig, prodConfig);
  return mergedConfig;
};
