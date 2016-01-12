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
    schema: {
      unique: [],
      default: [],
      enum: [],
      min: [],
      max: [],
      minlength: [],
      maxlength: [],
      custom: [],
    },
    virtualFields: [],
    methods: [],
    statics: [],
    events: [],
  }));
  describe('Test 3 ->', lib(Model1, {
    modelName: 'Model1',
    plugins: ['timestamp', 'invalid', 'creator', 'elastic'],
    schema: {
      required: ['types', 'name', 'company'],
      unique: ['types', 'email', 'fax', 'company'],
      default: {
        'types': 'consignee',
        'address': 'Unknown',
      },
      enum: {
        'types': ['consignee', 'invalid', 'notify'],
        'description': ['K', 'UK'],
      },
      min: {
        'phone': 10,
        'fax': 21,
      },
      max: {
        'phone': 50,
        'fax': 21,
      },
      minlength: {
        'email': 21,
        'name': 2,
      },
      maxlength: {
        'address': 42,
        'email': 42,
      },
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
    methods: {
      test: () => {
        const tmp = Model1();
        expect(tmp.test()).to.eql('method test');
      },
    },
    statics: {
      ROLES: ['consignee', 'shipper', 'notify'],
      test: () => {
        expect(Model1.test()).to.eql('static test');
      },
    },
    events: {
      'pre.save': null,
      'pre.remove': () => {
        
      },
    }
  }));
  describe('Test 4 ->', lib(Model3, {
    modelName: 'Model3',
    plugins: [],
    schema: {
      required: ['field3', 'field4.nested_field3', 'field5', 'field5.nested_field3', 'field7', 'field8', 'field9.nested_field3', 'field10', 'field10.nested_field3', 'field11', 'field12'],
      unique: ['field10'],
      default: {
        'field2': 'Unknow',
        'field4': {
          'nested_field1': 'Unknow',
          'nested_field2': 'Unknow',
          'nested_field3': 'Unknow',
        },
        'field5.nested_field1': () => {return 'Unknow';},
        'field5.nested_field3': 'Unknow',
        'field7': () => {return 'Unknow';},
        'field8': ['Unknow'],
        'field9': [],
        'field12': 'Unknow',
      },
      enum: {
        'field1': 'field1',
      },
    },
    virtualFields: {
      'fullname': () => {
        const tmp = Model3();
        expect(tmp.fullname).to.eql('first Last');
      },
    },
    statics: {
      ROLES: () => {
        expect(Model1.ROLES).to.eql(['consignee', 'shipper', 'notify']);
      },
    },
  }));
});
