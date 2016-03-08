'use strict';

const expect = require('chai').expect;

const helpers = require('./helpers');

function hasTimestamp(model) {
  const Schema = helpers.getSchema(model);
  const Methods = helpers.getMethods(model);

  expect(Schema._created).to.exist;
  expect(Schema._created.instance).to.exist
    .and.eql('Date');
  expect(Schema._updated).to.exist;
  expect(Schema._updated.instance).to.exist
    .and.eql('Date');

  expect(Methods.touch).to.exist
    .that.is.a('function');
  console.log('`hasTimestamp` should have event preSave');
  return true;
}

function hasElastic(model) {
  const Methods = helpers.getMethods(model);
  const Statics = helpers.getStatics(model);

  expect(Methods.index).to.exist
    .that.is.a('function');
  expect(Methods.unindex).to.exist
    .that.is.a('function');

  expect(Statics.getElastic).to.exist
    .that.is.a('function');
  expect(Statics.search).to.exist
    .that.is.a('function');
  expect(Statics.bulkIndex).to.exist
    .that.is.a('function');
  expect(Statics.bulkUnindex).to.exist
    .that.is.a('function');
  expect(Statics.paginate).to.exist
    .that.is.a('function');
  console.log('`hasElastic` should have event postSave');
  console.log('`hasElastic` should have event postRemove');
  return true;
}

function hasCreator(model) {
  const Schema = helpers.getSchema(model);
  const Methods = helpers.getMethods(model);
  const Statics = helpers.getStatics(model);

  expect(Schema.creator).to.exist;
  expect(Schema.creator.instance).to.exist
    .and.eql('ObjectID');

  expect(Methods.setCreator).to.exist
    .that.is.a('function');
  expect(Methods.getCreator).to.exist
    .that.is.a('function');
  expect(Statics.CREATOR_FIELD).to.exist
    .that.is.an('string');
  return true;
}

function hasVersion(model) {
  const Schema = helpers.getSchema(model);
  const Methods = helpers.getMethods(model);

  expect(Schema._version).to.exist;

  expect(Methods.getLatestVersion).to.exist
    .that.is.a('function');
  expect(Methods.getVersion).to.exist
    .that.is.a('function');

  console.log('`hasVersion` should have event preSave');
  console.log('`hasVersion` should have event preRemove');
  return true;
}

function hasIncrement(model) {
  const Methods = helpers.getMethods(model);
  const Statics = helpers.getStatics(model);

  expect(Methods.initCounter).to.exist
    .that.is.a('function');
  expect(Methods.nextSequence).to.exist
    .that.is.a('function');

  expect(Statics.resetSequence).to.exist
    .that.is.a('function');

  console.log('`hasIncrement` should have event preSave');
  return true;
}

function hasData(model) {
  const Methods = helpers.getMethods(model);

  expect(Methods.getDataByName).to.exist
    .that.is.a('function');
  expect(Methods.getDatasByName).to.exist
    .that.is.a('function');
  expect(Methods.getData).to.exist
    .that.is.a('function');
  expect(Methods.setData).to.exist
    .that.is.a('function');
  expect(Methods.addAttributes).to.exist
    .that.is.a('function');
  expect(Methods.getDatas).to.exist
    .that.is.a('function');

  console.log('`hasData` should have event preSave');
  console.log('`hasData` should have event preValidate');
  return true;
}

function hasPaginate(model) {
  const Statics = helpers.getStatics(model);

  expect(Statics.paginate).to.exist
    .that.is.a('function');

  return true;
}

function hasPermission(model) {
  const Statics = helpers.getStatics(model);

  expect(Statics.PERMISSIONS_FIELD).to.exist
    .that.is.a('function');

  expect(Statics.findHasPermission).to.exist
    .that.is.a('string');

  const Methods = helpers.getMethods(model);

  expect(Methods.removePermission).to.exist
    .that.is.a('function');
  expect(Methods.addPermission).to.exist
    .that.is.a('function');
  expect(Methods.hasPermission).to.exist
    .that.is.a('function');
  expect(Methods.copyPermissions).to.exist
    .that.is.a('function');

  return true;
}

module.exports = {
  timestampMethods: ['touch'],
  hasTimestamp,
  elasticMethods: ['index', 'unindex'],
  elasticStatics: ['getElastic', 'search', 'bulkIndex', 'bulkUnindex', 'paginate'],
  hasElastic,
  creatorMethods: ['setCreator', 'getCreator'],
  creatorStatics: ['CREATOR_FIELD'],
  creatorFields: ['creator'],
  hasCreator,
  versionMethods: ['getLatestVersion', 'getVersion'],
  versionFields: ['_version'],
  hasVersion,
  incrementMethods: ['initCounter', 'nextSequence'],
  incrementStatics: ['resetSequence'],
  hasIncrement,
  dataMethods: ['getDataByName', 'getDatasByName', 'getData', 'setData', 'addAttributes', 'getDatas'],
  dataFields: ['data','data.attribute', 'data.value'],
  hasData,
  hasPaginate,
  paginateStatics: ['paginate'],
  hasPermission,
  permissionStatics = ['PERMISSIONS_FIELD', 'findHasPermission'],
  permissionMethods = ['removePermission', 'addPermission', 'hasPermission', 'copyPermissions'],
  permissionFields = ['permissions', 'permissions.reference_type', 'permissions.reference', 'permissions.action'],
};
