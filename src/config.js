import { fs } from './util';
import { Feed } from '.';

export default class Config {
  constructor({
    feeds = [],
    templateDir,
    outputDir,
    feedItemCountLimit = Number.MAX_SAFE_INTEGER,
  } = {}) {
    this.feeds = feeds.map(attrs => new Feed(attrs));
    this.templateDir = templateDir;
    this.outputDir = outputDir;
    this.feedItemCountLimit = feedItemCountLimit;
  }

  static fromFile(fileName) {
    return fs.readFileAsync(fileName, 'utf8')
      .then(JSON.parse)
      .then(attrs => new Config(attrs));
  }
}
