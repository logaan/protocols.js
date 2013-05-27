var protocols = require("./protocols.js"),
    _         = require("./underscore.js");

// Normal usage of protocols

var renderable = protocols.create("render");

protocols.implement(renderable, "null", {
  "render": function(value) {
    console.log("Nothing to see here");
  }
});

protocols.implement(renderable, "boolean", {
  "render": function(value) {
    console.log("Much wisdom can be found in truth");
  }
});

protocols.implement(renderable, "string", {});

renderable.render(null);
renderable.render(true);
try { renderable.render("foo")     } catch (e) { console.log(e) };
try { renderable.render(undefined) } catch (e) { console.log(e) };

// Low level type checking

function testType(value, expected) {
  var type = protocols.getType(value);

  if(!_.isEqual(type, expected)) {
    console.log("FAIL");
    console.log("Value: <", value, ">");
    console.log("Expected: <", expected, ">");
    console.log("Got: <", type, ">");
    console.log("");
  }
}

testType(null,          "null");
testType(undefined,     "undefined");
testType(NaN,           "nan");
testType(1,             "number");
testType(Infinity,      "number");
testType(true,          "boolean");
testType(false,         "boolean");
testType(new Date(),    "date");
testType("1",           "string");
testType(/1/,           "regexp");
testType([],            "array");
testType({},            "object");
testType(function() {}, "function");



