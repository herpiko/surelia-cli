
var SureliaError = require("./error");
var user = require("./user");
var config = require("./config");
var gearmanode = require("gearmanode");
var mongoose = require("mongoose");

mongoose.connect(config.db)
var worker = gearmanode.worker({});

worker.addFunction("setPassword", function(job) {
  var payload = JSON.parse(job.payload.toString());
  try {
    user.setPassword([payload.username, payload.oldPassword, payload.newPassword], function(result){
      if (result instanceof SureliaError) {
        return job.workComplete(JSON.stringify({result: false, error: result}));
      }
      console.log(result);
      job.workComplete(JSON.stringify({result: result}));
    });
  } catch (e) {
    console.log("x");
    job.workComplete(JSON.stringify({result: false, error: e}));
  }
});
