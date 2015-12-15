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
    it("should return false", function() {
      expect(meta).itself.to.respondTo("set");
      expect(meta.set()).to.be.false;
      expect(meta.set({})).to.be.false;
      expect(meta.set(new Object())).to.be.false;
      expect(meta.set(new Function())).to.be.false;
      expect(meta.set({ key1: "val1", key2: "val2" })).to.be.false;
    });

    it("should return true", function() {
      expect(meta.set({ key: "val" })).to.be.true;
      expect(meta._meta).to.have.property("key=:=val")
                        .that.eql([{ key: "val" }]);

      expect(meta.set({ key: "val1" })).to.be.true;
      expect(meta._meta).to.have.property("key=:=val1")
                        .that.eql([{ key: "val1" }]);

      expect(meta.set({ key1: "val1" }, { key2: "val2" }, { key1: "val3" })).to.be.true;
      expect(meta._meta).to.have.property("key1=:=val1")
                        .that.eql([{ key1: "val1", key2: "val2" }]);

      expect(meta.set({ key1: "val1" }, { key2: "val2", key3: "val3" })).to.be.true;
      expect(meta._meta).to.have.property("key1=:=val1")
                        .that.eql([{ key1: "val1", key2: "val2", key3: "val3" }]);
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
      expect(meta._meta).to.have.property("key=:=val")
                        .that.eql([{ key: "val" }]);

      expect(meta.add({ key: "val" })).to.be.true;
      expect(meta._meta).to.have.property("key=:=val")
                        .that.eql([{ key: "val" }, { key: "val" }]);

      expect(meta.add({ key: "val" }, { key1: "val1" })).to.be.true;
      expect(meta._meta).to.have.property("key=:=val")
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
      expect(meta._meta).to.have.property("key=:=val")
                        .that.eql([{ key: "val" }]);

      expect(meta.del({ key: "val" })).to.be.true;
      expect(meta._meta).to.not.have.property("key=:=val");
    });
  });

  describe("#toString()", function() {
    it("returns the meta markup string", function() {
      expect(meta.set({ name: "name1" }, { content: "content1" })).to.be.true;
      expect(meta.toString()).to.equal('<meta name="name1" content="content1">');

      expect(meta.set({ name: "name2" }, { content: "content2" })).to.be.true;
      expect(meta.toString()).to.equal('<meta name="name1" content="content1">\n<meta name="name2" content="content2">');
    });
  });

});
