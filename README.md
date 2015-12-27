# sails-hook-meta

Sails extension for generating meta header.

## Installation

```sh
$ npm install sails-hook-meta
```

## Usage

Upon installation, a **_meta_** object will be added to **_req_**.

```javascript
//-- api/controllers/HomeController.js
module.exports = {
  index: function(req, res) {
    req.meta.set({ name: "title" }, { content: "Page Title" });
    res.view();
  }
};

//-- views/home/index.ejs
<html>
  <head>
    <%- req.meta.toString() %>
  </head>
</html>

//-- output
<html>
  <head>
    <meta name="title" content="Page Title">
  </head>
</html>
```

## Methods

### set(attr, attrs)

Returns true if meta attributes are successfully set. Returns false otherwise. The first argument **attr** only accepts a single key-value pair object to ensure uniqueness of the meta items.
The rest of the attributes must be in the second argument **attrs**. Array of meta is also supported by simply passing an array of objects as the second parameter.

```javascript
req.meta.set({ charset: "utf-8" });
req.meta.set({ name: "Author" }, { lang: "fr", content: "Arnaud Le Hors" });
req.meta.set({ "http-equiv": "Content-Type" }, { content: "text/html; charset=utf-8" });
```

### remove(attr)

Returns true if meta item is successfully removed. Returns false otherwise.

```javascript
req.meta.remove({ charset: "utf-8" });
req.meta.remove({ "http-equiv": "Content-Type" });
```

### toString()

Returns the meta markup string.

```javascript
// req.meta.set({ charset: "utf-8" });
// req.meta.set({ "http-equiv": "refresh" }, { content: "30" });

req.meta.toString();

// <meta charset="utf-8">
// <meta http-equiv="refresh" content: "30">
```

### toJSON()

Returns the array of meta objects.

```javascript
// req.meta.set({ charset: "utf-8" });
// req.meta.set({ "http-equiv": "refresh" }, { content: "30" });

req.meta.toJSON();

// [ { charset: "utf-8" }, { "http-equiv": "refresh", content: "30" } ]
```
