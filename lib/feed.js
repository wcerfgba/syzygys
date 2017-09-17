import { Readable } from 'stream';
import fetch from 'node-fetch';
import FeedParser from 'feedparser';
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
        let post = feedParser.read();
        while (post) {
          feedItems.push(new FeedItem({
            title: post.title,
            summary: post.summary,
            url: post.url,
            date: post.date,
            feed: this,
          }));
          post = feedParser.read();
        }
      });

      feedParser.on('error', error => reject(error));

      feedParser.on('end', () => resolve(feedItems));

      fetch(this.url)
        .then((res) => {
          if (!res.ok) throw new Error(`Response error: ${res.status} - ${res.statusText}`);

          const resStream = new Readable();
          resStream.pipe(feedParser);
          resStream.push(res.body);
          resStream.push(null);
        })
        .catch(error => reject(error));
    });
  }
}
