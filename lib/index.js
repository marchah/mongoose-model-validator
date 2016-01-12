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
    
    const analyzed = schemaAnalyzer(Model);
    const Schema = helpers.getSchema(Model);
    const VirtualFields = helpers.getVirtualFields(Model);
    const Methods = helpers.getMethods(Model);
    const Statics = helpers.getStatics(Model);
    const pluginsFunctions = helpers.getPluginsFunctions(plugin, options);

    

    describe('Model Validator ->', () => {
      validator.modelName(Model, options);
      validator.plugins(Model, options);
      
      /**
       * Model Schema Validations
       */
      validator.schema(Model, options, analyzed);

      /**
       * Model Virtual Fields Validations
       */
      validator.virtualFields(Model, options, VirtualFields);

      /**
       * Model Methods Validations
       */
      validator.methods(Model, options, Methods, pluginsFunctions);
      /**
       * Model Statics Validations
       */
      validator.statics(Model, options, Statics, pluginsFunctions);
    });
  };
}

module.exports = test;
