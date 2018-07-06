export default {
  'log': function (logMsg) {
    console.log(logMsg);
  },
  'error': (msg) => {
    console.error(msg);
  },
  'warn': (msg) => {
    console.warn(msg);
  }
}