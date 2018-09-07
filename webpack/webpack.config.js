/**
 * Webpack config entry point.
 */

module.exports = (env) => {
  console.log('Webpack env: ', env);
  const webpackConfigPath = `./webpack.config.${env.NODE_ENV}.js`;
  console.log('Webpack file: ', webpackConfigPath);
  const webpackConfigFactory = require(webpackConfigPath);
  const webpackConfig = webpackConfigFactory(env);
  // console.log('Webpack cfg:\n', webpackConfig);
  console.log();
  return webpackConfig;
};
