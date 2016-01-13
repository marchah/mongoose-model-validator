'use strict';

const _ = require('lodash');

function beforeHook(options) {
  if (options && options.before) {
    before((done) => {
      if (!_.isFunction(options.before)) return done('options.before must be a function');

      if ((options.before).length === 0) {
        options.before();
        done();
      }
      else {
        options.before(done);
      }
    });
  }
}

function afterHook(options) {
  if (options && options.after) {
    after((done) => {
      if (!_.isFunction(options.after)) return done('options.after must be a function');

      if ((options.after).length === 0) {
        options.after();
        done();
      }
      else {
        options.after(done);
      }
    });
  }
}

function beforeEachHook(options) {
  if (options && options.beforeEach) {
    beforeEach((done) => {
      if (!_.isFunction(options.beforeEach)) return done('options.beforeEach must be a function');

      if ((options.beforeEach).length === 0) {
        options.beforeEach();
        done();
      }
      else {
        options.beforeEach(done);
      }
    });
  }
}

function afterEachHook(options) {
  if (options && options.afterEach) {
    afterEach((done) => {
      if (!_.isFunction(options.afterEach)) return done('options.afterEach must be a function');

      if ((options.afterEach).length === 0) {
        options.afterEach();
        done();
      }
      else {
        options.afterEach(done);
      }
    });
  }
}

module.exports = {
  'before': beforeHook,
  'after': afterHook,
  'beforeEach': beforeEachHook,
  'afterEach': afterEachHook,
};
