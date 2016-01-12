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
  virtualFields: <Object<String(virtual field name), Function>>, // virtual field names
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
}));
````

Functions
---------

To test asynchronous, simply invoke the callback when your test is complete. By adding a callback (usually named done).
(it's mocha callback) http://mochajs.org/#asynchronous-code

Required field
--------------

for field with required is a function, the field is conciderated as `required === true`

TODO
----
* required isn't working and a lot of verifications are missing
