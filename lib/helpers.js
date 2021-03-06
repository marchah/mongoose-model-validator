'use strict';

const _ = require('lodash');
const constants = require('./constants.js');

function getSchema(Model) {
  if (!_.isUndefined(Model.schema) && !_.isUndefined(Model.schema.paths)) {
    return Model.schema.paths;
  }
  return undefined;
}

/**
 * @param  {Object} plugin  [because recursive inclusion otherwise]
 */
function getPluginsFunctions(plugin, options) {
  const pluginsFunctions = {
    methods: [],
    statics: [],
    fields: [],
  };
  if (options && options.plugins) {
    if (_.isArray(options.plugins)) {
      for (let i = 0; i !== options.plugins.length; i++) {
        switch (options.plugins[i].toLowerCase()) {
        case constants.PLUGIN.ELASTIC:
          pluginsFunctions.methods = pluginsFunctions.methods.concat(plugin.elasticMethods);
          pluginsFunctions.statics = pluginsFunctions.statics.concat(plugin.elasticStatics);
          break;
        case constants.PLUGIN.CREATOR:
          pluginsFunctions.methods = pluginsFunctions.methods.concat(plugin.creatorMethods);
          pluginsFunctions.statics = pluginsFunctions.statics.concat(plugin.creatorStatics);
          pluginsFunctions.fields = pluginsFunctions.fields.concat(plugin.creatorFields);
          break;
        case constants.PLUGIN.TIMESTAMP:
          pluginsFunctions.methods = pluginsFunctions.methods.concat(plugin.timestampMethods);
          break;
        case constants.PLUGIN.UNIQUE:
          break;
        case constants.PLUGIN.FILE:
          break;
        case constants.PLUGIN.VERSION:
          pluginsFunctions.methods = pluginsFunctions.methods.concat(plugin.versionMethods);
          pluginsFunctions.fields = pluginsFunctions.fields.concat(plugin.versionFields);
          break;
        case constants.PLUGIN.INCREMENT:
          pluginsFunctions.methods = pluginsFunctions.methods.concat(plugin.incrementMethods);
          pluginsFunctions.statics = pluginsFunctions.statics.concat(plugin.incrementStatics);
          break;
        case constants.PLUGIN.DATA:
          pluginsFunctions.methods = pluginsFunctions.methods.concat(plugin.dataMethods);
          pluginsFunctions.fields = pluginsFunctions.fields.concat(plugin.dataFields);
          break;
        case constants.PLUGIN.PAGINATE:
          pluginsFunctions.statics = pluginsFunctions.statics.concat(plugin.paginateStatics);
          break;
        case constants.PLUGIN.PERMISSION:
          pluginsFunctions.statics = pluginsFunctions.statics.concat(plugin.permissionStatics);
          pluginsFunctions.methods = pluginsFunctions.methods.concat(plugin.permissionMethods);
          pluginsFunctions.fields = pluginsFunctions.fields.concat(plugin.permissionFields);
          break;
        default:
            //console.error('Unsopported plugin `' + options.plugins[i] + '`');
        }
      }
    }
  }
  return pluginsFunctions;
}

function callback(fct, done) {
  if ((fct).length === 0) {
    fct();
    done();
  }
  else {
    fct(done);
  }
}

module.exports = {
  getSchema,
  getVirtualFields: (Model) => {return Model.schema.virtuals;},
  getMethods: (Model) => {return Model.schema.methods;},
  getStatics: (Model) => {return Model.schema.statics;},
  getPluginsFunctions: getPluginsFunctions,
  callback: callback,
};
