import { fs } from './util';
import { Feed } from '.';

export default class Config {
  constructor({
    feeds = [],
    templateDir,
    outputDir,
  } = {}) {
    this.feeds = feeds.map(attrs => new Feed(attrs));
    this.templateDir = templateDir;
    this.outputDir = outputDir;
  }

  static fromFile(fileName) {
    return fs.readFileAsync(fileName, 'utf8')
      .then(JSON.parse)
      .then(attrs => new Config(attrs));
  }
}
