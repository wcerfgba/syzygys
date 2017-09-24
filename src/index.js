import Config from './config';
import Feed from './feed';
import FeedItem from './feedItem';
import Template from './template';
import { fs, path, Promise } from './util';

export { Config, Feed, FeedItem, Template };

export default class Syzygys {
  constructor({
    config = {},
  } = {}) {
    this.config = config;
  }

  static withConfig(config = {}) {
    return new Syzygys({
      config: new Config(config),
    });
  }

  static withConfigFile(configFile) {
    return fs.readFileAsync(configFile)
      .then(configBuffer => Syzygys.withConfig(JSON.parse(configBuffer)));
  }

  run() {
    const templates = Syzygys.getTemplatePaths(this.config.templateDir)
      .then(Syzygys.loadTemplates);
    const feedItems = Syzygys.retrieveAllFeedItems(this.config.feeds)
      .then(Syzygys.sortFeedItems);
    return Promise.join(
      templates, feedItems, this.config.outputDir,
      Syzygys.renderTemplatesWithFeedItemsToOutput,
    );
  }

  static getTemplatePaths(templateDir) {
    return fs.readdirAsync(templateDir)
      .map(templateFileName => path.join(templateDir, templateFileName));
  }

  static loadTemplates(templatePaths) {
    return templatePaths.map(Template.fromFile);
  }

  static retrieveAllFeedItems(feeds) {
    return Promise.resolve(feeds)
      .map(feed => feed.retrieve())
      .reduce((acc, curr) => acc.concat(curr), []);
  }

  static sortFeedItems(feedItems) {
    return feedItems.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  static renderTemplatesWithFeedItemsToOutput(templates, feedItems, outputDir) {
    templates.forEach(templateP => templateP.then((template) => {
      const rendered = template.render({ feedItems });
      const outputFilePath = path.join(outputDir, template.outputFileName);
      fs.writeFileAsync(outputFilePath, rendered);
    }));
  }
}
