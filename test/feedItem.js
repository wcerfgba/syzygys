import { FeedItem, Feed } from '../src/';

describe('FeedItem', function () {
  const validAttrs = {
    title: 'Test Feed Item',
    url: 'http://www.example.com/test-feed-item',
    summary: 'This is the summary for a test feed item.',
    date: new Date(),
    feed: new Feed(),
  };
  const feedItem = new FeedItem(validAttrs);

  it('has a title', function () {
    feedItem.should.have.property('title').which.is.a.String();
  });

  it('has a url', function () {
    feedItem.should.have.property('url').which.is.a.String();
  });

  it('has a summary', function () {
    feedItem.should.have.property('summary').which.is.a.String();
  });

  it('has a date', function () {
    feedItem.should.have.property('date');
  });

  describe('.date', function () {
    it('is an Object', function () {
      feedItem.date.should.be.an.Object();
    });

    it('has a toString', function () {
      feedItem.date.should.have.property('toString').which.is.a.String();
    });

    it('has a toISOString', function () {
      feedItem.date.should.have.property('toISOString').which.is.a.String();
    });

    it('has a toObject', function () {
      feedItem.date.should.have.property('toObject').which.is.an.Object();
    });
  });

  it('has a feed', function () {
    feedItem.should.have.property('feed').which.is.an.instanceof(Feed);
  });
});
