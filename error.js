var SureliaError = function(error) {
  var e = Error.apply(this, [error.message]);
  this.message = e.message;
  this.stack = e.stack;
  this.name = error.name;
};

SureliaError.invalidArgument = function(message) {
  var e = new SureliaError({
    name: "invalidArgument",
    message: message
  });
  return e;
}

SureliaError.internalError = function(message) {
  var e = new SureliaError({
    name: "internalError",
    message: message
  });
  return e;
}

SureliaError.invalidData = function(message) {
  var e = new SureliaError({
    name: "invalidData",
    message: message
  });
  return e;
}



SureliaError.prototype = new Error();

module.exports = SureliaError;
