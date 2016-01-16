'use strict';

const _ = require('lodash');
const expect = require('chai').expect;

const constants = require('./constants.js');
const plugin = require('./plugin');
const helpers = require('./helpers');
const validator = require('./validator');
const schemaAnalyzer = require('./schemaAnalyzer');
const hooks = require('./hooks');

function test(Model, toValidate, options) {
  return () => {
    
    const pluginsFunctions = helpers.getPluginsFunctions(plugin, toValidate);
    const analyzed = schemaAnalyzer(Model, pluginsFunctions.fields);
    const Schema = helpers.getSchema(Model);
    const VirtualFields = helpers.getVirtualFields(Model);
    const Methods = helpers.getMethods(Model);
    const Statics = helpers.getStatics(Model);
    

    

    describe('Model Validator ->', () => {
      const validatorKeys = _.keys(toValidate);
      const unknownKeys = _.difference(validatorKeys, constants.VALIDATOR.ALL);
      for (let i = 0; i !== unknownKeys.length; i++) {
        it('unknow validator `' + unknownKeys[i] + '`', (done) => {
          done('unknow validator `' + unknownKeys[i] + '`');
        });
      }

      hooks.before(options);
      hooks.after(options);
      hooks.beforeEach(options);
      hooks.afterEach(options);

      validator.modelName(Model, toValidate);
      validator.plugins(Model, toValidate);
      
      /**
       * Model Schema Validations
       */
      validator.schema(Model, toValidate, analyzed);

      /**
       * Model Virtual Fields Validations
       */
      validator.virtualFields(Model, toValidate, VirtualFields);

      /**
       * Model Methods Validations
       */
      validator.methods(Model, toValidate, Methods, pluginsFunctions);
      /**
       * Model Statics Validations
       */
      validator.statics(Model, toValidate, Statics, pluginsFunctions);
      /**
       * Model events Validations
       */
      validator.events(Model, toValidate);
    });
  };
}

module.exports = test;
