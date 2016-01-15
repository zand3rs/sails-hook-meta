require("node-test-helper");

describe(TEST_NAME, function() {
  var meta = null;

  beforeEach(function() {
    meta = new Meta();
  });

  describe("constructor", function() {
    it("should be successful", function() {
      expect(meta).to.be.an.instanceof(Meta);
    });
  });

  describe("#set()", function() {
    it("should return false given an invalid argument", function() {
      expect(meta).itself.to.respondTo("set");
      expect(meta.set()).to.be.false;
      expect(meta.set(1)).to.be.false;
      expect(meta.set("")).to.be.false;
      expect(meta.set({})).to.be.false;
      expect(meta.set(new Object())).to.be.false;
      expect(meta.set(new Function())).to.be.false;
    });

    describe("with object argument", function() {
      it("should be successful", function() {
        var entry = { name: "name1", content: "content1" };

        expect(meta._meta).to.not.deep.include(entry);
        expect(meta.set(entry)).to.be.true;
        expect(meta._meta).to.deep.include(entry);
      });

      it("should convert keys to lowercase", function() {
        expect(meta._meta).to.not.deep.include({ name: "name1", content: "content1" });
        expect(meta.set({ NAME: "name1", CONTENT: "content1" })).to.be.true;
        expect(meta._meta).to.deep.include({ name: "name1", content: "content1" });
      });
    });

    describe("with array argument", function() {
      it("should be successful", function() {
        var entries = [
          { name: "name1", content: "content1" },
          { name: "name2", content: "content2" }
        ];

        expect(meta._meta).to.not.deep.include.members(entries);
        expect(meta.set(entries)).to.be.true;
        expect(meta._meta).to.deep.include.members(entries);
      });
    });

    describe("multiple calls with similar attribute keys", function() {
      it("should update existing entry", function() {
        var entry1 = { name: "name1", content: "content1" };
        var entry2 = { name: "name1", content: "content2" };

        expect(meta._meta).to.not.deep.include(entry1);
        expect(meta._meta).to.not.deep.include(entry2);

        expect(meta.set(entry1)).to.be.true;
        expect(meta.set(entry2)).to.be.true;

        expect(meta._meta).to.not.deep.include(entry1);
        expect(meta._meta).to.deep.include(entry2);
      });
    });

    describe("primary keys", function() {
      it("should not allow multiple entries with similar recognized attribute keys", function() {
        var primaryKeys = [ "name", "property", "http-equiv", "charset" ];
        primaryKeys.forEach(function(key) {
          var entry1 = { content: "entry 1" };
          var entry2 = { content: "entry 2" };

          entry1[key] = key;
          entry2[key] = key;

          expect(meta._meta).to.not.deep.include(entry1);
          expect(meta._meta).to.not.deep.include(entry2);

          expect(meta.set(entry1)).to.be.true;
          expect(meta.set(entry2)).to.be.true;

          expect(meta._meta).to.not.deep.include(entry1);
          expect(meta._meta).to.deep.include(entry2);
        });
      });

      it("should not allow entries with unrecognized attribute keys", function() {
        var entry = { something: "something1", content: "something 1" };

        expect(meta.set(entry)).to.be.false;
        expect(meta._meta).to.not.deep.include(entry);
      });
    });
  });

  describe("#add()", function() {
    it("should return false given an invalid argument", function() {
      expect(meta).itself.to.respondTo("add");
      expect(meta.add()).to.be.false;
      expect(meta.add(1)).to.be.false;
      expect(meta.add("")).to.be.false;
      expect(meta.add({})).to.be.false;
      expect(meta.add(new Object())).to.be.false;
      expect(meta.add(new Function())).to.be.false;
    });

    describe("with object argument", function() {
      it("should be successful", function() {
        var entry = { name: "name1", content: "content1" };

        expect(meta._meta).to.not.deep.include(entry);
        expect(meta.add(entry)).to.be.true;
        expect(meta._meta).to.deep.include(entry);
      });

      it("should convert keys to lowercase", function() {
        expect(meta._meta).to.not.deep.include({ name: "name1", content: "content1" });
        expect(meta.add({ NAME: "name1", CONTENT: "content1" })).to.be.true;
        expect(meta._meta).to.deep.include({ name: "name1", content: "content1" });
      });
    });

    describe("with array argument", function() {
      it("should be successful", function() {
        var entries = [
          { name: "name1", content: "content1" },
          { name: "name2", content: "content2" }
        ];

        expect(meta._meta).to.not.deep.include.members(entries);
        expect(meta.add(entries)).to.be.true;
        expect(meta._meta).to.deep.include.members(entries);
      });
    });

    describe("multiple records with similar attribute keys", function() {
      it("should append new entry", function() {
        var entries = [
          { name: "name1", content: "content1" },
          { name: "name1", content: "content2" }
        ];

        expect(meta._meta).to.not.deep.include.members(entries);
        expect(meta.add(entries)).to.be.true;
        expect(meta._meta).to.deep.include.members(entries);
      });
    });
  });

  describe("#remove()", function() {
    it("should return false given an invalid argument", function() {
      expect(meta).itself.to.respondTo("remove");
      expect(meta.remove()).to.be.false;
      expect(meta.remove(1)).to.be.false;
      expect(meta.remove("")).to.be.false;
      expect(meta.remove({})).to.be.false;
      expect(meta.remove(new Object())).to.be.false;
      expect(meta.remove(new Function())).to.be.false;
      expect(meta.remove({ key1: "val1", key2: "val2" })).to.be.false;
    });

    it("should be successful", function() {
      var entry1 = { name: "name1", content: "content1" };
      var entry2 = { name: "name1", content: "content2" };

      expect(meta.add(entry1)).to.be.true;
      expect(meta.add(entry2)).to.be.true;

      expect(meta._meta).to.deep.include(entry1);
      expect(meta._meta).to.deep.include(entry2);

      expect(meta.remove({ name: "name1" })).to.be.true;
      expect(meta._meta).to.not.deep.include(entry1);
      expect(meta._meta).to.not.deep.include(entry2);
    });
  });

  describe("#clear()", function() {
    it("should be successful", function() {
      expect(meta.set({ name: "name1", content: "content1" })).to.be.true;
      expect(meta.set({ name: "name2", content: "content2" })).to.be.true;

      expect(meta._meta).not.to.be.empty;
      expect(meta.clear()).to.be.true;
      expect(meta._meta).to.be.empty;
    });
  });

  describe("#toString()", function() {
    it("should return empty string", function() {
      expect(meta.toString()).to.equal("");
    });

    it("should return the meta markup string", function() {
      expect(meta.set({ name: "name1" , content: "content1" })).to.be.true;
      expect(meta.toString()).to.equal('<meta name="name1" content="content1">');

      expect(meta.set({ "http-equiv": "Content-Type", content: "text/html; charset=utf-8" })).to.be.true;
      expect(meta.toString()).to.equal('<meta name="name1" content="content1">\n<meta http-equiv="Content-Type" content="text/html; charset=utf-8">');
    });

    it("should escape html chars", function() {
      expect(meta.set({ name: "a-\"-'-<->-&-`-z" })).to.be.true;
      expect(meta.toString()).to.equal('<meta name="a-&quot;-&#39;-&lt;-&gt;-&amp;-&#96;-z">');
    });
  });

  describe("#toJSON()", function() {
    it("should be empty", function() {
      expect(meta.toJSON()).to.be.an.empty("array");
    });

    it("should return the meta array", function() {
      var entries = [
        { name: "name1", content: "content1" },
        { property: "property2", content: "content2" }
      ];

      expect(meta._meta).to.not.deep.include.members(entries);
      expect(meta.set(entries)).to.be.true;
      expect(meta._meta).to.deep.include.members(entries);

      var json = meta.toJSON();
      expect(json).to.be.an("array").that.is.not.empty;
      expect(json).to.eql(entries);
    });
  });

});
