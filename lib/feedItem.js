"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FeedItem = function FeedItem() {
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
  this.date = date;
  this.feed = feed;
};

exports.default = FeedItem;