'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Template = exports.FeedItem = exports.Feed = exports.Config = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _feed = require('./feed');

var _feed2 = _interopRequireDefault(_feed);

var _feedItem = require('./feedItem');

var _feedItem2 = _interopRequireDefault(_feedItem);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.Config = _config2.default;
exports.Feed = _feed2.default;
exports.FeedItem = _feedItem2.default;
exports.Template = _template2.default;

var Syzygys = function () {
  function Syzygys() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$config = _ref.config,
        config = _ref$config === undefined ? {} : _ref$config;

    _classCallCheck(this, Syzygys);

    this.config = config;
  }

  _createClass(Syzygys, [{
    key: 'run',
    value: function run() {
      var templates = Syzygys.getTemplatePaths(this.config.templateDir).then(Syzygys.loadTemplates);
      var feedItems = Syzygys.retrieveAllFeedItems(this.config.feeds).then(Syzygys.sortFeedItems);
      return _util.Promise.join(templates, feedItems, this.config.outputDir, Syzygys.renderTemplatesWithFeedItemsToOutput);
    }
  }], [{
    key: 'withConfig',
    value: function withConfig() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new Syzygys({
        config: new _config2.default(config)
      });
    }
  }, {
    key: 'withConfigFile',
    value: function withConfigFile(configFile) {
      return _util.fs.readFileAsync(configFile).then(function (configBuffer) {
        return Syzygys.withConfig(JSON.parse(configBuffer));
      });
    }
  }, {
    key: 'getTemplatePaths',
    value: function getTemplatePaths(templateDir) {
      return _util.fs.readdirAsync(templateDir).map(function (templateFileName) {
        return _util.path.join(templateDir, templateFileName);
      });
    }
  }, {
    key: 'loadTemplates',
    value: function loadTemplates(templatePaths) {
      return templatePaths.map(_template2.default.fromFile);
    }
  }, {
    key: 'retrieveAllFeedItems',
    value: function retrieveAllFeedItems(feeds) {
      return _util.Promise.resolve(feeds).map(function (feed) {
        return feed.retrieve();
      }).reduce(function (acc, curr) {
        return acc.concat(curr);
      }, []);
    }
  }, {
    key: 'sortFeedItems',
    value: function sortFeedItems(feedItems) {
      return feedItems.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
    }
  }, {
    key: 'renderTemplatesWithFeedItemsToOutput',
    value: function renderTemplatesWithFeedItemsToOutput(templates, feedItems, outputDir) {
      templates.forEach(function (templateP) {
        return templateP.then(function (template) {
          var rendered = template.render({ feedItems: feedItems });
          var outputFilePath = _util.path.join(outputDir, template.outputFileName);
          _util.fs.writeFileAsync(outputFilePath, rendered);
        });
      });
    }
  }]);

  return Syzygys;
}();

exports.default = Syzygys;