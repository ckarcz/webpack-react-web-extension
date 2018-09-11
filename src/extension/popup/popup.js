/**
 * Extension popup page script.
 * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Popups
 * https://developer.chrome.com/extensions/browserAction#popups
 */

const logger = require('../../common/util/loggerFactory').createLogger('popup.js');

logger.info('Popup script loaded.');

// here we can render a react component in #root etc..
