import Config from './config';
import Feed from './feed';
import FeedItem from './feedItem';
import Template from './template';
import { fs, path, Promise, log } from './util';

export { Config, Feed, FeedItem, Template };

export default class Syzygys {
  constructor({
    config = {},
  } = {}) {
    this.config = config;
  }

  static withConfig(config = {}) {
    log('Have config');
    return new Syzygys({
      config: new Config(config),
    });
  }

  static withConfigFile(configFile) {
    log('Loading config file:', configFile);
    return fs.readFileAsync(configFile)
      .then(configBuffer => Syzygys.withConfig(JSON.parse(configBuffer)));
  }

  run() {
    const templates = Syzygys.getTemplatePaths(this.config.templateDir)
      .then(Syzygys.loadTemplates);
    const view = Syzygys.retrieveAllFeedItems(this.config.feeds)
      .then(Syzygys.sortFeedItems)
      .then(feedItems => Syzygys.limitCountOfFeedItems(feedItems, this.config.feedItemCountLimit))
      .then(feedItems => ({
        feedItems,
        feeds: this.config.feeds,
      }));
    return Promise.join(
      templates, view, this.config.outputDir,
      Syzygys.renderTemplatesWithViewToOutput,
    );
  }

  static getTemplatePaths(templateDir) {
    log('Getting template paths');
    return fs.readdirAsync(templateDir)
      .map(templateFileName => path.join(templateDir, templateFileName));
  }

  static loadTemplates(templatePaths) {
    log('Loading templates');
    return templatePaths.map(Template.fromFile);
  }

  static retrieveAllFeedItems(feeds) {
    return Promise.resolve(feeds)
      .map((feed) => {
        log('Retrieving feed:', feed.name);
        return feed.retrieve()
          .catch((error) => {
            log(feed.name, ':', error);
            return [];
          });
      })
      .reduce((acc, curr) => acc.concat(curr), []);
  }

  static sortFeedItems(feedItems) {
    return feedItems.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  static limitCountOfFeedItems(feedItems, count) {
    return feedItems.slice(0, count);
  }

  static renderTemplatesWithViewToOutput(templates, view, outputDir) {
    fs.mkdirAsync(outputDir)
      .catch(() => {})
      .then(() => templates.forEach(templateP => templateP.then((template) => {
        log('Rendering template for output:', template.outputFileName);
        const rendered = template.render(view);
        const outputFilePath = path.join(outputDir, template.outputFileName);
        fs.writeFileAsync(outputFilePath, rendered);
      })));
  }
}
