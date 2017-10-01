'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Moment = exports.log = exports.sanitizeHtml = exports.fetch = exports.FeedParser = exports.path = exports.fs = exports.Readable = exports.Promise = undefined;

var _stream = require('stream');

Object.defineProperty(exports, 'Readable', {
  enumerable: true,
  get: function get() {
    return _stream.Readable;
  }
});

var _feedparser = require('feedparser');

Object.defineProperty(exports, 'FeedParser', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_feedparser).default;
  }
});

var _nodeFetch = require('node-fetch');

Object.defineProperty(exports, 'fetch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_nodeFetch).default;
  }
});

var _moment = require('moment');

Object.defineProperty(exports, 'Moment', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_moment).default;
  }
});

var _bluebird = require('bluebird');

var Promise = _interopRequireWildcard(_bluebird);

var _fs = require('fs');

var originalFs = _interopRequireWildcard(_fs);

var _path = require('path');

var originalPath = _interopRequireWildcard(_path);

var _sanitizeHtml = require('sanitize-html');

var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Promise = Promise;
var fs = exports.fs = Promise.promisifyAll(originalFs);
var path = exports.path = Promise.promisifyAll(originalPath);
var sanitizeHtml = exports.sanitizeHtml = function sanitizeHtml(html) {
  return (0, _sanitizeHtml2.default)(html, {
    allowedTags: _sanitizeHtml2.default.defaults.allowedTags,
    parser: {
      decodeEntities: true
    }
  });
};
var log = exports.log = console.log;