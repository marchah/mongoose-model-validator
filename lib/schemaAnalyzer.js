'use strict';

const _ = require('lodash');

const helpers = require('./helpers');
const constants = require('./constants');

/*
Check to put required function instead of `true`
 */
function requiredFieldAnalyzer(fieldSchema, path, analyzed) {
  if (_.indexOf(analyzed.required.ALL, path) !== -1) return;

  if (fieldSchema.constructor.name === 'Object' && !_.isUndefined(fieldSchema.required)
    && (fieldSchema.required === true || _.isFunction(fieldSchema.required))) {
    analyzed.schema[path].required = fieldSchema.required;
    analyzed.required.ALL.push(path);
    
  }
  else if (!_.isUndefined(fieldSchema.options) && !_.isUndefined(fieldSchema.options.required)
    && (fieldSchema.options.required === true || _.isFunction(fieldSchema.options.required))) {
    analyzed.schema[path].required = fieldSchema.options.required;
    analyzed.required.ALL.push(path);
  }
}

function defaultFieldAnalyzer(fieldSchema, path, analyzed) {
  if (_.last(path.split('.')) === '_id' || _.indexOf(analyzed.default.ALL, path) !== -1) return;

  if (fieldSchema.constructor.name === 'Object' && !_.isUndefined(fieldSchema.default)) {
    analyzed.schema[path].default = fieldSchema.default;
    analyzed.default.ALL.push(path);
  }
  else if (!_.isUndefined(fieldSchema.options) && !_.isUndefined(fieldSchema.options.default)) {
    analyzed.schema[path].default = fieldSchema.options.default;
    analyzed.default.ALL.push(path);
  }
}

function uniqueFieldAnalyzer(fieldSchema, path, analyzed) {
  if (_.indexOf(analyzed.unique.ALL, path) !== -1) return;

  if (fieldSchema.constructor.name === 'Object' && !_.isUndefined(fieldSchema.unique) && 
    (fieldSchema.unique === true || _.isFunction(fieldSchema.unique))) {
    analyzed.schema[path].unique = fieldSchema.unique;
    analyzed.unique.ALL.push(path);
  }
  else if (!_.isUndefined(fieldSchema.options) && !_.isUndefined(fieldSchema.options.unique) && 
    (fieldSchema.options.unique === true || _.isFunction(fieldSchema.options.unique))) {
    analyzed.schema[path].unique = fieldSchema.options.unique;
    analyzed.unique.ALL.push(path);
  }
}

function enumFieldAnalyzer(fieldSchema, path, analyzed) {
  if (_.indexOf(analyzed.enum.ALL, path) !== -1) return;

  if (fieldSchema.constructor.name === 'Object' && !_.isUndefined(fieldSchema.enum)) {
    analyzed.schema[path].enum = fieldSchema.enum;
    analyzed.enum.ALL.push(path);
  }
  else if (!_.isUndefined(fieldSchema.options) && !_.isUndefined(fieldSchema.options.enum)) {
    analyzed.schema[path].enum = fieldSchema.options.enum;
    analyzed.enum.ALL.push(path);
  }
}

function minNumberFieldAnalyzer(fieldSchema, path, analyzed) {
  if (_.indexOf(analyzed.min.ALL, path) !== -1) return;

  if (fieldSchema.constructor.name === 'Object' && !_.isUndefined(fieldSchema.min)) {
    analyzed.schema[path].min = fieldSchema.min;
    analyzed.min.ALL.push(path);
  }
  else if (!_.isUndefined(fieldSchema.options) && !_.isUndefined(fieldSchema.options.min)) {
    analyzed.schema[path].min = fieldSchema.options.min;
    analyzed.min.ALL.push(path);
  }
}

function maxNumberFieldAnalyzer(fieldSchema, path, analyzed) {
  if (_.indexOf(analyzed.max.ALL, path) !== -1) return;

  if (fieldSchema.constructor.name === 'Object' && !_.isUndefined(fieldSchema.max)) {
    analyzed.schema[path].max = fieldSchema.max;
    analyzed.max.ALL.push(path);
  }
  else if (!_.isUndefined(fieldSchema.options) && !_.isUndefined(fieldSchema.options.max)) {
    analyzed.schema[path].max = fieldSchema.options.max;
    analyzed.max.ALL.push(path);
  }
}

