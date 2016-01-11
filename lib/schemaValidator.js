'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const expect = require('chai').expect;

/**
* Required Fields
*/
function requiredValidator(Model, options, analyzed) {
  describe('Required #', () => {
    if (options.validation.required && _.isArray(options.validation.required)) {
      it('should have ' + analyzed.required.ALL.length + ' required fields', () => {
        expect(options.validation.required).to.eql(analyzed.required.ALL);
      });
      /*it('should require ' + options.validation.required.toString(), () => {
        const requiredFields = _.difference(analyzed.required.ALL, analyzed.default.ALL);
        const model = new Model({});
        const validationError = model.validateSync();
console.log(validationError);
        expect(validationError).to.exist
          .and.be.an.instanceof(Error);
        expect(validationError).to.have.property('message', Model.modelName + ' validation failed');
        expect(validationError).to.have.property('name', 'ValidationError');
        expect(validationError.errors).to.exist
          .and.be.an('object');
        expect((_.keys(validationError.errors)).length).to.eql(requiredFields.length);

        for (let i = 0; i !== requiredFields.length; i++) {
          expect(validationError.errors[requiredFields[i]]).to.exist
            .and.be.an('object');
          expect(validationError.errors[requiredFields[i]]).to.have.property('properties');
          expect(validationError.errors[requiredFields[i]]).to.have.property('message');//, mongoose.Error.messages.general.required.toString());
          expect(validationError.errors[requiredFields[i]]).to.have.property('name', 'ValidatorError');
          expect(validationError.errors[requiredFields[i]]).to.have.property('kind', 'required');
          expect(validationError.errors[requiredFields[i]]).to.have.property('path', requiredFields[i]);
          expect(validationError.errors[requiredFields[i]]).to.have.property('value');//, undefined);
        }
      });*/
      it('TODO: should validateSync() each field (use Customs until it\'s available)');
      it('TODO: should validate when required is a function (use Customs until it\'s available)');
      it('TODO: should validate when a field is not required but a nested field is (use Customs until it\'s available)');
    }
    else if (options.validation.required) {
      it('validation.required should be an array', (done) => {
        done('validation.required should be an array');
      });
    }
    else {
      it('should validate model required fields');
    }
  });
}

function uniqueValidator(Model, options, analyzed) {
  describe('Unique #', () => {
    const keys = options.validation.unique;
    const unchecked = _.difference(analyzed.unique.ALL, keys);
    if (options.validation.unique && _.isArray(options.validation.unique)) {
      for (let i = 0; i !== keys.length; i++) {
        it('should validate unique for `' + keys[i] + '`', (done) => {
          if (!_.isBoolean(analyzed.schema[keys[i]].unique)) {
            done('Only boolean are supported');
          }
          else {
            expect(analyzed.schema[keys[i]].unique).to.be.true;
            done();
          }
        });
      }
    }
    else if (options.validation.unique) {
      it('validation.unique should be an array', (done) => {
        done('validation.unique should be an array');
      });
    }
    for (let i = 0; i !== unchecked.length; i++) {
      it('missing validation for `' + unchecked[i] + '`');
    }
  });
}

function defaultValidator(Model, options, analyzed) {
  describe('Default #', () => {
    const keys = _.keys(options.validation.default);
    const unchecked = _.difference(analyzed.default.ALL, keys);
    if (options.validation.default && _.isPlainObject(options.validation.default)) {
      for (let i = 0; i !== keys.length; i++) {
        it('should validate default value for `' + keys[i] + '`', (done) => {
          if (_.isFunction(options.validation.default[keys[i]]) || _.isFunction(analyzed.schema[keys[i]].default)) {
            done('Functions are not supported');
          }
          else {
            expect(options.validation.default[keys[i]]).to.eql(analyzed.schema[keys[i]].default);
            done();
          }
        });
      }
    }
    else if (options.validation.default) {
      it('validation.default should be an object', (done) => {
        done('validation.default should be an object');
      });
    }
    for (let i = 0; i !== unchecked.length; i++) {
      it('missing validation for `' + unchecked[i] + '`');
    }
  });
}

function enumValidator(Model, options, analyzed) {
  describe('Enum #', () => {
    const keys = _.keys(options.validation.enum);
    const unchecked = _.difference(analyzed.enum.ALL, keys);
    if (options.validation.enum && _.isPlainObject(options.validation.enum)) {
      for (let i = 0; i !== keys.length; i++) {
        it('should validate possible values for `' + keys[i] + '`', (done) => {
          if (!_.isArray(options.validation.enum[keys[i]]) || !_.isArray(analyzed.schema[keys[i]].enum)) {
            done('Only array are supported');
          }
          else {
            expect(options.validation.enum[keys[i]]).to.eql(analyzed.schema[keys[i]].enum);
            done();
          }
        });
      }
    }
    else if (options.validation.enum) {
      it('validation.enum should be an object', (done) => {
        done('validation.enum should be an object');
      });
    }
    for (let i = 0; i !== unchecked.length; i++) {
      it('missing validation for `' + unchecked[i] + '`');
    }
  });
}

function minValidator(Model, options, analyzed) {
  describe('Min #', () => {
    const keys = _.keys(options.validation.min);
    const unchecked = _.difference(analyzed.min.ALL, keys);
    if (options.validation.min && _.isPlainObject(options.validation.min)) {
      for (let i = 0; i !== keys.length; i++) {
        it('should validate min value for `' + keys[i] + '`', (done) => {
          if (!_.isNumber(options.validation.min[keys[i]]) || !_.isNumber(analyzed.schema[keys[i]].min)) {
            done('Only array are supported');
          }
          else {
            expect(options.validation.min[keys[i]]).to.eql(analyzed.schema[keys[i]].min);
            done();
          }
        });
      }
    }
    else if (options.validation.min) {
      it('validation.min should be an object', (done) => {
        done('validation.min should be an object');
      });
    }
    for (let i = 0; i !== unchecked.length; i++) {
      it('missing validation for `' + unchecked[i] + '`');
    }
  });
}

function customValidator(Model, options, analyzed) {
  describe('Custom #', () => {
    if (options.validation.custom && _.isPlainObject(options.validation.custom)) {
      const keys = _.keys(options.validation.custom);
      for (let i = 0; i !== keys.length; i++) {
        it(keys[i], options.validation.custom[keys[i]]);
      }
    }
    else if (options.validation.custom) {
      it('validation.custom should be an object', (done) => {
        done('validation.custom should be an object');
      });
    }
  });
}
module.exports = {
  'required': requiredValidator,
  'unique': uniqueValidator,
  'default': defaultValidator,
  'enum': enumValidator,
  'min': minValidator,
  'custom': customValidator,
};
