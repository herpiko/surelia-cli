#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));
var admin = require("./admin");

if (argv._[0] == "admin") {
  admin.handle(argv._.splice(1));
}
