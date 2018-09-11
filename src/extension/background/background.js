/**
 * Chrome extension backgroung page script.
 * https://developer.chrome.com/extensions/background_pages
 */

const logger = require('../../common/util/loggerFactory').createLogger('background.js');
const browser = require('webextension-polyfill');

logger.info('Background script loaded.');

browser.runtime.getPlatformInfo()
  .then(info => console.log('Platform info: ', info));
