'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mustache = require('mustache');

var _mustache2 = _interopRequireDefault(_mustache);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Template = function () {
  function Template() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        templateData = _ref.templateData,
        templateFormat = _ref.templateFormat,
        outputFileName = _ref.outputFileName;

    _classCallCheck(this, Template);

    this.templateData = templateData;
    this.templateFormat = templateFormat;
    this.outputFileName = outputFileName;
  }

  _createClass(Template, [{
    key: 'render',
    value: function render(view) {
      return _mustache2.default.render(this.templateData, view, null);
    }
  }], [{
    key: 'fromFile',
    value: function fromFile(fileName) {
      return _util.fs.readFileAsync(fileName).then(function (templateData) {
        return new Template({
          templateData: templateData.toString(),
          templateFormat: 'mustache',
          outputFileName: Template.outputFileName(fileName, 'mustache')
        });
      });
    }
  }, {
    key: 'outputFileName',
    value: function outputFileName(templateFileName, templateFormat) {
      var fileNameMatches = templateFileName.split(_util.path.sep).pop().match('^(.*)\\.' + templateFormat + '$');
      return !fileNameMatches ? '' : fileNameMatches[1];
    }
  }]);

  return Template;
}();

exports.default = Template;