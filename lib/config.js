import { fs } from './util';

export default class Config {
  constructor({ feeds = [], templatePaths = [] } = {}) {
    this.feeds = feeds;
    this.templatePaths = templatePaths;
  }

  static fromFile(fileName) {
    return fs.readFileAsync(fileName, 'utf8')
      .then(JSON.parse)
      .then(attrs => new Config(attrs));
  }
}
