'use strict';

const expect = require('chai').expect;

const lib = require('../lib/index.js');
const Model1 = require('./model1.js');
const Model3 = require('./model3.js');

describe('Mongoose Model Validator ->', () => {
  require('./helpers.spec.js');
  require('./schemaAnalyzer.spec.js');

  describe('Test 1 ->', lib(Model1, {}));
  describe('Test 2 ->', lib(Model1, {
    modelName: 'Model1',
    plugins: 'invalid',
    validation: {
      custom: [],
    },
  }));
  describe('Test 3 ->', lib(Model1, {
    modelName: 'Model1',
    plugins: ['timestamp', 'invalid', 'creator', 'elastic'],
    validation: {
      required: ['types', 'name', 'company'],
      custom: {
        'should throw: Error: done() invoked with non-Error: custom done()': (done) => {
          done('custom done()');
        },
        'should not validate `1` equal `2`': () => {
          expect(1).to.eql(2);
        },
        'should validate `42` equal `42`': () => {
          expect(42).to.eql(42);
        },
        'should validate modelName': () => {
          expect(Model1.modelName).to.eql('Model1');
        },
      },
    },
  }));
  describe('Test 3 ->', lib(Model3, {
    modelName: 'Model3',
    plugins: [],
    validation: {
      required: ['field3', 'field4.nested_field3', 'field5', 'field5.nested_field3', 'field7', 'field8', 'field9.nested_field3', 'field10', 'field10.nested_field3', 'field11', 'field12'],
    },
  }));
});
