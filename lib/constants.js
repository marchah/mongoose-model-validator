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
const PLUGIN_VERSION = 'version';
const PLUGIN_INCREMENT = 'increment';
const PLUGIN_DATA = 'data';
const PLUGIN_PAGINATE = 'paginate';
const PLUGIN_PERMISSION = 'permissions';

const PLUGIN = {
  'CREATOR': PLUGIN_CREATOR,
  'ELASTIC': PLUGIN_ELASTIC,
  'FILE': PLUGIN_FILE,
  'TIMESTAMP': PLUGIN_TIMESTAMP,
  'UNIQUE': PLUGIN_UNIQUE,
  'VERSION': PLUGIN_VERSION,
  'INCREMENT': PLUGIN_INCREMENT,
  'DATA': PLUGIN_DATA,
  'PAGINATE': PLUGIN_PAGINATE,
  'PERMISSION': PLUGIN_PERMISSION,

  'ALL': [
    PLUGIN_CREATOR,
    PLUGIN_ELASTIC,
    PLUGIN_FILE,
    PLUGIN_TIMESTAMP,
    PLUGIN_UNIQUE,
    PLUGIN_VERSION,
    PLUGIN_INCREMENT,
    PLUGIN_DATA,
    PLUGIN_PAGINATE,
    PLUGIN_PERMISSION,
  ],
};

/**
 * Schema Validator values
 * @type {String}
 */

const SCHEMA_VALIDATOR_REQUIRED = 'required';
const SCHEMA_VALIDATOR_UNIQUE = 'unique';
const SCHEMA_VALIDATOR_DEFAULT = 'default';
const SCHEMA_VALIDATOR_ENUM = 'enum';
const SCHEMA_VALIDATOR_MIN = 'min';
const SCHEMA_VALIDATOR_MAX = 'max';
const SCHEMA_VALIDATOR_MINLENGTH = 'minlength';
const SCHEMA_VALIDATOR_MAXLENGTH= 'maxlength';
const SCHEMA_VALIDATOR_CUSTOM = 'custom';

const SCHEMA_VALIDATOR = {
  'REQUIRED': SCHEMA_VALIDATOR_REQUIRED,
  'UNIQUE': SCHEMA_VALIDATOR_UNIQUE,
  'DEFAULT': SCHEMA_VALIDATOR_DEFAULT,
  'ENUM': SCHEMA_VALIDATOR_ENUM,
  'MIN': SCHEMA_VALIDATOR_MIN,
  'MAX': SCHEMA_VALIDATOR_MAX,
  'MINLENGTH': SCHEMA_VALIDATOR_MINLENGTH,
  'MAXLENGTH': SCHEMA_VALIDATOR_MAXLENGTH,
  'CUSTOM': SCHEMA_VALIDATOR_CUSTOM,

  'ALL': [
    SCHEMA_VALIDATOR_REQUIRED,
    SCHEMA_VALIDATOR_UNIQUE,
    SCHEMA_VALIDATOR_DEFAULT,
    SCHEMA_VALIDATOR_ENUM,
    SCHEMA_VALIDATOR_MIN,
    SCHEMA_VALIDATOR_MAX,
    SCHEMA_VALIDATOR_MINLENGTH,
    SCHEMA_VALIDATOR_MAXLENGTH,
    SCHEMA_VALIDATOR_CUSTOM,
  ],
};

/**
 * Validator values
 * @type {String}
 */

const VALIDATOR_MODEL_NAME = 'modelName';
const VALIDATOR_PLUGINS = 'plugins';
const VALIDATOR_SCHEMA = 'schema';
const VALIDATOR_VIRTUAL_FIELDS = 'virtualFields';
const VALIDATOR_METHODS = 'methods';
const VALIDATOR_STATICS = 'statics';
const VALIDATOR_EVENTS = 'events';

const VALIDATOR = {
  'MODEL_NAME': VALIDATOR_MODEL_NAME,
  'PLUGINS': VALIDATOR_PLUGINS,
  'SCHEMA': VALIDATOR_SCHEMA,
  'VIRTUAL_FIELDS': VALIDATOR_VIRTUAL_FIELDS,
  'METHODS': VALIDATOR_METHODS,
  'STATICS': VALIDATOR_STATICS,
  'EVENTS': VALIDATOR_EVENTS,

  'ALL': [
    VALIDATOR_MODEL_NAME,
    VALIDATOR_PLUGINS,
    VALIDATOR_SCHEMA,
    VALIDATOR_VIRTUAL_FIELDS,
    VALIDATOR_METHODS,
    VALIDATOR_STATICS,
    VALIDATOR_EVENTS,
  ],
};

module.exports = {
  'PLUGIN': PLUGIN,
  'IGNORED_FIELD': {
    'ALL': ['_id', '__v'],
  },
  'IGNORED_VIRTUAL_FIELD': {
    'ALL': ['id'],
  },

  'SCHEMA_VALIDATOR': SCHEMA_VALIDATOR,
  'VALIDATOR': VALIDATOR,
};
