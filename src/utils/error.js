export default {
  'log': (logMsg) => console.log("%cVIDEO Log '%s'", "color: green", logMsg),
  'error': (msg) => {
    console.error("%cVIDEO Error: %s", "color: red", msg);
  },
  'warn': (msg) => {
    console.warn("%cVIDEO Warn '%s'", "color: #88CA3B", msg);
  }
}