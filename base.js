
var _ = require("lodash");
var Base = function() {
  this.name = "base";
}

Base.prototype.help = {};
Base.prototype.handle = function() {
  if (typeof(arguments[0][0]) === "undefined") {
    return this.showHelp();
  }

  var f = this[arguments[0][0]];
  if (typeof(f) === "function") {
    try {
      f.call(this, arguments[0].splice(1));
    } catch(e) {
      process.stderr.write("ERROR: " + e.name + ": " + e.message + "\n");
      process.exit(0);
    }
  } else {
    return this.showHelp();
  }
}

Base.prototype.showHelp = function() {
  var self = this;
  _.each(this.help, function(item, i) {
    console.log(process.argv[1] + " " + self.name + " " + i + " " + item);
    console.log("");
  });
}

module.exports = Base;
