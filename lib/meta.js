/**
 * Meta
 *
 */

module.exports = Meta;


var _ = require("lodash");

var primaryKeys = [ "name", "property", "http-equiv", "charset" ];

//==============================================================================
//-- constructor

function Meta() {
  var self = this;

  var _meta = [];
  Object.defineProperty(self, "_meta", {
    get: function() {
      return _meta;
    },
    set: function(value) {
      if (_.isArray(value)) {
        _meta = value;
      }
    }
  });
}

//------------------------------------------------------------------------------

Meta.prototype.set = function(attrs) {
  var self = this;

  if (_.isArray(attrs)) {
    _.forEach(attrs, function(item) {
      self.set(item);
    });
    return true;
  }

  if (!_.isObject(attrs) || _.isEmpty(attrs)) {
    return false;
  }

  var _attrs = toLowerKeys(attrs);

  var key = self._getPrimaryKey(_attrs);
  if (!key) {
    return false;
  }

  var idx = self._getIndex(key);
  self._meta[idx] = _attrs;

  return true;
};

//------------------------------------------------------------------------------

Meta.prototype.add = function(attrs) {
  var self = this;

  if (_.isArray(attrs)) {
    _.forEach(attrs, function(item) {
      self.add(item);
    });
    return true;
  }

  if (!_.isObject(attrs) || _.isEmpty(attrs)) {
    return false;
  }

  self._meta.push(toLowerKeys(attrs));

  return true;
};

//------------------------------------------------------------------------------

Meta.prototype.remove = function(attrs) {
  var self = this;

  if (!_.isObject(attrs) || _.isEmpty(attrs)) {
    return false;
  }

  var _attrs = toLowerKeys(attrs);

  var oldMeta = self._meta;
  var newMeta = _.reject(oldMeta, _attrs);
  var modified = (_.size(oldMeta) !== _.size(newMeta));

  if (modified) {
    self._meta = newMeta;
  }

  return modified;
};

//------------------------------------------------------------------------------

Meta.prototype.clear = function() {
  var self = this;

  if (_.size(self._meta)) {
    self._meta = [];
  }

  return true;
};

//------------------------------------------------------------------------------

Meta.prototype.toString = function() {
  var self = this;

  return _.compact(_.map(self._meta, toMetaString)).join("\n");
};

//------------------------------------------------------------------------------

Meta.prototype.toJSON = function() {
  var self = this;

  return _.compact(self._meta);
};

//==============================================================================
//-- private

Meta.prototype._getPrimaryKey = function(attrs) {
  var self = this;

  if (!_.isObject(attrs)) {
    return null;
  }

  var keys = _.keys(attrs);
  var key = _.first(_.intersection(primaryKeys, keys));

  var primaryKey = null;
  if (key) {
    primaryKey = {};
    primaryKey[key] = attrs[key];
  }

  return primaryKey;
};

//------------------------------------------------------------------------------

Meta.prototype._getIndex = function(attrs) {
  var self = this;

  var idx = _.findIndex(self._meta, attrs);
  if (idx < 0) {
    idx = _.size(self._meta);
  }

  return idx;
};

//==============================================================================
//-- helpers

function toMetaString(obj) {
  var attrs = _.map(obj, function(_v, _k) {
    return _k + '="' + _.escape(_v) + '"';
  });

  var res = _.compact(attrs).join(" ");
  return res ? "<meta " + res + ">" : "";
}

//------------------------------------------------------------------------------

function toLowerKeys(obj) {
  return _.mapKeys(obj, function(val, key) {
    return key.toLowerCase();
  });
}

//==============================================================================
