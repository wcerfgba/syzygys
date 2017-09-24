import { fetch, sanitizeHtml, Readable, FeedParser } from './util';
import { FeedItem } from './';

export default class Feed {
  constructor({
    url,
    name,
    description,
    tags = [],
  } = {}) {
    this.url = url;
    this.name = name;
    this.description = description;
    this.tags = tags;
  }

  retrieve() {
    return new Promise((resolve, reject) => {
      const feedItems = [];
      const feedParser = new FeedParser();

      feedParser.on('readable', () => {
        const post = feedParser.read();
        if (!post) return;
        feedItems.push(new FeedItem({
          title: post.title,
          summary: sanitizeHtml(post.description || post.summary),
          url: post.origLink || post.link,
          date: post.date,
          feed: this,
        }));
      });

      feedParser.on('error', error => reject(error));

      feedParser.on('end', () => resolve(feedItems));

      fetch(this.url)
        .then((res) => {
          if (!res.ok) throw new Error(`Response error: ${res.status} - ${res.statusText}`);
          return res.text();
        })
        .then((feedBody) => {
          const resStream = new Readable();
          resStream.pipe(feedParser);
          resStream.push(feedBody);
          resStream.push(null);
        })
        .catch(error => reject(error));
    });
  }
}
