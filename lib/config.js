import { fs } from './util';

export function Config({ feeds = [], templatePaths = [] } = {}) {
  this.feeds = feeds;
  this.templatePaths = templatePaths;
}

Config.fromFile = function (fileName) {
  return fs.readFileAsync(fileName, 'utf8')
           .then(JSON.parse)
           .then((attrs) => new Config(attrs));
};