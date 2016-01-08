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

module.exports = {
  countTimestampMethods: 1,
  hasTimestamp,
  countElasticMethods: 2,
  countElasticStatics: 5,
  hasElastic,
  countCreatorMethods: 2,
  countCreatorStatics: 1,
  hasCreator,
  countVersionMethods: 2,
  hasVersion,
};