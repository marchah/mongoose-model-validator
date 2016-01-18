'use strict';

const _ = require('lodash');
const expect = require('chai').expect;

const constants = require('./constants.js');
const plugin = require('./plugin');
const schemaValidator = require('./schemaValidator');
const helpers = require('./helpers');

/**
* modelName
*/
function validateModelName(Model, toValidate) {
  if (toValidate && toValidate.modelName) {
    it('should have `' + toValidate.modelName + '` for modelName', () => {
      expect(Model.modelName).to.exist
        .that.is.a('string')
        .and.eql(toValidate.modelName);
    });
  }
  else {
    it('should validate modelName');
  }
}

/**
 * Plugins
 */
function validatePlugins(Model, toValidate) {
  describe('Plugin #', () => {
    if (toValidate && toValidate.plugins) {
      if (!_.isArray(toValidate.plugins)) {
        it('should validate Plugins', (done) => {
          done('Plugins should be an array');
        });
      }
      else {
        for (let i = 0; i !== toValidate.plugins.length; i++) {
          switch (toValidate.plugins[i].toLowerCase()) {
          case constants.PLUGIN.ELASTIC:
            it('should have elastic', () => {
              expect(plugin.hasElastic(Model)).to.be.true;
            });
            break;
          case constants.PLUGIN.CREATOR:
            it('should have creator', () => {
              expect(plugin.hasCreator(Model)).to.be.true;
            });
            break;
          case constants.PLUGIN.FILE:
            it('should have file');
            break;
          case constants.PLUGIN.TIMESTAMP:
            it('should have timestamp', () => {
              expect(plugin.hasTimestamp(Model)).to.be.true;
            });
            break;
          case constants.PLUGIN.UNIQUE:
            it('should have unique');
            break;
          case constants.PLUGIN.VERSION:
            it('should have version', () => {
              expect(plugin.hasVersion(Model)).to.be.true;
            });
          break;
          case constants.PLUGIN.INCREMENT:
            it('should have increment', () => {
              expect(plugin.hasIncrement(Model)).to.be.true;
            });
          break;
          case constants.PLUGIN.DATA:
            it('should have data', () => {
              expect(plugin.hasData(Model)).to.be.true;
            });
          break;
          default:
            it('should have ' + toValidate.plugins[i], (done) => {
              done('Unsopported plugin `' + toValidate.plugins[i] + '`');
            });
          }
        }
      }
    }
    else {
      it('should validate Plugins');
    }
  });
}

function validateSchema(Model, toValidate, analyzed) {
  describe('Schema ->', () => {
    if (toValidate && toValidate.schema) {
      const schemaValidatorKeys = _.keys(toValidate.schema);
      const unknownKeys = _.difference(schemaValidatorKeys, constants.SCHEMA_VALIDATOR.ALL);
      for (let i = 0; i !== unknownKeys.length; i++) {
        it('unknow schema validator `' + unknownKeys[i] + '`', (done) => {
          done('unknow schema validator `' + unknownKeys[i] + '`');
        });
      }

      schemaValidator.required(Model, toValidate, analyzed);
      schemaValidator.unique(Model, toValidate, analyzed);
      schemaValidator.default(Model, toValidate, analyzed);
      schemaValidator.enum(Model, toValidate, analyzed);
      schemaValidator.min(Model, toValidate, analyzed);
      schemaValidator.max(Model, toValidate, analyzed);
      schemaValidator.minlength(Model, toValidate, analyzed);
      schemaValidator.maxlength(Model, toValidate, analyzed);
      schemaValidator.custom(Model, toValidate, analyzed);
    }
    else {
      it('should validate model schema');
    }
  });
}

