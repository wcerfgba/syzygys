import { Moment } from './util';

export default class FeedItem {
  constructor({
    title,
    url,
    summary,
    date,
    feed,
  } = {}) {
    this.title = title;
    this.url = url;
    this.summary = summary;
    this.date = FeedItem.buildDate(date);
    this.feed = feed;
  }

  static buildDate(date) {
    const moment = Moment(date);
    return {
      toISOString: moment.toISOString(),
      toString: moment.toString(),
      toObject: moment.toObject(),
    };
  }
}
