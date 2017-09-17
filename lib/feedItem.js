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
    this.date = date;
    this.feed = feed;
  }
}
