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
      var _this = this;

      var templates = Syzygys.getTemplatePaths(this.config.templateDir).then(Syzygys.loadTemplates);
      var view = Syzygys.retrieveAllFeedItems(this.config.feeds).then(Syzygys.sortFeedItems).then(function (feedItems) {
        return Syzygys.limitCountOfFeedItems(feedItems, _this.config.feedItemCountLimit);
      }).then(function (feedItems) {
        return {
          feedItems: feedItems,
          feeds: _this.config.feeds
        };
      });
      return _util.Promise.join(templates, view, this.config.outputDir, Syzygys.renderTemplatesWithViewToOutput);
    }
  }], [{
    key: 'withConfig',
    value: function withConfig() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      (0, _util.log)('Have config');
      return new Syzygys({
        config: new _config2.default(config)
      });
    }
  }, {
    key: 'withConfigFile',
    value: function withConfigFile(configFile) {
      (0, _util.log)('Loading config file:', configFile);
      return _util.fs.readFileAsync(configFile).then(function (configBuffer) {
        return Syzygys.withConfig(JSON.parse(configBuffer));
      });
    }
  }, {
    key: 'getTemplatePaths',
    value: function getTemplatePaths(templateDir) {
      (0, _util.log)('Getting template paths');
      return _util.fs.readdirAsync(templateDir).map(function (templateFileName) {
        return _util.path.join(templateDir, templateFileName);
      });
    }
  }, {
    key: 'loadTemplates',
    value: function loadTemplates(templatePaths) {
      (0, _util.log)('Loading templates');
      return templatePaths.map(_template2.default.fromFile);
    }
  }, {
    key: 'retrieveAllFeedItems',
    value: function retrieveAllFeedItems(feeds) {
      return _util.Promise.resolve(feeds).map(function (feed) {
        (0, _util.log)('Retrieving feed:', feed.name);
        return feed.retrieve().catch(function (error) {
          (0, _util.log)(feed.name, ':', error);
          return [];
        });
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
    key: 'limitCountOfFeedItems',
    value: function limitCountOfFeedItems(feedItems, count) {
      return feedItems.slice(0, count);
    }
  }, {
    key: 'renderTemplatesWithViewToOutput',
    value: function renderTemplatesWithViewToOutput(templates, view, outputDir) {
      templates.forEach(function (templateP) {
        return templateP.then(function (template) {
          (0, _util.log)('Rendering template for output:', template.outputFileName);
          var rendered = template.render(view);
          var outputFilePath = _util.path.join(outputDir, template.outputFileName);
          _util.fs.writeFileAsync(outputFilePath, rendered);
        });
      });
    }
  }]);

  return Syzygys;
}();

exports.default = Syzygys;