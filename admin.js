var SureliaError = require("./error");
var Base = require("./base");

var Admin = function() {
  this.name = "admin";
}

Admin.prototype = new Base();
Admin.prototype.help = {};
Admin.prototype.help.addVirtualHost = 
  "host user\n\tAdds a new virtual host 'host' and handled by 'user'"; 

Admin.prototype.addVirtualHost = function(args) {
  var host = args[0];
  var user = args[1];
  if (!(host && user)) {
    return SureliaError.invalidArgument("Must specify host and user.");
  }

  var w = fs.createWriteStream(); 
}


module.exports = new Admin();
