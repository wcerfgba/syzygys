import fetch from 'node-fetch';
import { fs, path, stub } from './support/util';
import { Feed, FeedItem } from '../lib';

describe('Feed', function () {
  const validAttrs = {
    name: 'Test Feed',
    url: 'http://example.com/feed',
    description: 'A test feed',
    tags: ['test'],
  };

  const invalidUrlAttrs = {
    name: 'Test Feed with invalid URL',
    url: 'sgssdfsdxample.csdfsdfom/notafeed',
  };

  const missingUrlAttrs = {
    name: 'Just name',
  };

  it('has a name', function () {
    const feed = new Feed(validAttrs);

    feed.should.have.property('name').which.is.a.String();
  });

  it('has a url', function () {
    const feed = new Feed(validAttrs);

    feed.should.have.property('url').which.is.a.String();
  });

  it('has a description', function () {
    const feed = new Feed(validAttrs);

    feed.should.have.property('description').which.is.a.String();
  });

  it('has tags', function () {
    const feed = new Feed(validAttrs);

    feed.should.have.property('tags').which.is.an.Array();
  });

  it('can be retrieved', function () {
    const feed = new Feed(validAttrs);

    feed.should.have.property('retrieve').which.is.a.Function();
  });

  describe('#retrieve', function () {
    it('returns a Promise', function () {
      const feed = new Feed(validAttrs);
      const feedItems = feed.retrieve();

      return feedItems.should.be.a.Promise();
    });

    context('invalid url', function () {
      it('rejects with an error', function () {
        const feed = new Feed(invalidUrlAttrs);
        const feedItems = feed.retrieve();

        return feedItems.should.be.rejectedWith(Error);
      });
    });

    context('missing url', function () {
      it('rejects with an error', function () {
        const feed = new Feed(missingUrlAttrs);
        const feedItems = feed.retrieve();

        return feedItems.should.be.rejectedWith(Error);
      });
    });

    context('network problem', function () {
      const originalFetchPromise = fetch.Promise;

      before(function () {
        // Stubbing out Promise instead of fetch directly is grim but I couldn't
        // get stubbing out `fetch, 'default'` with
        // `import * as fetch from 'node-fetch'` to work.
        stub(fetch, 'Promise').rejects(new Error('Network error'));
      });

      after(function () {
        fetch.Promise = originalFetchPromise;
      });

      it('rejects with an error', function () {
        const feed = new Feed(validAttrs);
        const feedItems = feed.retrieve();

        return feedItems.should.be.rejectedWith(new Error('Network error'));
      });
    });

    context('valid url', function () {
      const originalFetchPromise = fetch.Promise;

      before(function () {
        const fixture =
          fs.readFileAsync(path.join(__dirname, '/fixture/feed.rss'))
            .then(fixtureData => ({
              ok: true,
              status: 200,
              statusText: 'OK',
              body: fixtureData,
            }));
        stub(fetch, 'Promise').resolves(fixture);
      });

      after(function () {
        fetch.Promise = originalFetchPromise;
      });

      it('fulfilled with an array of feedItems', function () {
        const feed = new Feed(validAttrs);
        const feedItems = feed.retrieve();

        return feedItems.should.be.fulfilled()
          .then((result) => {
            result.should.be.Array();
            result[0].should.be.an.instanceof(FeedItem);
          });
      });
    });
  });
});
