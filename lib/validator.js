'use strict';

const _ = require('lodash');
const expect = require('chai').expect;

const constants = require('./constants.js');
const plugin = require('./plugin');
const schemaValidator = require('./schemaValidator');

/**
* modelName
*/
function validateModelName(Model, options) {
  if (options && options.modelName) {
    it('should have `' + options.modelName + '` for modelName', () => {
      expect(Model.modelName).to.exist
        .that.is.a('string')
        .and.eql(options.modelName);
    });
  }
  else {
    it('should validate modelName');
  }
}

/**
 * Plugins
 */
function validatePlugins(Model, options, counter) {
  describe('Plugin #', () => {
    if (options && options.plugins) {
      if (!_.isArray(options.plugins)) {
        it('should validate Plugins', (done) => {
          done('Plugins should be an array');
        });
      }
      else {
        for (let i = 0; i !== options.plugins.length; i++) {
          switch (options.plugins[i].toLowerCase()) {
          case constants.PLUGIN.ELASTIC:
            it('should have elastic', () => {
              expect(plugin.hasElastic(Model)).to.be.true;
              counter.pluginMethods += plugin.countElasticMethods;
              counter.pluginStatics += plugin.countElasticStatics;
            });
            break;
          case constants.PLUGIN.CREATOR:
            it('should have creator', () => {
              expect(plugin.hasCreator(Model)).to.be.true;
              counter.pluginMethods += plugin.countCreatorMethods;
              counter.pluginStatics += plugin.countCreatorStatics;
            });
            break;
          case constants.PLUGIN.FILE:
            it('should have file');
            break;
          case constants.PLUGIN.TIMESTAMP:
            it('should have timestamp', () => {
              expect(plugin.hasTimestamp(Model)).to.be.true;
              counter.pluginMethods += plugin.countTimestampMethods;
            });
            break;
          case constants.PLUGIN.UNIQUE:
            it('should have unique');
            break;
          default:
            it('should have ' + options.plugins[i], (done) => {
              done('Unsopported plugin `' + options.plugins[i] + '`');
            });
          }
          it('should have ' + options.plugins[i]);
        }
      }
    }
    else {
      it('should validate Plugins');
    }
  });
}

function validateSchema(Model, options, analyzed) {
  describe('Schema ->', () => {
    if (options && options.schema) {
      schemaValidator.required(Model, options, analyzed);
      schemaValidator.unique(Model, options, analyzed);
      schemaValidator.default(Model, options, analyzed);
      schemaValidator.enum(Model, options, analyzed);
      schemaValidator.min(Model, options, analyzed);
      schemaValidator.max(Model, options, analyzed);
      schemaValidator.minlength(Model, options, analyzed);
      schemaValidator.maxlength(Model, options, analyzed);
      schemaValidator.custom(Model, options, analyzed);
    }
    else {
      it('should validate model schema');
    }
  });
}

function validateVirtualFields(Model, options, VirtualFields) {
  describe('Virtual Fields ->', () => {
    const keys = _.keys(options.virtualFields);
    const virtualFieldKeys = _.difference(_.keys(VirtualFields), constants.IGNORED_VIRTUAL_FIELD.ALL);
    const unchecked = _.difference(virtualFieldKeys, keys);
    if (keys && _.isPlainObject(options.virtualFields)) {
      for (let i = 0; i !== keys.length; i++) {
        it('should validate virtual field for `' + keys[i] + '`', (done) => {
          if (_.isUndefined(VirtualFields[keys[i]])) {
            done('doesn\'t have virtual field');
          }
          else if (!_.isFunction(options.virtualFields[keys[i]])) {
            done('Only functions are supported');
          }
          else {
            expect(VirtualFields[keys[i]]).to.exist;
            expect(VirtualFields[keys[i]].path).to.exist
              .and.eql(keys[i]);
            if ((options.virtualFields[keys[i]]).length === 0) {
              options.virtualFields[keys[i]]();
              done();
            }
            else {
              options.virtualFields[keys[i]](done);
            }
          }
        });
      }
    }
    else if (options.virtualFields) {
      it('virtualFields should be an object', (done) => {
        done('virtualFields should be an object');
      });
    }
    for (let i = 0; i !== unchecked.length; i++) {
      it('missing validation for `' + unchecked[i] + '`');
    }
  });
}


module.exports = {
  'modelName': validateModelName,
  'plugins': validatePlugins,
  'schema': validateSchema,
  'virtualFields': validateVirtualFields,
};