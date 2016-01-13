'use strict';

const expect = require('chai').expect;
const rewire = require("rewire");

const helpers = rewire('../lib/helpers.js');

const Model1 = require('./model1.js');
const Model2 = require('./model2.js');

describe('Helpers ->', () => {
  describe('Get Schema -> ', () => {
    it('should return schema');
  });
  describe('Get Required Fields -> ', () => {
    it('should return required fields');
  });
  describe('Get Virtual Fields -> ', () => {
    it('should return virtual fields');
  });
  describe('Get Methods -> ', () => {
    it('should return methods');
  });
  describe('Get Statics -> ', () => {
    it('should return statics');
  });
  describe('Callback', () => {
    it('should call done', (done) => {
      helpers.callback(() => {
        expect(true).to.be.true;
      }, done);
    });
    it('should call done', (done) => {
      helpers.callback((done2) => {
        expect(done2).to.be.a('function');
        done2();
      }, done);
    });
  });
});