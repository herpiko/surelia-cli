var SureliaError = require("./error");
var Base = require("./base");

var Admin = function() {
 // surelia admin addVirtualHost bla bla.com 
}
Admin.prototype = new Base();
Admin.prototype.help.addVirtualHost = 
  "host user\n\tAdds a new virtual host 'host' and handled by 'user'"; 

Admin.prototype.addVirtualHost = function(args) {
  var host = args[0];
  var user = args[1];
  if (!(host && user)) {
    return SureliaError.invalidArgument("Must specify host and user.");
  }
}


module.exports = new Admin();
