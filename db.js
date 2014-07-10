var schema = require("./schema");
var mongoose = require("mongoose");
var config = require("./config");
var userCommands = require("./user");

var queue = schema.CommandQueue;
var user = schema.User;

mongoose.connect(config.db)

var processEntry= function(objectTypes, process) {
  queue.findOne({
    state: "new",
    "args.object": {
      $in: objectTypes 
    }
  }, function (err, entry) {
    console.log(entry);
    if (entry) {
      var starting = function(pid, next) {
        entry.pid = pid;
        entry.state = "started";
        entry.save(next);
      }

      var ending = function(failed, output, next) {
        if (failed) {
          return next();
        }
        entry.doneDate = new Date();
        entry.state = "finished", 
        entry.output = output;
        entry.save(next);
      };

      process(entry, starting, ending);
    } else {
      process(null);
    }
  });
}

var working = false;
var creationWorker = function() {
  processEntry(["user"], function(entry, starting, ending) {
    working = true;
    if (entry != null && entry.command == "create") {
      console.log("Starting");
      starting(process.pid, function(err, ok) {
        var result = userCommands.addUser([entry.args.domain, entry.args.username]);
        var output = null;
        ending(result, output, function() {
          user.update({pendingTransaction: entry._id}, {
            $set: {
              pendingTransaction: "000000000000000000000000" 
            }
          }, function(err, result) {
            console.log(err);
            console.log("done");
            working = false;
          });
        });
      });
    } else {
      console.log("No work to do");
      working = false;
    }
  });
}

setInterval(function() {
  if (!working) {
    console.log("trying");
    creationWorker();
  }
}, 10000);
