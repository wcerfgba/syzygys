import Mustache from 'mustache';
import { fs } from './util';

export default class Template {
  constructor({
    templateData,
    templateFormat,
  }) {
    this.templateData = templateData;
    this.templateFormat = templateFormat;
  }

  render(view) {
    return Mustache.render(this.templateData, view, null);
  }

  static fromFile(fileName) {
    return fs.readFileAsync(fileName)
      .then(templateData => new Template({
        templateData,
        templateFormat: 'mustache',
      }));
  }
}
