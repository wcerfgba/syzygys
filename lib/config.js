import { fs } from './util';

export default class Config {
  constructor({
    feeds = [],
    templatesDir,
    outputDir,
  } = {}) {
    this.feeds = feeds;
    this.templatesDir = templatesDir;
    this.outputDir = outputDir;
  }

  static fromFile(fileName) {
    return fs.readFileAsync(fileName, 'utf8')
      .then(JSON.parse)
      .then(attrs => new Config(attrs));
  }
}
