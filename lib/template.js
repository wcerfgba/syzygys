import Mustache from 'mustache';
import { fs, path } from './util';

export default class Template {
  constructor({
    templateData,
    templateFormat,
    outputFileName,
  } = {}) {
    this.templateData = templateData;
    this.templateFormat = templateFormat;
    this.outputFileName = outputFileName;
  }

  render(view) {
    return Mustache.render(this.templateData, view, null);
  }

  static fromFile(fileName) {
    return fs.readFileAsync(fileName)
      .then(templateData => new Template({
        templateData: templateData.toString(),
        templateFormat: 'mustache',
        outputFileName: Template.outputFileName(fileName, 'mustache'),
      }));
  }

  static outputFileName(templateFileName, templateFormat) {
    const fileNameMatches = templateFileName.split(path.sep)
      .pop()
      .match(`^(.*)\\.${templateFormat}$`);
    return !fileNameMatches ? '' : fileNameMatches[1];
  }
}
