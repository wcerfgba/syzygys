import { FeedItem, Feed } from '../lib/';

describe('FeedItem', function () {
  const validAttrs = {
    title: 'Test Feed Item',
    url: 'http://www.example.com/test-feed-item',
    summary: 'This is the summary for a test feed item.',
    date: new Date(),
    feed: new Feed(),
  };

  it('has a title', function () {
    const feedItem = new FeedItem(validAttrs);

    feedItem.should.have.property('title').which.is.a.String();
  });

  it('has a url', function () {
    const feedItem = new FeedItem(validAttrs);

    feedItem.should.have.property('url').which.is.a.String();
  });

  it('has a summary', function () {
    const feedItem = new FeedItem(validAttrs);

    feedItem.should.have.property('summary').which.is.a.String();
  });

  it('has a date', function () {
    const feedItem = new FeedItem(validAttrs);

    feedItem.should.have.property('date').which.is.a.Date();
  });

  it('has a feed', function () {
    const feedItem = new FeedItem(validAttrs);

    feedItem.should.have.property('feed').which.is.an.instanceof(Feed);
  });
});
