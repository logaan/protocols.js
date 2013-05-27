var _ = require("./underscore.js");

function getType(value) {
  var val = _(value);

  if (val.isNull()) {
    return "null";
  } else if(val.isUndefined()) {
    return "undefined";
  } else if (val.isNaN()) {
    return "nan";
  } else if (val.isNumber()) {
    return "number";
  } else if (val.isBoolean()) {
    return "boolean";
  } else if (val.isDate()) {
    return "date";
  } else if (val.isString()) {
    return "string";
  } else if (val.isRegExp()) {
    return "regexp";
  } else if (val.isArray()) {
    return "array";
  } else if (val.isFunction()) {
    return "function";
  } else if (val.isObject()) {
    return "object";
  } else {
    throw "Unknown type";
  }
}

function testType(value, expected) {
  var type = getType(value);

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

