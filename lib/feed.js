'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('./util');

var _ = require('./');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Feed = function () {
  function Feed() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        url = _ref.url,
        name = _ref.name,
        description = _ref.description,
        _ref$tags = _ref.tags,
        tags = _ref$tags === undefined ? [] : _ref$tags;

    _classCallCheck(this, Feed);

    this.url = url;
    this.name = name;
    this.description = description;
    this.tags = tags;
  }

  _createClass(Feed, [{
    key: 'retrieve',
    value: function retrieve() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var feedItems = [];
        var feedParser = new _util.FeedParser();

        feedParser.on('readable', function () {
          var post = feedParser.read();
          if (!post) return;
          feedItems.push(new _.FeedItem({
            title: post.title,
            summary: (0, _util.sanitizeHtml)(post.description || post.summary),
            url: post.origLink || post.link,
            date: post.date,
            feed: _this
          }));
        });

        feedParser.on('error', function (error) {
          return reject(error);
        });

        feedParser.on('end', function () {
          return resolve(feedItems);
        });

        (0, _util.fetch)(_this.url).then(function (res) {
          if (!res.ok) throw new Error('Response error: ' + res.status + ' - ' + res.statusText);
          return res.text();
        }).then(function (feedBody) {
          var resStream = new _util.Readable();
          resStream.pipe(feedParser);
          resStream.push(feedBody);
          resStream.push(null);
        }).catch(function (error) {
          return reject(error);
        });
      });
    }
  }]);

  return Feed;
}();

exports.default = Feed;