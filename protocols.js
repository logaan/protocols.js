var _ = require("./underscore.js");

exports.getType = function(value) {
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

exports.create = function() {
  var implementations = {};

  var protocol = _.reduce(arguments, function(methods, functionName) {
    methods[functionName] = function() {
      var type = exports.getType(_.first(arguments));
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

exports.implement = function(protocol, type, methods) {
  protocol["__implementations__"][type] = methods;
  return protocol;
};

