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

### set(attrs)

Returns true if meta attributes are successfully set. Returns false otherwise. The parameter **attrs** could be an Object or array of Objects. This function tries to keep the meta items unique by looking at primary attributes. Currently, it only checks for **name**, **property**, **http-equiv** and **charset** values for uniqueness. 

```javascript
req.meta.set({ charset: "utf-8" });
req.meta.set({ name: "Author", lang: "fr", content: "Arnaud Le Hors" });
req.meta.set({ "http-equiv": "Content-Type", content: "text/html; charset=utf-8" });

req.meta.set([
  { property: "og:image", content: "http://example.com/rock.jpg" },
  { property: "og:image:width", content: "400" },
  { property: "og:image:height", content: "300" }
]);
```

### add(attrs)

Similar to **set()** except that this function doesn't check for uniqueness.

```javascript
req.meta.add({ charset: "utf-8" });
req.meta.add({ name: "Author", lang: "fr", content: "Arnaud Le Hors" });
req.meta.add({ "http-equiv": "Content-Type", content: "text/html; charset=utf-8" });

req.meta.add([
  { property: "og:image", content: "http://example.com/rock.jpg" },
  { property: "og:image:width", content: "400" },
  { property: "og:image:height", content: "300" },
  { property: "og:image", content: "http://example.com/rock2.jpg" },
  { property: "og:image:width", content: "800" },
  { property: "og:image:height", content: "600" }
]);
```

### remove(attrs)

Returns true if meta item/s is successfully removed. Returns false otherwise.

```javascript
req.meta.remove({ charset: "utf-8" });
req.meta.remove({ "http-equiv": "Content-Type" });
```

### clear()

Deletes all meta items.

```javascript
req.meta.clear();
```

### toString()

Returns the meta markup string.

```javascript
// req.meta.set({ charset: "utf-8" });
// req.meta.set({ "http-equiv": "refresh", content: "30" });

req.meta.toString();

// <meta charset="utf-8">
// <meta http-equiv="refresh" content: "30">
```

### toJSON()

Returns the array of meta objects.

```javascript
// req.meta.set({ charset: "utf-8" });
// req.meta.set({ "http-equiv": "refresh", content: "30" });

req.meta.toJSON();

// [ { charset: "utf-8" }, { "http-equiv": "refresh", content: "30" } ]
```
