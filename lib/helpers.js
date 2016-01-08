'use strict';

const _ = require('lodash');

function getSchema(Model) {
  if (!_.isUndefined(Model.schema) && !_.isUndefined(Model.schema.paths)) {
    return Model.schema.paths;
  }
  return undefined; 
}

module.exports = {
  getSchema,
  getVirtualFields: (Model) => {return Model.schema.virtuals;},
  getMethods: (Model) => {return Model.schema.methods;},
  getStatics: (Model) => {return Model.schema.statics;},
};
