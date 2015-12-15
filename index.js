/**
 * sails-hook-meta
 *
 */

module.exports = hook;


var path = require("path");
var handler = require(path.join(__dirname, "lib", "handler"));

//==============================================================================

function hook(sails) {
  return {
    routes: {
      before: {
        "all /*": handler
      }
    }
  };
}

//==============================================================================
