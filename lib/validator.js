'use strict';

const _ = require('lodash');
const expect = require('chai').expect;

const constants = require('./constants.js');
const plugin = require('./plugin');

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


module.exports = {
  'modelName': validateModelName,
  'plugins': validatePlugins,
};