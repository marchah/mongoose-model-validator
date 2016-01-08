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
      it('validation.required should be an array');
    }
    else {
      it('should validate model required fields');
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
    } else if (options.validation.custom) {
      it('validation.custom should be an object');
    }
  });
}
module.exports = {
  'required': requiredValidator,
  'custom': customValidator,
};