function minLengthFieldAnalyzer(fieldSchema, path, analyzed) {
  if (_.indexOf(analyzed.minlength.ALL, path) !== -1) return;

  if (fieldSchema.constructor.name === 'Object' && !_.isUndefined(fieldSchema.minlength)) {
    analyzed.schema[path].minlength = fieldSchema.minlength;
    analyzed.minlength.ALL.push(path);
  }
  else if (!_.isUndefined(fieldSchema.options) && !_.isUndefined(fieldSchema.options.minlength)) {
    analyzed.schema[path].minlength = fieldSchema.options.minlength;
    analyzed.minlength.ALL.push(path);
  }
}

function maxLengthFieldAnalyzer(fieldSchema, path, analyzed) {
  if (_.indexOf(analyzed.maxlength.ALL, path) !== -1) return;

  if (fieldSchema.constructor.name === 'Object' && !_.isUndefined(fieldSchema.maxlength)) {
    analyzed.schema[path].maxlength = fieldSchema.maxlength;
    analyzed.maxlength.ALL.push(path);
  }
  else if (!_.isUndefined(fieldSchema.options) && !_.isUndefined(fieldSchema.options.maxlength)) {
    analyzed.schema[path].maxlength = fieldSchema.options.maxlength;
    analyzed.maxlength.ALL.push(path);
  }
}

function fieldSchemaAnalyzer(fieldSchema, path, analyzed) {
  if (_.isUndefined(analyzed.schema[path])) analyzed.schema[path] = {};

  requiredFieldAnalyzer(fieldSchema, path, analyzed);
  defaultFieldAnalyzer(fieldSchema, path, analyzed);
  uniqueFieldAnalyzer(fieldSchema, path, analyzed);
  enumFieldAnalyzer(fieldSchema, path, analyzed);
  minNumberFieldAnalyzer(fieldSchema, path, analyzed);
  maxNumberFieldAnalyzer(fieldSchema, path, analyzed);
  minLengthFieldAnalyzer(fieldSchema, path, analyzed);
  maxLengthFieldAnalyzer(fieldSchema, path, analyzed);

  if (fieldSchema.instance === 'Mixed' && !_.isUndefined(fieldSchema.options) && !_.isUndefined(fieldSchema.options.type)) {
    const keys = _.keys(fieldSchema.options.type);
    keys.forEach((key) => {
      if (_.indexOf(constants.IGNORED_FIELD.ALL, key) === -1) {
        fieldSchemaAnalyzer(fieldSchema.options.type[key], path + '.' + key, analyzed);
      }
    });
  }
  else if (fieldSchema.instance === 'Array') {
    const nestedFieldsSchema = helpers.getSchema(fieldSchema);
    if (nestedFieldsSchema) {
      const keys = _.keys(nestedFieldsSchema);
      keys.forEach((key) => {
        if (_.indexOf(constants.IGNORED_FIELD.ALL, key) === -1) {
          fieldSchemaAnalyzer(nestedFieldsSchema[key], path + '.' + key, analyzed);
        }
      });
    }
    else if (!_.isUndefined(fieldSchema.caster)) {
      fieldSchemaAnalyzer(fieldSchema.caster, path, analyzed);
    }
    else {
      console.log(fieldSchema);
      throw new Error('Unsupported operation')
    }
  }
}

function schemaAnalyzer(Model) {
  const analyzed = {
    schema: {},
    required: {
      ALL: [],
    },
    default: {
      ALL: [],
    },
    unique: {
      ALL: [],
    },
    enum: {
      ALL: [],
    },
    min: {
      ALL: [],
    },
    max: {
      ALL: [],
    },
    minlength: {
      ALL: [],
    },
    maxlength: {
      ALL: [],
    },
  };

  const schema = helpers.getSchema(Model);
  const keys = _.keys(schema);
  keys.forEach((key) => {
    if (_.indexOf(constants.IGNORED_FIELD.ALL, key) === -1) {
      fieldSchemaAnalyzer(schema[key], key, analyzed);
    }
  });
  return analyzed;
}

module.exports = schemaAnalyzer;