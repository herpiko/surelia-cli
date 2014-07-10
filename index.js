#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var admin = require("./admin");
var user = require("./user");

if (argv._[0] == "admin") {
  admin.handle(argv._.splice(1));
} else if (argv._[0] == "user") {
  user.handle(argv._.splice(1));
} else {
  console.log(process.argv[1] + " command");
}
