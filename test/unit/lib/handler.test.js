require("node-test-helper");

describe(TEST_NAME, function() {
  var req, res, next;

  beforeEach(function() {
    req = { headers: {} }; res = {}; next = sinon.spy();
  });

  it("should set meta property", function() {
    handler(req, res, next);
    expect(req).to.have.property("meta")
               .that.is.an.instanceof(Meta);
  });

  it("should execute the callback argument", function() {
    handler(req, res, next);
    expect(next.called).to.be.true;
  });

});
