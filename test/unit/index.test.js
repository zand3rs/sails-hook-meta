require("node-test-helper");

var Sails = require("sails");
var meta = require(process.cwd());

describe(TEST_NAME, function() {

  before(function(done) {
    Sails.lift({
      hooks: { meta: meta, grunt: false },
      log:   { level: "error" }
    }, function(err, sails) {
      done(err);
    });
  });

  after(function(done) {
    Sails.lower(done);
  });

  it("should be successful", function() {
    expect(sails).to.exist;
  });

});
