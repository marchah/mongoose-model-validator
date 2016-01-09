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
  validation: {
    required: <Array<String(field name)>>, // required field names
    enum: <Object<String(field name), Array>>
    // TODO: other checks
    custom: <Object<String(test title), Function>>,
  },
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
    validation: {
      required: ['field3', 'field4.nested_field3', 'field5'],
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
  },
}));
````

Required field
--------------

for field with required is a function, the field is conciderated as `required === true`
