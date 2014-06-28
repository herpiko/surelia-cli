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
  throw e;
}
SureliaError.prototype = new Error();

module.exports = SureliaError;
