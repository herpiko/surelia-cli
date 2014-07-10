var SureliaError = require("./error");
var Base = require("./base");
var config = require("./config");
var fs = require("fs");

var User = function() {
  this.name = "user";
}

User.prototype = new Base();
User.prototype.help = {};
User.prototype.help.addUser = 
  "host user\n\tAdds a new user 'user' in 'host' domain"; 

User.prototype.addUser = function(args) {
  var host = args[0];
  var user = args[1];
  if (!(host && user)) {
    return SureliaError.invalidArgument("Must specify host and user.");
  }

  var dir = [config.home, config.maildir, user + "@" +host];
  var dirs = dir.join("/").split("/");
  var d = "";
  for (var i = 0; i < dirs.length; i ++) {
    d += "/" + dirs[i];
    try {
      fs.mkdirSync(d, 0700);
    }
    catch (e) {
      console.log(e);
    }
  }

  return true;
}


module.exports = new User();
