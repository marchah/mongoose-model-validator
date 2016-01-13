# Mongoose Model Validator

Works with mocha and chai.

Usage
-----
````javascript
const modelValidator = require('mongoose-model-validator');

describe(Title<String>, modelValidator(model<MongooseModel>, toValidate<Object>));
````

toValidate Syntax
----------------
````javascript
{
  modelName: <String>,
  plugins: <Array<String(plugin name)>>, // supported plugins: ['creator', 'elastic', 'file', 'timestamp', 'unique'] (not fully supported yet)
  schema: {
    required: <Array<String(field name)>>, // required field names
    unique: <Array<String(field name)>>, // required field names
    default: <Object<String(field name), String(value)>>
    enum: <Object<String(field name), Array>>
    min: <Object<String(field name), Number(value)>>
    max: <Object<String(field name), Number(value)>>
    minlength: <Object<String(field name), Number(value)>>
    maxlength: <Object<String(field name), Number(value)>>
    custom: <Object<String(test title), Function>>,
  },
  virtualFields: <Object<String(virtual field name), Function>>,
  methods: <Object<String(method name), Function>>,
  statics: <Object<String(method name), Function || value>>,
  events: <Object<String(method name), Function || null>>,
}
````

Examples
----
````javascript
const expect = require('chai').expect;

const modelValidator = require('mongoose-model-validator');
const Contact = require('server/app/models/user/contact');

describe('Contact ->', modelValidator(Contact, {
    modelName: 'Contact',
    plugins: ['timestamp', 'creator', 'elastic'],
    schema: {
      required: ['field3', 'field4.nested_field3', 'field5'],
      unique: ['field3', 'field4.nested_field1'],
      default: {
        'field3': 'Unknown',
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
          expect(Contact.modelName).to.eql('Contact');
        },
      },
    },
    virtualFields: {
      'fullname': (done) => {
        const tmp = MyModel();
        expect(tmp.fullname).to.eql('first Last');
        done();
      },
    },
    methods: {
      test: () => {
        const tmp = MyModel();
        expect(tmp.test()).to.eql('method test');
      },
    },
    statics: {
      ROLES: ['consignee', 'shipper', 'notify'],
      // or
      ROLES: () => {
        expect(MyModel.ROLES).to.eql(['consignee', 'shipper', 'notify']);
      },
      test: () => {
        const tmp = MyModel();
        expect(tmp.test()).to.eql('statics test');
      },
    },
    'pre.save': null,
    'pre.remove': () => {
      // do test
    },
}));
````

Statics
-------

if statics it's a value, you have the choice to pass only the expected value or a function if you want to do custom test.

Methods and Statics
-------------------

You can overwrite the test for the methods/statics of a plugin used in a model by simply add a test in the methods or statics object.

Events
------
if value is null, the test will be mark as `pending` by mocha
For the moment the events aren't automatically detected, so if you don't declare it you know be informed that it isn't tested.
For the moment use [rewire](https://www.npmjs.com/package/rewire) to test

Functions
---------

To test asynchronous, simply invoke the callback when your test is complete. By adding a callback (usually named done).
(it's [mocha callback](http://mochajs.org/#asynchronous-code)) 

Required field
--------------

for field with required is a function, the field is conciderated as `required === true`

TODO
----
* required isn't working and a lot of verifications are missing
* validate: add automatic detection and field in `toValidate.schema`
* events: add automatic detection
