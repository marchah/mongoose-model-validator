'use strict';

const _ = require('lodash');
const expect = require('chai').expect;
const rewire = require("rewire");

const schemaAnalyzer = rewire('../lib/schemaAnalyzer.js');
const requiredFieldAnalyzer = schemaAnalyzer.__get__('requiredFieldAnalyzer');
const defaultFieldAnalyzer = schemaAnalyzer.__get__('defaultFieldAnalyzer');
const uniqueFieldAnalyzer = schemaAnalyzer.__get__('uniqueFieldAnalyzer');
const enumFieldAnalyzer = schemaAnalyzer.__get__('enumFieldAnalyzer');
const minNumberFieldAnalyzer = schemaAnalyzer.__get__('minNumberFieldAnalyzer');
const maxNumberFieldAnalyzer = schemaAnalyzer.__get__('maxNumberFieldAnalyzer');
const minLengthFieldAnalyzer = schemaAnalyzer.__get__('minLengthFieldAnalyzer');
const maxLengthFieldAnalyzer = schemaAnalyzer.__get__('maxLengthFieldAnalyzer');

const Model1 = require('./model1.js');
const Model2 = require('./model2.js');

describe('Schema Analyzer -> ', () => {
  describe('Required Field Analyzer #', () => {
    it('should not find required field', () => {
      const analyzed = {
        schema: {},
        required: {
          ALL: [],
        },
      };
      expect(requiredFieldAnalyzer({}, '', analyzed)).to.be.undefined;
      expect(analyzed.required.ALL).that.is.an('array').to.be.empty;
      expect(analyzed.schema).that.is.an('object').to.be.empty;
    });
    it('should find `test_1` required field', () => {
      const analyzed = {
        schema: {'test_1': {}},
        required: {
          ALL: [],
        },
      };
      expect(requiredFieldAnalyzer({required: true}, 'test_1', analyzed)).to.be.undefined;
      expect(analyzed.required.ALL).to.eql(['test_1']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_1')
        .that.is.an('object')
        .to.have.property('required', true);
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_1'])).length).to.eql(1);
    });
    it('should find not `test_1` required field 1/2', () => {
      const analyzed = {
        schema: {'test_1': {}},
        required: {
          ALL: [],
        },
      };
      expect(requiredFieldAnalyzer({required: false}, 'test_1', analyzed)).to.be.undefined;
      expect(analyzed.required.ALL).to.be.empty;
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_1')
        .that.is.an('object')
        .to.be.empty;
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_1'])).length).to.eql(0);
    });
    it('should find not `test_1` required field 2/2', () => {
      const analyzed = {
        schema: {'test_1': {}},
        required: {
          ALL: [],
        },
      };
      expect(requiredFieldAnalyzer({}, 'test_1', analyzed)).to.be.undefined;
      expect(analyzed.required.ALL).to.be.empty;
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_1')
        .that.is.an('object')
        .to.be.empty;
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_1'])).length).to.eql(0);
    });
    it('should find `test_2` required field', () => {
      const analyzed = {
        schema: {'test_2': {}},
        required: {
          ALL: [],
        },
      };
      expect(requiredFieldAnalyzer({options: {required: true}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.required.ALL).to.eql(['test_2']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.have.property('required', true);
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(1);
    });
    it('should not find `test_2` required field', () => {
      const analyzed = {
        schema: {'test_2': {}},
        required: {
          ALL: [],
        },
      };
      expect(requiredFieldAnalyzer({options: {required: false}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.required.ALL).to.be.empty;
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.be.empty;
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(0);
    });
    it('should not add `test_2` required field twice', () => {
      const analyzed = {
        schema: {'test_2': {required: true}},
        required: {
          ALL: ['test_2'],
        },
      };
      expect(requiredFieldAnalyzer({options: {required: true}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.required.ALL).to.eql(['test_2']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.have.property('required', true);
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(1);
    });
  });
  describe('Default Field Analyzer #', () => {
    it('should not find default field', () => {
      const analyzed = {
        schema: {},
        default: {
          ALL: [],
        },
      };
      expect(defaultFieldAnalyzer({}, '', analyzed)).to.be.undefined;
      expect(analyzed.default.ALL).that.is.an('array').to.be.empty;
      expect(analyzed.schema).that.is.an('object').to.be.empty;
    });
    it('should find `test_1` default field', () => {
      const analyzed = {
        schema: {'test_1': {}},
        default: {
          ALL: [],
        },
      };
      expect(defaultFieldAnalyzer({default: 'true'}, 'test_1', analyzed)).to.be.undefined;
      expect(analyzed.default.ALL).to.eql(['test_1']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_1')
        .that.is.an('object')
        .to.have.property('default', 'true');
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_1'])).length).to.eql(1);
    });
    it('should not find `test_1` default field', () => {
      const analyzed = {
        schema: {'test_1': {}},
        default: {
          ALL: [],
        },
      };
      expect(defaultFieldAnalyzer({}, 'test_1', analyzed)).to.be.undefined;
      expect(analyzed.default.ALL).to.empty;
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_1')
        .that.is.an('object')
        .to.be.empty;
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_1'])).length).to.eql(0);
    });
    it('should find not `test_1` default field', () => {
      const analyzed = {
        schema: {'test_1': {}},
        default: {
          ALL: [],
        },
      };
      expect(defaultFieldAnalyzer({defaultValue: 'false'}, 'test_1', analyzed)).to.be.undefined;
      expect(analyzed.default.ALL).to.be.empty;
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_1')
        .that.is.an('object')
        .to.be.empty;
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_1'])).length).to.eql(0);
    });
    it('should find `test_2` default field', () => {
      const analyzed = {
        schema: {'test_2': {}},
        default: {
          ALL: [],
        },
      };
      expect(defaultFieldAnalyzer({options: {default: 'true'}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.default.ALL).to.eql(['test_2']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.have.property('default', 'true');
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(1);
    });
    it('should find not `test_2` default field', () => {
      const analyzed = {
        schema: {'test_2': {}},
        default: {
          ALL: [],
        },
      };
      expect(defaultFieldAnalyzer({options: {default: undefined}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.default.ALL).to.be.empty;
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.be.empty;
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(0);
    });
    it('should not add `test_2` default field twice', () => {
      const analyzed = {
        schema: {'test_2': {default: true}},
        default: {
          ALL: ['test_2'],
        },
      };
      expect(defaultFieldAnalyzer({options: {default: 'true'}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.default.ALL).to.eql(['test_2']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.have.property('default', true);
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(1);
    });
  });
  describe('Unique Field Analyzer #', () => {
    it('should not find unique field', () => {
      const analyzed = {
        schema: {},
        unique: {
          ALL: [],
        },
      };
      expect(uniqueFieldAnalyzer({}, '', analyzed)).to.be.undefined;
      expect(analyzed.unique.ALL).that.is.an('array').to.be.empty;
      expect(analyzed.schema).that.is.an('object').to.be.empty;
    });
    it('should find `test_1` unique field [boolean]', () => {
      const analyzed = {
        schema: {'test_1': {}},
        unique: {
          ALL: [],
        },
      };
      expect(uniqueFieldAnalyzer({unique: true}, 'test_1', analyzed)).to.be.undefined;
      expect(analyzed.unique.ALL).to.eql(['test_1']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_1')
        .that.is.an('object')
        .to.have.property('unique', true);
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_1'])).length).to.eql(1);
    });
    it('should find `test_1` unique field [function 1/2]', () => {
      const analyzed = {
        schema: {'test_1': {}},
        unique: {
          ALL: [],
        },
      };
      expect(uniqueFieldAnalyzer({unique: () => {return true;}}, 'test_1', analyzed)).to.be.undefined;
      expect(analyzed.unique.ALL).to.eql(['test_1']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_1')
        .that.is.an('object')
        .to.have.property('unique')
        .that.is.a('function');
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_1'])).length).to.eql(1);
    });
    it('should find `test_1` unique field [function 2/2]', () => {
      const analyzed = {
        schema: {'test_1': {}},
        unique: {
          ALL: [],
        },
      };
      expect(uniqueFieldAnalyzer({unique: () => {return false;}}, 'test_1', analyzed)).to.be.undefined;
      expect(analyzed.unique.ALL).to.eql(['test_1']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_1')
        .that.is.an('object')
        .to.have.property('unique')
        .that.is.a('function');
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_1'])).length).to.eql(1);
    });
    it('should find not `test_1` unique field 1/2', () => {
      const analyzed = {
        schema: {'test_1': {}},
        unique: {
          ALL: [],
        },
      };
      expect(uniqueFieldAnalyzer({unique: false}, 'test_1', analyzed)).to.be.undefined;
      expect(analyzed.unique.ALL).to.be.empty;
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_1')
        .that.is.an('object')
        .to.be.empty;
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_1'])).length).to.eql(0);
    });
    it('should find not `test_1` unique field 2/2', () => {
      const analyzed = {
        schema: {'test_1': {}},
        unique: {
          ALL: [],
        },
      };
      expect(uniqueFieldAnalyzer({}, 'test_1', analyzed)).to.be.undefined;
      expect(analyzed.unique.ALL).to.be.empty;
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_1')
        .that.is.an('object')
        .to.be.empty;
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_1'])).length).to.eql(0);
    });
    it('should find `test_2` unique field [boolean]', () => {
      const analyzed = {
        schema: {'test_2': {}},
        unique: {
          ALL: [],
        },
      };
      expect(uniqueFieldAnalyzer({options: {unique: true}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.unique.ALL).to.eql(['test_2']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.have.property('unique', true);
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(1);
    });
    it('should find `test_2` unique field [function 1/2]', () => {
      const analyzed = {
        schema: {'test_2': {}},
        unique: {
          ALL: [],
        },
      };
      expect(uniqueFieldAnalyzer({options: {unique: () => {return true;}}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.unique.ALL).to.eql(['test_2']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.have.property('unique')
        .that.is.a('function');
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(1);
    });
    it('should find `test_2` unique field [function 2/2]', () => {
      const analyzed = {
        schema: {'test_2': {}},
        unique: {
          ALL: [],
        },
      };
      expect(uniqueFieldAnalyzer({options: {unique: () => {return false;}}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.unique.ALL).to.eql(['test_2']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.have.property('unique')
        .that.is.a('function');
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(1);
    });
    it('should find not `test_2` unique field', () => {
      const analyzed = {
        schema: {'test_2': {}},
        unique: {
          ALL: [],
        },
      };
      expect(uniqueFieldAnalyzer({options: {unique: false}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.unique.ALL).to.be.empty;
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.be.empty;
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(0);
    });
    it('should not add `test_2` unique field twice', () => {
      const analyzed = {
        schema: {'test_2': {unique: true}},
        unique: {
          ALL: ['test_2'],
        },
      };
      expect(uniqueFieldAnalyzer({options: {unique: true}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.unique.ALL).to.eql(['test_2']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.have.property('unique', true);
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(1);
    });
  });
  describe('Enum Field Analyzer #', () => {
    it('should not find enum field', () => {
      const analyzed = {
        schema: {},
        enum: {
          ALL: [],
        },
      };
      expect(enumFieldAnalyzer({}, '', analyzed)).to.be.undefined;
      expect(analyzed.enum.ALL).that.is.an('array').to.be.empty;
      expect(analyzed.schema).that.is.an('object').to.be.empty;
    });
    it('should find `test_1` enum field', () => {
      const analyzed = {
        schema: {'test_1': {}},
        enum: {
          ALL: [],
        },
      };
      expect(enumFieldAnalyzer({enum: ['K', 'UK']}, 'test_1', analyzed)).to.be.undefined;
      expect(analyzed.enum.ALL).to.eql(['test_1']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_1')
        .that.is.an('object')
        .to.have.property('enum')
        .that.eql(['K', 'UK']);
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_1'])).length).to.eql(1);
    });
    it('should find `test_1` enum field [function]', () => {
      const analyzed = {
        schema: {'test_1': {}},
        enum: {
          ALL: [],
        },
      };
      expect(enumFieldAnalyzer({enum: () => {return ['K', 'UK'];}}, 'test_1', analyzed)).to.be.undefined;
      expect(analyzed.enum.ALL).to.eql(['test_1']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_1')
        .that.is.an('object')
        .to.have.property('enum')
        .that.is.a('function');
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_1'])).length).to.eql(1);
    });
    it('should not find `test_1` enum field', () => {
      const analyzed = {
        schema: {'test_1': {}},
        enum: {
          ALL: [],
        },
      };
      expect(enumFieldAnalyzer({}, 'test_1', analyzed)).to.be.undefined;
      expect(analyzed.enum.ALL).to.empty;
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_1')
        .that.is.an('object')
        .to.be.empty;
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_1'])).length).to.eql(0);
    });
    it('should find `test_2` enum field', () => {
      const analyzed = {
        schema: {'test_2': {}},
        enum: {
          ALL: [],
        },
      };
      expect(enumFieldAnalyzer({options: {enum: ['K', 'UK']}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.enum.ALL).to.eql(['test_2']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.have.property('enum')
        .that.eql(['K', 'UK']);
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(1);
    });
    it('should find `test_2` enum field [function]', () => {
      const analyzed = {
        schema: {'test_2': {}},
        enum: {
          ALL: [],
        },
      };
      expect(enumFieldAnalyzer({options: {enum: () => {return ['K', 'UK'];}}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.enum.ALL).to.eql(['test_2']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.have.property('enum')
        .that.is.a('function');
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(1);
    });
    it('should find not `test_2` enum field', () => {
      const analyzed = {
        schema: {'test_2': {}},
        enum: {
          ALL: [],
        },
      };
      expect(enumFieldAnalyzer({options: {}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.enum.ALL).to.be.empty;
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.empty;
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(0);
    });
    it('should not add `test_2` enum field twice', () => {
      const analyzed = {
        schema: {'test_2': {enum: ['OTHER']}},
        enum: {
          ALL: ['test_2'],
        },
      };
      expect(enumFieldAnalyzer({options: {enum: ['K', 'UK']}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.enum.ALL).to.eql(['test_2']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.have.property('enum')
        .that.eql(['OTHER']);
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(1);
    });
  });
  describe('Min Number Field Analyzer #', () => {
    it('should not find min field', () => {
      const analyzed = {
        schema: {},
        min: {
          ALL: [],
        },
      };
      expect(minNumberFieldAnalyzer({}, '', analyzed)).to.be.undefined;
      expect(analyzed.min.ALL).that.is.an('array').to.be.empty;
      expect(analyzed.schema).that.is.an('object').to.be.empty;
    });
    it('should find `test_1` min field', () => {
      const analyzed = {
        schema: {'test_1': {}},
        min: {
          ALL: [],
        },
      };
      expect(minNumberFieldAnalyzer({min: 21}, 'test_1', analyzed)).to.be.undefined;
      expect(analyzed.min.ALL).to.eql(['test_1']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_1')
        .that.is.an('object')
        .to.have.property('min', 21);
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_1'])).length).to.eql(1);
    });
    it('should not find `test_1` min field', () => {
      const analyzed = {
        schema: {'test_1': {}},
        min: {
          ALL: [],
        },
      };
      expect(minNumberFieldAnalyzer({}, 'test_1', analyzed)).to.be.undefined;
      expect(analyzed.min.ALL).to.be.empty;
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_1')
        .that.is.empty;
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_1'])).length).to.eql(0);
    });
    it('should find `test_2` min field', () => {
      const analyzed = {
        schema: {'test_2': {}},
        min: {
          ALL: [],
        },
      };
      expect(minNumberFieldAnalyzer({options: {min: 21}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.min.ALL).to.eql(['test_2']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.have.property('min', 21);
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(1);
    });
    it('should find not `test_2` min field', () => {
      const analyzed = {
        schema: {'test_2': {}},
        min: {
          ALL: [],
        },
      };
      expect(minNumberFieldAnalyzer({options: {}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.min.ALL).to.be.empty;
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.empty;
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(0);
    });
    it('should not add `test_2` min field twice', () => {
      const analyzed = {
        schema: {'test_2': {min: 42}},
        min: {
          ALL: ['test_2'],
        },
      };
      expect(minNumberFieldAnalyzer({options: {min: 21}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.min.ALL).to.eql(['test_2']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.have.property('min', 42);
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(1);
    });
  });
  describe('Max Number Field Analyzer #', () => {
    it('should not find max field', () => {
      const analyzed = {
        schema: {},
        max: {
          ALL: [],
        },
      };
      expect(maxNumberFieldAnalyzer({}, '', analyzed)).to.be.undefined;
      expect(analyzed.max.ALL).that.is.an('array').to.be.empty;
      expect(analyzed.schema).that.is.an('object').to.be.empty;
    });
    it('should find `test_1` max field', () => {
      const analyzed = {
        schema: {'test_1': {}},
        max: {
          ALL: [],
        },
      };
      expect(maxNumberFieldAnalyzer({max: 21}, 'test_1', analyzed)).to.be.undefined;
      expect(analyzed.max.ALL).to.eql(['test_1']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_1')
        .that.is.an('object')
        .to.have.property('max', 21);
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_1'])).length).to.eql(1);
    });
    it('should not find `test_1` max field', () => {
      const analyzed = {
        schema: {'test_1': {}},
        max: {
          ALL: [],
        },
      };
      expect(maxNumberFieldAnalyzer({}, 'test_1', analyzed)).to.be.undefined;
      expect(analyzed.max.ALL).to.empty;
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_1')
        .that.is.empty;
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_1'])).length).to.eql(0);
    });
    it('should find `test_2` max field', () => {
      const analyzed = {
        schema: {'test_2': {}},
        max: {
          ALL: [],
        },
      };
      expect(maxNumberFieldAnalyzer({options: {max: 21}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.max.ALL).to.eql(['test_2']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.have.property('max', 21);
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(1);
    });
    it('should find not `test_2` max field', () => {
      const analyzed = {
        schema: {'test_2': {}},
        max: {
          ALL: [],
        },
      };
      expect(maxNumberFieldAnalyzer({options: {}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.max.ALL).to.be.empty;
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.be.empty;
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(0);
    });
    it('should not add `test_2` max field twice', () => {
      const analyzed = {
        schema: {'test_2': {max: 42}},
        max: {
          ALL: ['test_2'],
        },
      };
      expect(maxNumberFieldAnalyzer({options: {max: 21}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.max.ALL).to.eql(['test_2']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.have.property('max', 42);
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(1);
    });
  });
  describe('Min Length Field Analyzer #', () => {
    it('should not find minlength field', () => {
      const analyzed = {
        schema: {},
        minlength: {
          ALL: [],
        },
      };
      expect(minLengthFieldAnalyzer({}, '', analyzed)).to.be.undefined;
      expect(analyzed.minlength.ALL).that.is.an('array').to.be.empty;
      expect(analyzed.schema).that.is.an('object').to.be.empty;
    });
    it('should find `test_1` minlength field', () => {
      const analyzed = {
        schema: {'test_1': {}},
        minlength: {
          ALL: [],
        },
      };
      expect(minLengthFieldAnalyzer({minlength: 21}, 'test_1', analyzed)).to.be.undefined;
      expect(analyzed.minlength.ALL).to.eql(['test_1']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_1')
        .that.is.an('object')
        .to.have.property('minlength', 21);
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_1'])).length).to.eql(1);
    });
    it('should not find `test_1` minlength field', () => {
      const analyzed = {
        schema: {'test_1': {}},
        minlength: {
          ALL: [],
        },
      };
      expect(minLengthFieldAnalyzer({}, 'test_1', analyzed)).to.be.undefined;
      expect(analyzed.minlength.ALL).to.be.empty;
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_1')
        .that.is.an('object')
        .to.be.empty;
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_1'])).length).to.eql(0);
    });
    it('should find `test_2` minlength field', () => {
      const analyzed = {
        schema: {'test_2': {}},
        minlength: {
          ALL: [],
        },
      };
      expect(minLengthFieldAnalyzer({options: {minlength: 21}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.minlength.ALL).to.eql(['test_2']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.have.property('minlength', 21);
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(1);
    });
    it('should find not `test_2` minlength field', () => {
      const analyzed = {
        schema: {'test_2': {}},
        minlength: {
          ALL: [],
        },
      };
      expect(minLengthFieldAnalyzer({options: {}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.minlength.ALL).to.be.empty;
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.be.empty;
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(0);
    });
    it('should not add `test_2` minlength field twice', () => {
      const analyzed = {
        schema: {'test_2': {minlength: 42}},
        minlength: {
          ALL: ['test_2'],
        },
      };
      expect(minLengthFieldAnalyzer({options: {minlength: 21}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.minlength.ALL).to.eql(['test_2']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.have.property('minlength', 42);
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(1);
    });
  });
  describe('Max Length Field Analyzer #', () => {
    it('should not find maxlength field', () => {
      const analyzed = {
        schema: {},
        maxlength: {
          ALL: [],
        },
      };
      expect(maxLengthFieldAnalyzer({}, '', analyzed)).to.be.undefined;
      expect(analyzed.maxlength.ALL).that.is.an('array').to.be.empty;
      expect(analyzed.schema).that.is.an('object').to.be.empty;
    });
    it('should find `test_1` maxlength field', () => {
      const analyzed = {
        schema: {'test_1': {}},
        maxlength: {
          ALL: [],
        },
      };
      expect(maxLengthFieldAnalyzer({maxlength: 21}, 'test_1', analyzed)).to.be.undefined;
      expect(analyzed.maxlength.ALL).to.eql(['test_1']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_1')
        .that.is.an('object')
        .to.have.property('maxlength', 21);
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_1'])).length).to.eql(1);
    });
    it('should not find `test_1` maxlength field', () => {
      const analyzed = {
        schema: {'test_1': {}},
        maxlength: {
          ALL: [],
        },
      };
      expect(maxLengthFieldAnalyzer({}, 'test_1', analyzed)).to.be.undefined;
      expect(analyzed.maxlength.ALL).to.be.empty;
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_1')
        .that.is.an('object')
        .to.be.empty;
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_1'])).length).to.eql(0);
    });
    it('should find `test_2` maxlength field', () => {
      const analyzed = {
        schema: {'test_2': {}},
        maxlength: {
          ALL: [],
        },
      };
      expect(maxLengthFieldAnalyzer({options: {maxlength: 21}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.maxlength.ALL).to.eql(['test_2']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.have.property('maxlength', 21);
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(1);
    });
    it('should find not `test_2` maxlength field', () => {
      const analyzed = {
        schema: {'test_2': {}},
        maxlength: {
          ALL: [],
        },
      };
      expect(maxLengthFieldAnalyzer({options: {}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.maxlength.ALL).to.be.empty;
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.be.empty;
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(0);
    });
    it('should not add `test_2` maxlength field twice', () => {
      const analyzed = {
        schema: {'test_2': {maxlength: 42}},
        maxlength: {
          ALL: ['test_2'],
        },
      };
      expect(maxLengthFieldAnalyzer({options: {maxlength: 21}}, 'test_2', analyzed)).to.be.undefined;
      expect(analyzed.maxlength.ALL).to.eql(['test_2']);
      expect(analyzed.schema)
        .that.is.an('object')
        .to.have.property('test_2')
        .that.is.an('object')
        .to.have.property('maxlength', 42);
      expect((_.keys(analyzed.schema)).length).to.eql(1);
      expect((_.keys(analyzed.schema['test_2'])).length).to.eql(1);
    });
  });
  describe('All Schema Analyzer #', () => {
    it('should validate fields module 1', () => {
      const analyzed = schemaAnalyzer(Model1);
      expect(analyzed).to.be.an('object');
      expect(analyzed.required).to.be.an('object');
      expect(analyzed.required.ALL).to.be.an('array');
      expect(analyzed.required.ALL).to.be.eql(['types', 'name', 'company', 'data.attribute']);

      expect(analyzed).to.be.an('object');
      expect(analyzed.default).to.be.an('object');
      expect(analyzed.default.ALL).to.be.an('array');
      expect(analyzed.default.ALL).to.be.eql(['types', 'name', 'address', 'fax', 'account']);

      expect(analyzed).to.be.an('object');
      expect(analyzed.unique).to.be.an('object');
      expect(analyzed.unique.ALL).to.be.an('array');
      expect(analyzed.unique.ALL).to.be.eql(['types', 'email', 'fax', 'company', 'increment']);

      expect(analyzed).to.be.an('object');
      expect(analyzed.enum).to.be.an('object');
      expect(analyzed.enum.ALL).to.be.an('array');
      expect(analyzed.enum.ALL).to.be.eql(['types', 'description', 'email']);

      expect(analyzed).to.be.an('object');
      expect(analyzed.minlength).to.be.an('object');
      expect(analyzed.minlength.ALL).to.be.an('array');
      expect(analyzed.minlength.ALL).to.be.eql(['email', 'name']);

      expect(analyzed).to.be.an('object');
      expect(analyzed.maxlength).to.be.an('object');
      expect(analyzed.maxlength.ALL).to.be.an('array');
      expect(analyzed.maxlength.ALL).to.be.eql(['email', 'address']);

      expect(analyzed.schema).that.is.an('object');
      expect((_.keys(analyzed.schema)).length).to.eql(17);
      expect(analyzed.schema).to.have.property('types').that.is.an('object').to.eql({required: true, default: 'consignee', unique: true, enum: [ 'consignee', 'shipper', 'notify' ] });
      expect(analyzed.schema).to.have.property('description').that.is.an('object').to.eql({ enum: [ 'K', 'UK' ] });

      expect(analyzed.schema).to.have.property('email').that.is.an('object');
      expect((_.keys(analyzed.schema.email)).length).to.eql(4);
      expect(analyzed.schema.email).to.have.property('unique', true);
      expect(analyzed.schema.email).to.have.property('enum').that.is.a('function');
      expect(analyzed.schema.email).to.have.property('minlength', 21);
      expect(analyzed.schema.email).to.have.property('maxlength', 42);

      expect(analyzed.schema).to.have.property('name').that.is.an('object').to.eql({ required: true, default: 'Unknown', minlength: 2 });
      expect(analyzed.schema).to.have.property('address').that.is.an('object').to.eql({ default: 'Unknown', maxlength: 42 });
      expect(analyzed.schema).to.have.property('phone').that.is.an('object').to.eql({ min: 10, max: 50 });

      expect(analyzed.schema).to.have.property('fax').that.is.an('object');
      expect((_.keys(analyzed.schema.fax)).length).to.eql(3);
      expect(analyzed.schema.fax).to.have.property('default').that.is.a('function');
      expect(analyzed.schema.fax).to.have.property('unique').that.is.a('function');
      expect(analyzed.schema.fax).to.have.property('min', 21);

      expect(analyzed.schema).to.have.property('company').that.is.an('object');
      expect((_.keys(analyzed.schema.company)).length).to.eql(3);
      expect(analyzed.schema.company).to.have.property('required', true);
      expect(analyzed.schema.company).to.have.property('unique').that.is.a('function');
      expect(analyzed.schema.company).to.have.property('max', 42);

      expect(analyzed.schema).to.have.property('account').that.is.an('object');
      expect((_.keys(analyzed.schema.account)).length).to.eql(1);
      expect(analyzed.schema.account).to.have.property('default'); // ObjectId

      expect(analyzed.schema).to.have.property('_created').that.is.an('object').to.be.empty;
      expect(analyzed.schema).to.have.property('_updated').that.is.an('object').to.be.empty;
      expect(analyzed.schema).to.have.property('creator').that.is.an('object').to.be.empty;
      expect(analyzed.schema).to.have.property('increment').that.is.an('object').to.eql({ unique: true });
      expect(analyzed.schema).to.have.property('data').that.is.an('object').to.be.empty;
      expect(analyzed.schema).to.have.property('data.attribute').that.is.an('object').to.eql({ required: true });
      expect(analyzed.schema).to.have.property('data.value').that.is.an('object').to.be.empty;
      expect(analyzed.schema).to.have.property('data.value.schemaName').that.is.an('object').to.be.empty;
    });

    it('should validate fields module 2', () => {
      const analyzed = schemaAnalyzer(Model2);
      expect(analyzed).to.be.an('object');
      expect(analyzed.required).to.be.an('object');
      expect(analyzed.required.ALL).to.be.an('array');
      expect(analyzed.required.ALL).to.be.eql(['field3', 'field4.nested_field3', 'field5', 'field5.nested_field3', 'field7', 'field8', 'field9.nested_field3', 'field10', 'field10.nested_field3', 'field11', 'field12']);

      expect(analyzed).to.be.an('object');
      expect(analyzed.default).to.be.an('object');
      expect(analyzed.default.ALL).to.be.an('array');
      expect(analyzed.default.ALL).to.be.eql(['field2', 'field4', 'field5.nested_field1', 'field5.nested_field3', 'field7','field8', 'field9', 'field12']);

      expect(analyzed).to.be.an('object');
      expect(analyzed.unique).to.be.an('object');
      expect(analyzed.unique.ALL).to.be.an('array');
      expect(analyzed.unique.ALL).to.be.eql(['field3', 'field4.nested_field2', 'field4.nested_field3', 'field5', 'field6', 'field7','field8','field9.nested_field3', 'field10']);

      expect(analyzed).to.be.an('object');
      expect(analyzed.enum).to.be.an('object');
      expect(analyzed.enum.ALL).to.be.an('array');
      expect(analyzed.enum.ALL).to.be.eql(['field1', 'field3', 'field4.nested_field3', 'field5', 'field7','field8','field9', 'field10.nested_field3', 'field11']);

      expect(analyzed).to.be.an('object');
      expect(analyzed.min).to.be.an('object');
      expect(analyzed.min.ALL).to.be.an('array');
      expect(analyzed.min.ALL).to.be.eql(['field1', 'field4.nested_field1', 'field5.nested_field1', 'field6', 'field8', 'field9.nested_field2']);

      expect(analyzed).to.be.an('object');
      expect(analyzed.max).to.be.an('object');
      expect(analyzed.max.ALL).to.be.an('array');
      expect(analyzed.max.ALL).to.be.eql(['field1', 'field4.nested_field2', 'field5','field5.nested_field2', 'field8', 'field9']);

      expect(analyzed).to.be.an('object');
      expect(analyzed.minlength).to.be.an('object');
      expect(analyzed.minlength.ALL).to.be.an('array');
      expect(analyzed.minlength.ALL).to.be.eql(['field2', 'field7']);

      expect(analyzed).to.be.an('object');
      expect(analyzed.maxlength).to.be.an('object');
      expect(analyzed.maxlength.ALL).to.be.an('array');
      expect(analyzed.maxlength.ALL).to.be.eql(['field2', 'field4.nested_field3']);

      expect(analyzed.schema).that.is.an('object');
      expect((_.keys(analyzed.schema)).length).to.eql(24);

      expect(analyzed.schema).to.have.property('field1').that.is.an('object').to.eql({ enum: [ 'K', 'UK' ], min: 21, max: 42 });
      expect(analyzed.schema).to.have.property('field2').that.is.an('object').to.eql({ default: 'Unknow', minlength: 21, maxlength: 42 });
      expect(analyzed.schema).to.have.property('field3').that.is.an('object').to.eql({ required: true, unique: true, enum: [ 'K', 'UK' ] });
      expect(analyzed.schema).to.have.property('field4').that.is.an('object').to.eql({ default: { nested_field1: 'Unknow', nested_field2: 'Unknow', nested_field3: 'Unknow' } });
      expect(analyzed.schema).to.have.property('field4.nested_field1').that.is.an('object').to.eql({ min: 21 });

      expect(analyzed.schema).to.have.property('field4.nested_field2').that.is.an('object');
      expect(analyzed.schema['field4.nested_field2']).to.have.property('unique').that.is.a('function');
      expect(analyzed.schema['field4.nested_field2']).to.have.property('max', 42);

      expect(analyzed.schema).to.have.property('field4.nested_field3').that.is.an('object').to.eql( { required: true, unique: true, enum: [ 'K', 'UK' ], maxlength: 42 });

      expect(analyzed.schema).to.have.property('field5').that.is.an('object');
      expect(analyzed.schema.field5).to.have.property('required', true);
      expect(analyzed.schema.field5).to.have.property('unique', true);
      expect(analyzed.schema.field5).to.have.property('enum').that.is.a('function');
      expect(analyzed.schema.field5).to.have.property('max', 42);

      expect(analyzed.schema).to.have.property('field5.nested_field1').that.is.an('object');
      expect(analyzed.schema['field5.nested_field1']).to.have.property('default').that.is.a('function');
      expect(analyzed.schema['field5.nested_field1']).to.have.property('min', 21);

      expect(analyzed.schema).to.have.property('field5.nested_field2').that.is.an('object').to.eql({ max: 42 });

      expect(analyzed.schema).to.have.property('field5.nested_field3').that.is.an('object');
      expect(analyzed.schema['field5.nested_field3']).to.have.property('required').that.is.a('function');
      expect(analyzed.schema['field5.nested_field3']).to.have.property('default', 'Unknow');

      expect(analyzed.schema).to.have.property('field6').that.is.an('object');
      expect(analyzed.schema.field6).to.have.property('unique').that.is.a('function');
      expect(analyzed.schema.field6).to.have.property('min', 21);
      
      expect(analyzed.schema).to.have.property('field7').that.is.an('object');
      expect(analyzed.schema.field7).to.have.property('required', true);
      expect(analyzed.schema.field7).to.have.property('default').that.is.a('function');
      expect(analyzed.schema.field7).to.have.property('unique').that.is.a('function');
      expect(analyzed.schema.field7).to.have.property('enum').to.eql([ 'K', 'UK' ]);
      expect(analyzed.schema.field7).to.have.property('minlength', 21);

      expect(analyzed.schema).to.have.property('field8').that.is.an('object');
      expect(analyzed.schema.field8).to.have.property('required', true);
      expect(analyzed.schema.field8).to.have.property('default').to.eql([ 'Unknow' ]);
      expect(analyzed.schema.field8).to.have.property('enum').to.eql([ [ 'K' ], [ 'UK' ] ]);
      expect(analyzed.schema.field8).to.have.property('min', 21);
      expect(analyzed.schema.field8).to.have.property('unique', true);
      expect(analyzed.schema.field8).to.have.property('max', 42);

      expect(analyzed.schema).to.have.property('field9').that.is.an('object');
      expect(analyzed.schema.field9).to.have.property('default').to.eql([ { nested_field1: 'Unknow', nested_field2: 'Unknow', nested_field3: 'Unknow' } ]);
      expect(analyzed.schema.field9).to.have.property('enum').to.eql([ { nested_field1: 'Unknow', nested_field2: 'Unknow', nested_field3: 'Unknow' }, { nested_field1: 'Known', nested_field2: 'Known', nested_field3: 'Known' } ]);
      expect(analyzed.schema.field9).to.have.property('max', 42);

      expect(analyzed.schema).to.have.property('field9.nested_field1').that.is.an('object').to.eql({});
      expect(analyzed.schema).to.have.property('field9.nested_field2').that.is.an('object').to.eql({ min: 21 });
      expect(analyzed.schema).to.have.property('field9.nested_field3').that.is.an('object').to.eql({ required: true, unique: true });
      expect(analyzed.schema).to.have.property('field10').that.is.an('object').to.eql({ required: true, unique: true });
      expect(analyzed.schema).to.have.property('field10.nested_field1').that.is.an('object').to.eql({});
      expect(analyzed.schema).to.have.property('field10.nested_field2').that.is.an('object').to.eql({});
      expect(analyzed.schema).to.have.property('field10.nested_field3').that.is.an('object').to.eql({ required: true, enum: [ 'K', 'UK' ] });

      expect(analyzed.schema).to.have.property('field11').that.is.an('object');
      expect(analyzed.schema.field11).to.have.property('required').that.is.a('function');
      expect(analyzed.schema.field11).to.have.property('enum').to.eql([ 'K', 'UK' ]);

      expect(analyzed.schema).to.have.property('field12').that.is.an('object');
      expect(analyzed.schema.field12).to.have.property('required').that.is.a('function');
      expect(analyzed.schema.field12).to.have.property('default', 'Unknow');
    });
  });
});