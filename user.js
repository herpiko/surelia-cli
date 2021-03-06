var SureliaError = require("./error");
var Base = require("./base");
var config = require("./config");
var fs = require("fs");
var schema = require("./schema");
var bknScrapper = require("bkn-scrapper");
var user = schema.User;
var domainModel = schema.Domain;

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

  var dir = [config.home, config.maildir, host, user + "@" +host];
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

User.prototype.setPassword = function(args, cb) {
  var username = args[0];
  var domain;
  var oldPassword = args[1];
  var newPassword = args[2];

  if (!(username && oldPassword && newPassword)) {
    return cb(SureliaError.invalidArgument("Must specify username and passwords."));
  }

  var u = username.split("@");
  if (u.length != 2) {
    return cb(SureliaError.invalidArgument("Incorrect username"));
  }

  username = u[0];
  domain = u[1];

  if (!(username && domain)) {
    return cb(SureliaError.invalidArgument("Must specify username and domain."));
  }

  var findDomain = function(domain, cb) {
    domainModel.findOne({name: domain}, function(err, domainData) {
      if (err) {
        return cb(SureliaError.internalError(err));
      }
      if (domainData == null) {
        return cb(SureliaError.invalidArgument("Unknown domain"));
      }
      cb(domainData._id);
    });
  };

  var findUser = function(username, domain, cb) {
    findDomain(domain, function(domainId) {
      user.findOne({username: username, domain: domainId}).exec(function(err, doc) {
        if (err) {
          return cb(SureliaError.internalError(err));
        }
        cb(doc);
      });
    });
  }

  findUser(username, domain, function(doc) {
    if (doc) {
      doc.auth(oldPassword, function(ok) {
        if (ok != true) {
          return cb(SureliaError.invalidData("oldPassword"));
        }

        var id = doc._id;
        doc.setPassword(newPassword, function(hash) {
          doc.update({$set: {hash: hash}}, function(err, saved) {
            if (err) {
              return cb(SureliaError.internalError(err));
            }
            return cb(saved == 1);
          });
        });
      });
    } else {
      return cb(false);
    }
  });
}

User.prototype.profile = function(args, cb) {
  var username = args[0];
  var domain;

  if (!(username)) {
    return cb(SureliaError.invalidArgument("Must specify username."));
  }

  var u = username.split("@");
  if (u.length != 2) {
    return cb(SureliaError.invalidArgument("Incorrect username"));
  }

  username = u[0];
  domain = u[1];

  if (!(username && domain)) {
    return cb(SureliaError.invalidArgument("Must specify username and domain."));
  }

  var findDomain = function(domain, cb) {
    domainModel.findOne({name: domain}, function(err, domainData) {
      if (err) {
        return cb(SureliaError.internalError(err));
      }
      if (domainData == null) {
        return cb(SureliaError.invalidArgument("Unknown domain"));
      }
      cb(domainData._id);
    });
  };

  var findUser = function(username, domain, cb) {
    findDomain(domain, function(domainId) {
      user.findOne({username: username, domain: domainId}).exec(function(err, doc) {
        if (err) {
          return cb(SureliaError.internalError(err));
        }
        cb(doc);
      });
    });
  }

  findUser(username, domain, function(doc) {
    if (doc) {
      if (doc.profile && 
        doc.profile.id && 
        doc.profile.name &&
        doc.profile.organization) {
        return cb(doc.profile);
      } else if (doc.profile && 
        doc.profile.id) {
        var bkn = new bknScrapper();
        bkn.getData(doc.profile.id, function(data) {
          var profile = {
            id: data.NIP,
            name: data.Nama,
            title: data.Jabatan,
            class: data["Golongan Ruang (TMT)"],
            organization: data["Instansi Kerja"],
            state: data["Kedudukan PNS"],
            oldId: data["NIP Lama"],
            lastEducation: data["Pendidikan Terakhir"],
            unit: data["Unit Kerja"],
            parentUnit: data["Unit Kerja Induk"],
          }

          doc.update({$set: { profile: profile }}, function(err, saved) {
            if (err) {
              return cb(SureliaError.internalError(err));
            }
            return cb(profile);
          });
        });
      } else { 
        return cb("NO DATA");
      }
    } else {
      return cb(false);
    }
  });
}
module.exports = new User();
