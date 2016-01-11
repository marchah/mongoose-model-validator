'use strict';

const _ = require('lodash');
const expect = require('chai').expect;

const constants = require('./constants.js');
const plugin = require('./plugin');
const helpers = require('./helpers');
const validator = require('./validator');
const schemaValidator = require('./schemaValidator');
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
       * Model Validations
       */
      describe('Validation ->', () => {
        if (options && options.validation) {
          schemaValidator.required(Model, options, analyzed);
          schemaValidator.unique(Model, options, analyzed);
          schemaValidator.enum(Model, options, analyzed);
          schemaValidator.custom(Model, options, analyzed);
        }
        else {
          it('should validate model validations');
        }
      });
    });
  };
}

module.exports = test;
