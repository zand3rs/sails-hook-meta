var cwd = process.cwd();
var path = require("path");

global.Meta = require(path.join(cwd, "lib", "meta"));
global.handler = require(path.join(cwd, "lib", "handler"));
