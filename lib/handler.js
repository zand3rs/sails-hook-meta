/**
 * handler
 *
 */

module.exports = handler;


var path = require("path");
var Meta = require(path.join(__dirname, "meta"));

//==============================================================================

function handler(req, res, next) {
  //-- set meta
  req.meta = new Meta();

  return next();
}

//==============================================================================
