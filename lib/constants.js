'use strict';

/**
 * Plugins values
 * @type {String}
 */
const PLUGIN_CREATOR = 'creator';
const PLUGIN_ELASTIC = 'elastic';
const PLUGIN_FILE = 'file';
const PLUGIN_TIMESTAMP = 'timestamp';
const PLUGIN_UNIQUE = 'unique';

const PLUGIN = {
  'CREATOR': PLUGIN_CREATOR,
  'ELASTIC': PLUGIN_ELASTIC,
  'FILE': PLUGIN_FILE,
  'TIMESTAMP': PLUGIN_TIMESTAMP,
  'UNIQUE': PLUGIN_UNIQUE,

  'ALL': [
    PLUGIN_CREATOR,
    PLUGIN_ELASTIC,
    PLUGIN_FILE,
    PLUGIN_TIMESTAMP,
    PLUGIN_UNIQUE,
  ],
};

module.exports = {
  'PLUGIN': PLUGIN,
  'COUNT_DEFAULT_VIRTUAL_FIELDS': 1,
  'HASH_LENGTH': 60,
  'TOKEN_LENGTH': 40,
  'IGNORED_FIELD': {
    'ALL': ['_id', '__v'],
  },
  'IGNORED_VIRTUAL_FIELD': {
    'ALL': ['id'],
  },
  VALIDATOR: {
    'SCHEMA': {
      'ALL': ['required', 'unique', 'default', 'enum', 'min', 'max', 'minlength', 'maxlength', 'custom'],
    },

    'ALL': ['modelName', 'plugins', 'schema', 'virtualFields', 'methods', 'statics', 'events'],
  }
  
};
