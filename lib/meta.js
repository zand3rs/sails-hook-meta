/**
 * Meta
 *
 */

module.exports = Meta;


var _ = require("lodash");

//==============================================================================
//-- constructor

function Meta() {
  var self = this;

  var _meta = {};
  Object.defineProperty(self, "_meta", {
    value: _meta
  });
}

//------------------------------------------------------------------------------

Meta.prototype.set = function(attr, attrs) {
  var self = this;

  var key = toKeyString(attr);
  if (!key) {
    return false;
  }

  var val = [];
  if (_.isArray(attrs)) {
    _.forEach(attrs, function(item) {
      if (_.isPlainObject(item)) {
        val.push(_.defaults(_.clone(attr, true), item));
      }
    });
  } else {
    val.push(_.defaults(_.clone(attr, true), attrs));
  }

  self._meta[key] = val;
  return true;
};

//------------------------------------------------------------------------------

Meta.prototype.add = function(attr) {
  var self = this;
  var args = Array.prototype.slice.call(arguments);

  var key = toKeyString(attr);
  if (!key) {
    return false;
  }

  var attrs = _.defaults.apply(_, args);
  var val = self._meta[key] || [];
  val.push(attrs);

  self._meta[key] = val;
  return true;
};

//------------------------------------------------------------------------------

Meta.prototype.del = function(attr) {
  var self = this;
  var args = Array.prototype.slice.call(arguments);

  var key = toKeyString(attr);
  if (!key) {
    return false;
  }

  delete self._meta[key];
  return true;
};

//------------------------------------------------------------------------------

Meta.prototype.toString = function() {
  var self = this;

  var res = _.map(self._meta, function(entry) {
    var meta = _.map(entry, function(item) {
      return toMetaString(item);
    });
    return _.compact(meta).join("\n");
  });

  return _.compact(res).join("\n");
};

//==============================================================================
//-- helpers

function toKeyString(obj) {
  if (!_.isPlainObject(obj) || _.size(obj) !== 1) {
    return "";
  }

  var res = _.flatten(_.pairs(obj)).join("-");
  return res.replace(/[^0-9A-Za-z\-_]+/g, "");
}

//------------------------------------------------------------------------------

function toMetaString(obj) {
  var attrs = _.map(obj, function(_v, _k) {
    return _k + '="' + _.escape(_v) + '"';
  });

  var res = _.compact(attrs).join(" ");
  return res ? "<meta " + res + ">" : "";
}

//==============================================================================
