var cbs = [];

module.exports = {
  addCB: function(cb) {
    cbs.push(cb);
  },
  runCBs: function() {
    cbs.forEach(function(cb){cb();})
  }
}
