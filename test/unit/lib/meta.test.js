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
      expect(meta.set({})).to.be.false;
      expect(meta.set(new Object())).to.be.false;
      expect(meta.set(new Function())).to.be.false;
    });

    describe("with only one argument given", function() {
      it("should only accept single key-value pair object parameter", function() {
        expect(meta.set({ key1: "val1", key2: "val2" })).to.be.false;

        expect(meta.set({ key: "val" })).to.be.true;
        expect(meta._meta).to.have.property("key-val")
                          .that.eql([{ key: "val" }]);
      });
    });

    describe("with two arguments given", function() {
      it("should accept object as second parameter", function() {
        expect(meta.set({ key1: "val1" }, { key2: "val2", key3: "val3" })).to.be.true;
        expect(meta._meta).to.have.property("key1-val1")
                          .that.eql([{ key1: "val1", key2: "val2", key3: "val3" }]);
      });

      it("should accept array as second parameter", function() {
        expect(meta.set({ key1: "val1" }, [{ key2: "val2" }, { key3: "val3" }])).to.be.true;
        expect(meta._meta).to.have.property("key1-val1")
                          .that.eql([{ key1: "val1", key2: "val2" }, { key1: "val1", key3: "val3" }]);
      });
    });

    describe("with special characters", function() {
      it("should support attribute keys with dash", function() {
        expect(meta.set({ "key-1-2-3": "val-4-5-6" })).to.be.true;
        expect(meta._meta).to.have.property("key-1-2-3-val-4-5-6")
                          .that.eql([{ "key-1-2-3": "val-4-5-6" }]);
      });

      it("should remove invalid characters from the key", function() {
        expect(meta.set({ "key-1-2-3": "val=4;5.6" })).to.be.true;
        expect(meta._meta).to.have.property("key-1-2-3-val456")
                          .that.eql([{ "key-1-2-3": "val=4;5.6" }]);
      });
    });
  });

  describe("#add()", function() {
    it("should return false", function() {
      expect(meta).itself.to.respondTo("add");
      expect(meta.add()).to.be.false;
      expect(meta.add({})).to.be.false;
      expect(meta.add(new Object())).to.be.false;
      expect(meta.add(new Function())).to.be.false;
      expect(meta.add({ key1: "val1", key2: "val2" })).to.be.false;
    });

    it("should be successful", function() {
      expect(meta.add({ key: "val" })).to.be.true;
      expect(meta._meta).to.have.property("key-val")
                        .that.eql([{ key: "val" }]);

      expect(meta.add({ key: "val" })).to.be.true;
      expect(meta._meta).to.have.property("key-val")
                        .that.eql([{ key: "val" }, { key: "val" }]);

      expect(meta.add({ key: "val" }, { key1: "val1" })).to.be.true;
      expect(meta._meta).to.have.property("key-val")
                        .that.eql([{ key: "val" }, { key: "val" }, { key: "val", key1: "val1" }]);
    });
  });

  describe("#del()", function() {
    it("should return false", function() {
      expect(meta).itself.to.respondTo("del");
      expect(meta.del()).to.be.false;
      expect(meta.del({})).to.be.false;
      expect(meta.del(new Object())).to.be.false;
      expect(meta.del(new Function())).to.be.false;
      expect(meta.del({ key1: "val1", key2: "val2" })).to.be.false;
    });

    it("should be successful", function() {
      expect(meta.set({ key: "val" })).to.be.true;
      expect(meta._meta).to.have.property("key-val")
                        .that.eql([{ key: "val" }]);

      expect(meta.del({ key: "val" })).to.be.true;
      expect(meta._meta).to.not.have.property("key-val");
    });
  });

  describe("#toString()", function() {
    it("should return empty string", function() {
      expect(meta.toString()).to.equal("");
    });

    it("should return the meta markup string", function() {
      expect(meta.set({ name: "name1" }, { content: "content1" })).to.be.true;
      expect(meta.toString()).to.equal('<meta name="name1" content="content1">');

      expect(meta.set({ "http-equiv": "Content-Type" }, { content: "text/html; charset=utf-8" })).to.be.true;
      expect(meta.toString()).to.equal('<meta name="name1" content="content1">\n<meta http-equiv="Content-Type" content="text/html; charset=utf-8">');
    });

    it("should escape html chars", function() {
      expect(meta.set({ key: "a-\"-'-<->-&-`-z" })).to.be.true;
      expect(meta.toString()).to.equal('<meta key="a-&quot;-&#39;-&lt;-&gt;-&amp;-&#96;-z">');
    });
  });

});
