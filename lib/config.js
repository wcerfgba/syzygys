'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('./util');

var _ = require('.');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = function () {
  function Config() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$feeds = _ref.feeds,
        feeds = _ref$feeds === undefined ? [] : _ref$feeds,
        templateDir = _ref.templateDir,
        outputDir = _ref.outputDir,
        _ref$feedItemCountLim = _ref.feedItemCountLimit,
        feedItemCountLimit = _ref$feedItemCountLim === undefined ? Number.MAX_SAFE_INTEGER : _ref$feedItemCountLim;

    _classCallCheck(this, Config);

    this.feeds = feeds.map(function (attrs) {
      return new _.Feed(attrs);
    });
    this.templateDir = templateDir;
    this.outputDir = outputDir;
    this.feedItemCountLimit = feedItemCountLimit;
  }

  _createClass(Config, null, [{
    key: 'fromFile',
    value: function fromFile(fileName) {
      return _util.fs.readFileAsync(fileName, 'utf8').then(JSON.parse).then(function (attrs) {
        return new Config(attrs);
      });
    }
  }]);

  return Config;
}();

exports.default = Config;