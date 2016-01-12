'use strict';

const _ = require('lodash');
const expect = require('chai').expect;

const constants = require('./constants.js');
const plugin = require('./plugin');
const helpers = require('./helpers');
const validator = require('./validator');
const schemaAnalyzer = require('./schemaAnalyzer');

function test(Model, options) {
  return () => {
    const counter = {
      pluginMethods: 0,
      pluginStatics: 0,
    };
    

    const analyzed = schemaAnalyzer(Model);
    const Schema = helpers.getSchema(Model);
    const VirtualFields = helpers.getVirtualFields(Model);
    const Methods = helpers.getMethods(Model);
    const Statics = helpers.getStatics(Model);

    

    describe('Model Validator ->', () => {
      validator.modelName(Model, options);
      validator.plugins(Model, options, counter);
      
      /**
       * Model Schema Validations
       */
      validator.schema(Model, options, analyzed);

      /**
       * Model Virtual Fields Validations
       */
      validator.virtualFields(Model, options, VirtualFields);
    });
  };
}

module.exports = test;
