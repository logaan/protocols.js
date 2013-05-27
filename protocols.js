var _ = require("./underscore.js");

// IMPLEMENTATION

var protocols = {};

protocols.getType = function(value) {
  var val = _(value);

  if      (val.isNull()     ) { return "null"; }
  else if (val.isUndefined()) { return "undefined"; }
  else if (val.isNaN()      ) { return "nan"; } 
  else if (val.isNumber()   ) { return "number"; } 
  else if (val.isBoolean()  ) { return "boolean"; } 
  else if (val.isDate()     ) { return "date"; } 
  else if (val.isString()   ) { return "string"; } 
  else if (val.isRegExp()   ) { return "regexp"; } 
  else if (val.isArray()    ) { return "array"; } 
  else if (val.isFunction() ) { return "function"; } 
  else if (val.isObject()   ) { return "object"; } 
  else { throw "Unknown type"; }
}

protocols.create = function() {
  var implementations = {};

  var protocol = _.reduce(arguments, function(methods, functionName) {
    methods[functionName] = function() {
      var type = protocols.getType(_.first(arguments));
      var functionsForType = implementations[type];

      if(_.isObject(functionsForType)) {
        var appropriateFunction = functionsForType[functionName];

        if(_.isFunction(appropriateFunction)) {
          appropriateFunction.apply({}, arguments);
        } else {
          throw "No implementation of " + functionName + " exists for " + type;
        }
      } else {
        throw "No implementations of any function exist for " + type;
      }
    }

    return methods;
  }, {});

  protocol["__implementations__"] = implementations;

  return protocol;
};

protocols.implement = function(protocol, type, methods) {
  protocol["__implementations__"][type] = methods;
  return protocol;
};

// TESTS

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

