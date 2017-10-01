'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('./util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FeedItem = function () {
  function FeedItem() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        title = _ref.title,
        url = _ref.url,
        summary = _ref.summary,
        date = _ref.date,
        feed = _ref.feed;

    _classCallCheck(this, FeedItem);

    this.title = title;
    this.url = url;
    this.summary = summary;
    this.date = FeedItem.buildDate(date);
    this.feed = feed;
  }

  _createClass(FeedItem, null, [{
    key: 'buildDate',
    value: function buildDate(date) {
      var moment = (0, _util.Moment)(date);
      return {
        toISOString: moment.toISOString(),
        toString: moment.toString(),
        toObject: moment.toObject()
      };
    }
  }]);

  return FeedItem;
}();

exports.default = FeedItem;