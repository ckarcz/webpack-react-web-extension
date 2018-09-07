// entry point and defaults for logging

const logLevel = require('loglevel');
const logLevelPrefix = require('loglevel-plugin-prefix');

// set up loglevel logging
if (process.env.NODE_ENV === 'production') {
  logLevel.setLevel('info');
} else {
  logLevel.enableAll();
}
logLevelPrefix.reg(logLevel);
logLevelPrefix.apply(logLevel, {
  template: '[EXTENSION] [%t] %l (%n):',
  levelFormatter(level) {
    return level.toUpperCase();
  },
  nameFormatter(name) {
    return name || 'global';
  },
  timestampFormatter(date) {
    return date.toISOString();
  },
});

// utility function to get name of currently executing script name
// 1 frame back in stack from this method's call
// https://stackoverflow.com/a/19807441
function getScriptName() {
  const lastStackFrameRegex = new RegExp(/.+\/(.*?):\d+(:\d+)*$/);
  const currentStackFrameRegex = new RegExp(/getScriptName \(.+\/(.*):\d+:\d+\)/);
  const error = new Error();
  let source = null;

  source = lastStackFrameRegex.exec(error.stack.trim());
  if (source && source[1] !== '') {
    return source[1];
  }
  source = currentStackFrameRegex.exec(error.stack.trim());
  if (source) {
    return source[1];
  }
  if (error.fileName !== undefined) {
    return error.fileName;
  }
}

function createLogger(context) {
  return logLevel.getLogger(context || getScriptName());
}

module.exports = {
  createLogger
};
