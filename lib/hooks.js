'use strict';

const _ = require('lodash');
const helpers = require('./helpers');

function beforeHook(options) {
  if (options && options.before) {
    before((done) => {
      if (!_.isFunction(options.before)) return done('options.before must be a function');

      helpers.callback(options.before, done);
    });
  }
}

function afterHook(options) {
  if (options && options.after) {
    after((done) => {
      if (!_.isFunction(options.after)) return done('options.after must be a function');

      helpers.callback(options.after, done);
    });
  }
}

function beforeEachHook(options) {
  if (options && options.beforeEach) {
    beforeEach((done) => {
      if (!_.isFunction(options.beforeEach)) return done('options.beforeEach must be a function');

      helpers.callback(options.beforeEach, done);
    });
  }
}

function afterEachHook(options) {
  if (options && options.afterEach) {
    afterEach((done) => {
      if (!_.isFunction(options.afterEach)) return done('options.afterEach must be a function');

      helpers.callback(options.afterEach, done);
    });
  }
}

module.exports = {
  'before': beforeHook,
  'after': afterHook,
  'beforeEach': beforeEachHook,
  'afterEach': afterEachHook,
};