function validateVirtualFields(Model, toValidate, VirtualFields) {
  describe('Virtual Fields ->', () => {
    const keys = _.keys(toValidate.virtualFields);
    const virtualFieldKeys = _.difference(_.keys(VirtualFields), constants.IGNORED_VIRTUAL_FIELD.ALL);
    const unchecked = _.difference(virtualFieldKeys, keys);
    if (keys && _.isPlainObject(toValidate.virtualFields)) {
      for (let i = 0; i !== keys.length; i++) {
        it('should validate virtual field `' + keys[i] + '`', (done) => {
          if (_.isUndefined(VirtualFields[keys[i]])) {
            done('doesn\'t have virtual field');
          }
          else if (!_.isFunction(toValidate.virtualFields[keys[i]])) {
            done('Only functions are supported');
          }
          else {
            expect(VirtualFields[keys[i]]).to.exist;
            expect(VirtualFields[keys[i]].path).to.exist
              .and.eql(keys[i]);

            helpers.callback(toValidate.virtualFields[keys[i]], done);
          }
        });
      }
    }
    else if (toValidate.virtualFields) {
      it('virtualFields should be an object', (done) => {
        done('virtualFields should be an object');
      });
    }
    for (let i = 0; i !== unchecked.length; i++) {
      it('missing validation for `' + unchecked[i] + '`');
    }
  });
}

function validateMethods(Model, toValidate, Methods, pluginsFunctions) {
  describe('Methods ->', () => {
    const keys = _.keys(toValidate.methods);
    const methodsKeys = _.difference(_.keys(Methods), pluginsFunctions.methods);
    const unchecked = _.difference(methodsKeys, keys);
    if (keys && _.isPlainObject(toValidate.methods)) {
      for (let i = 0; i !== keys.length; i++) {
        it('should validate method `' + keys[i] + '`', (done) => {
          if (_.isUndefined(Methods[keys[i]])) {
            done('doesn\'t have method');
          }
          else if (!_.isFunction(toValidate.methods[keys[i]])) {
            done('Only functions are supported');
          }
          else {
            helpers.callback(toValidate.methods[keys[i]], done);
          }
        });
      }
    }
    else if (toValidate.methods) {
      it('methods should be an object', (done) => {
        done('methods should be an object');
      });
    }
    for (let i = 0; i !== unchecked.length; i++) {
      it('missing validation for `' + unchecked[i] + '`');
    }
  });
}

function validateStatics(Model, toValidate, Statics, pluginsFunctions) {
  describe('Statics ->', () => {
    const keys = _.keys(toValidate.statics);
    const staticsKeys = _.difference(_.keys(Statics), pluginsFunctions.statics);
    const unchecked = _.difference(staticsKeys, keys);
    if (keys && _.isPlainObject(toValidate.statics)) {
      for (let i = 0; i !== keys.length; i++) {
        it('should validate static `' + keys[i] + '`', (done) => {
          if (_.isUndefined(Statics[keys[i]])) {
            done('doesn\'t have static');
          }
          else if (_.isFunction(toValidate.statics[keys[i]])) {
            helpers.callback(toValidate.statics[keys[i]], done);
          }
          else if (_.isFunction(Statics[keys[i]])) {
            if (!_.isFunction(toValidate.statics[keys[i]])) return done('`' + keys[i] + '` should be a function');

            helpers.callback(toValidate.statics[keys[i]], done);
          }
          else {
            expect(Statics[keys[i]]).to.eql(toValidate.statics[keys[i]]);
            done();
          }
        });
      }
    }
    else if (toValidate.statics) {
      it('statics should be an object', (done) => {
        done('statics should be an object');
      });
    }
    for (let i = 0; i !== unchecked.length; i++) {
      it('missing validation for `' + unchecked[i] + '`');
    }
  });
}

function validateEvents(Model, toValidate) {
  describe('Events ->', () => {
    const keys = _.keys(toValidate.events);
    if (keys && _.isPlainObject(toValidate.events)) {
      for (let i = 0; i !== keys.length; i++) {
        if (toValidate.events[keys[i]] === null) {
          it('should validate event `' + keys[i] + '`');
        }
        else {
          it('should validate event `' + keys[i] + '`', (done) => {
            if (!_.isFunction(toValidate.events[keys[i]])) return done('`' + keys[i] + '` should be a function');

            helpers.callback(toValidate.events[keys[i]], done);
          });
        }
      }
    }
    else if (toValidate.events) {
      it('events should be an object', (done) => {
        done('events should be an object');
      });
    }
  });
}


module.exports = {
  'modelName': validateModelName,
  'plugins': validatePlugins,
  'schema': validateSchema,
  'virtualFields': validateVirtualFields,
  'methods': validateMethods,
  'statics': validateStatics,
  'events': validateEvents,
};