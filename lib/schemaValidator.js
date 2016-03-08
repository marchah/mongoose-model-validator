'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const expect = require('chai').expect;

/**
* Required Fields
*/
function requiredValidator(Model, toValidate, analyzed) {
  describe('Required #', () => {
    if (toValidate.schema.required && _.isArray(toValidate.schema.required)) {
      it('should have ' + analyzed.required.ALL.length + ' required fields', () => {
        expect(toValidate.schema.required).to.eql(analyzed.required.ALL);
      });
      /*it('should require ' + toValidate.schema.required.toString(), () => {
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
      //it('TODO: should validateSync() each field (use Customs until it\'s available)');
      //it('TODO: should validate when required is a function (use Customs until it\'s available)');
      //it('TODO: should validate when a field is not required but a nested field is (use Customs until it\'s available)');
    }
    else if (toValidate.schema.required) {
      it('schema.required should be an array', (done) => {
        done('schema.required should be an array');
      });
    }
    else {
      it('should validate model required fields');
    }
  });
}

function schemaFunctionValidator(schemaFct, toValidateFct, done) {
  if ((toValidateFct).length <= 1) {
    toValidateFct(schemaFct);
    done();
  }
  else {
    toValidateFct(schemaFct, done);
  }  
}

function uniqueValidator(Model, toValidate, analyzed) {
  describe('Unique #', () => {
    const keys = toValidate.schema.unique;
    const unchecked = _.difference(analyzed.unique.ALL, keys);
    if (toValidate.schema.unique && _.isArray(toValidate.schema.unique)) {
      for (let i = 0; i !== keys.length; i++) {
        it('should validate unique for `' + keys[i] + '`', (done) => {
          if (_.isUndefined(analyzed.schema[keys[i]].unique)) {
            done('doesn\'t have unique value');
          }
          else if (!_.isBoolean(analyzed.schema[keys[i]].unique)) {
            done('Only boolean are supported');
          }
          else {
            expect(analyzed.schema[keys[i]].unique).to.be.true;
            done();
          }
        });
      }
    }
    else if (toValidate.schema.unique) {
      it('schema.unique should be an array', (done) => {
        done('schema.unique should be an array');
      });
    }
    for (let i = 0; i !== unchecked.length; i++) {
      it('missing validation for `' + unchecked[i] + '`');
    }
  });
}

function defaultValidator(Model, toValidate, analyzed) {
  describe('Default #', () => {
    const keys = _.keys(toValidate.schema.default);
    const unchecked = _.difference(analyzed.default.ALL, keys);
    if (toValidate.schema.default && _.isPlainObject(toValidate.schema.default)) {
      for (let i = 0; i !== keys.length; i++) {
        it('should validate default value for `' + keys[i] + '`', (done) => {
          if (_.isUndefined(analyzed.schema[keys[i]].default)) {
            done('doesn\'t have default value');
          }
          else if (_.isFunction(toValidate.schema.default[keys[i]]) && _.isFunction(analyzed.schema[keys[i]].default)) {
            schemaFunctionValidator(analyzed.schema[keys[i]].default, toValidate.schema.default[keys[i]], done)
          }
          else if (_.isFunction(toValidate.schema.default[keys[i]]) || _.isFunction(analyzed.schema[keys[i]].default)) {
            done('Functions are not supported');
          }
          else {
            expect(toValidate.schema.default[keys[i]]).to.eql(analyzed.schema[keys[i]].default);
            done();
          }
        });
      }
    }
    else if (toValidate.schema.default) {
      it('schema.default should be an object', (done) => {
        done('schema.default should be an object');
      });
    }
    for (let i = 0; i !== unchecked.length; i++) {
      it('missing validation for `' + unchecked[i] + '`');
    }
  });
}

function enumValidator(Model, toValidate, analyzed) {
  describe('Enum #', () => {
    const keys = _.keys(toValidate.schema.enum);
    const unchecked = _.difference(analyzed.enum.ALL, keys);
    if (toValidate.schema.enum && _.isPlainObject(toValidate.schema.enum)) {
      for (let i = 0; i !== keys.length; i++) {
        it('should validate possible values for `' + keys[i] + '`', (done) => {
          if (_.isUndefined(analyzed.schema[keys[i]].enum)) {
            done('doesn\'t have enum values');
          }
          else if (!_.isArray(toValidate.schema.enum[keys[i]]) || !_.isArray(analyzed.schema[keys[i]].enum)) {
            done('Only array are supported');
          }
          else {
            expect(toValidate.schema.enum[keys[i]]).to.eql(analyzed.schema[keys[i]].enum);
            done();
          }
        });
      }
    }
    else if (toValidate.schema.enum) {
      it('schema.enum should be an object', (done) => {
        done('schema.enum should be an object');
      });
    }
    for (let i = 0; i !== unchecked.length; i++) {
      it('missing validation for `' + unchecked[i] + '`');
    }
  });
}

function minValidator(Model, toValidate, analyzed) {
  describe('Min #', () => {
    const keys = _.keys(toValidate.schema.min);
    const unchecked = _.difference(analyzed.min.ALL, keys);
    if (toValidate.schema.min && _.isPlainObject(toValidate.schema.min)) {
      for (let i = 0; i !== keys.length; i++) {
        it('should validate min value for `' + keys[i] + '`', (done) => {
          if (_.isUndefined(analyzed.schema[keys[i]].min)) {
            done('doesn\'t have min value');
          }
          else if (!_.isNumber(toValidate.schema.min[keys[i]]) || !_.isNumber(analyzed.schema[keys[i]].min)) {
            done('Only number are supported');
          }
          else {
            expect(toValidate.schema.min[keys[i]]).to.eql(analyzed.schema[keys[i]].min);
            done();
          }
        });
      }
    }
    else if (toValidate.schema.min) {
      it('schema.min should be an object', (done) => {
        done('schema.min should be an object');
      });
    }
    for (let i = 0; i !== unchecked.length; i++) {
      it('missing validation for `' + unchecked[i] + '`');
    }
  });
}

function maxValidator(Model, toValidate, analyzed) {
  describe('Max #', () => {
    const keys = _.keys(toValidate.schema.max);
    const unchecked = _.difference(analyzed.max.ALL, keys);
    if (toValidate.schema.max && _.isPlainObject(toValidate.schema.max)) {
      for (let i = 0; i !== keys.length; i++) {
        it('should validate max value for `' + keys[i] + '`', (done) => {
          if (_.isUndefined(analyzed.schema[keys[i]].max)) {
            done('doesn\'t have max value');
          }
          else if (!_.isNumber(toValidate.schema.max[keys[i]]) || !_.isNumber(analyzed.schema[keys[i]].max)) {
            done('Only number are supported');
          }
          else {
            expect(toValidate.schema.max[keys[i]]).to.eql(analyzed.schema[keys[i]].max);
            done();
          }
        });
      }
    }
    else if (toValidate.schema.max) {
      it('schema.max should be an object', (done) => {
        done('schema.max should be an object');
      });
    }
    for (let i = 0; i !== unchecked.length; i++) {
      it('missing validation for `' + unchecked[i] + '`');
    }
  });
}

function minlengthValidator(Model, toValidate, analyzed) {
  describe('Minlength #', () => {
    const keys = _.keys(toValidate.schema.minlength);
    const unchecked = _.difference(analyzed.minlength.ALL, keys);
    if (toValidate.schema.minlength && _.isPlainObject(toValidate.schema.minlength)) {
      for (let i = 0; i !== keys.length; i++) {
        it('should validate minlength value for `' + keys[i] + '`', (done) => {
          if (_.isUndefined(analyzed.schema[keys[i]].minlength)) {
            done('doesn\'t have minlength value');
          }
          else if (!_.isNumber(toValidate.schema.minlength[keys[i]]) || !_.isNumber(analyzed.schema[keys[i]].minlength)) {
            done('Only number are supported');
          }
          else {
            expect(toValidate.schema.minlength[keys[i]]).to.eql(analyzed.schema[keys[i]].minlength);
            done();
          }
        });
      }
    }
    else if (toValidate.schema.minlength) {
      it('schema.minlength should be an object', (done) => {
        done('schema.minlength should be an object');
      });
    }
    for (let i = 0; i !== unchecked.length; i++) {
      it('missing validation for `' + unchecked[i] + '`');
    }
  });
}

function maxlengthValidator(Model, toValidate, analyzed) {
  describe('Maxlength #', () => {
    const keys = _.keys(toValidate.schema.maxlength);
    const unchecked = _.difference(analyzed.maxlength.ALL, keys);
    if (toValidate.schema.maxlength && _.isPlainObject(toValidate.schema.maxlength)) {
      for (let i = 0; i !== keys.length; i++) {
        it('should validate maxlength value for `' + keys[i] + '`', (done) => {
          if (_.isUndefined(analyzed.schema[keys[i]].maxlength)) {
            done('doesn\'t have maxlength value');
          }
          else if (!_.isNumber(toValidate.schema.maxlength[keys[i]]) || !_.isNumber(analyzed.schema[keys[i]].maxlength)) {
            done('Only number are supported');
          }
          else {
            expect(toValidate.schema.maxlength[keys[i]]).to.eql(analyzed.schema[keys[i]].maxlength);
            done();
          }
        });
      }
    }
    else if (toValidate.schema.maxlength) {
      it('schema.maxlength should be an object', (done) => {
        done('schema.maxlength should be an object');
      });
    }
    for (let i = 0; i !== unchecked.length; i++) {
      it('missing validation for `' + unchecked[i] + '`');
    }
  });
}

function customValidator(Model, toValidate, analyzed) {
  describe('Custom #', () => {
    if (toValidate.schema.custom && _.isPlainObject(toValidate.schema.custom)) {
      const keys = _.keys(toValidate.schema.custom);
      for (let i = 0; i !== keys.length; i++) {
        it(keys[i], toValidate.schema.custom[keys[i]]);
      }
    }
    else if (toValidate.schema.custom) {
      it('schema.custom should be an object', (done) => {
        done('schema.custom should be an object');
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
  'max': maxValidator,
  'minlength': minlengthValidator,
  'maxlength': maxlengthValidator,
  'custom': customValidator,
};
