import fetch from 'node-fetch';
import Syzygys, { Config, Feed, FeedItem, Template } from '../src';
import { tmp, fs, path, Promise, stub } from './support/util';

describe('Syzygys', function () {
  const validConfigAttrs = {
    feeds: [
      {
        name: 'Test Feed 1',
        description: '',
        tags: [],
        url: 'http://example.com/test1',
      },
      {
        name: 'Test Feed 2',
        description: '',
        tags: [],
        url: 'http://example.com/test2',
      },
    ],
    templateDir: './templates/',
    outputDir: './output/',
  };

  const templateFixtureDirPath = path.join(__dirname, 'fixture/template');
  const templateFixturePath = path.join(templateFixtureDirPath, 'index.html.mustache');

  describe('.withConfig', function () {
    it('creates a Syzygys instance with the given config', function () {
      const syzygys = Syzygys.withConfig(validConfigAttrs);

      syzygys.config.should.be.an.instanceof(Config);
      syzygys.config.should.deepEqual(new Config(validConfigAttrs));
    });
  });

  describe('.withConfigFile', function () {
    it('creates a Syzygys instance with the config in the given file', function () {
      const fileP = tmp.fileAsync();
      const writeP = fileP.then(file =>
        fs.writeFileAsync(file, JSON.stringify(validConfigAttrs)));
      return writeP.then(() => Syzygys.withConfigFile(fileP.value()))
        .then((syzygys) => {
          syzygys.config.should.be.an.instanceof(Config);
          syzygys.config.should.deepEqual(new Config(validConfigAttrs));
        });
    });
  });

  describe('.getTemplatePaths', function () {
    it('returns an array of Promises which resolve to Strings', function () {
      const templatePathsP = Syzygys.getTemplatePaths(templateFixtureDirPath);

      return templatePathsP.then((templatePaths) => {
        templatePaths.should.be.an.instanceof(Array);
        templatePaths.should.containEql(templateFixturePath);
      });
    });
  });

  describe('.loadTemplates', function () {
    it('returns and array of Promises which resolve to Templates', function () {
      const templatesP = Syzygys.loadTemplates(Promise.resolve([templateFixturePath]));

      return templatesP.then((templates) => {
        templates.should.be.an.instanceof(Array);
        templates[0].should.be.an.instanceof(Template);
      });
    });
  });

  describe('.retrieveAllFeedItems', function () {
    const originalFetchPromise = fetch.Promise;
    const feeds = validConfigAttrs.feeds.map(feedAttrs => new Feed(feedAttrs));
    
    before(function () {
      const fixtureOne =
        fs.readFileAsync(path.join(__dirname, '/fixture/feed/feed1.rss'))
          .then(fixtureData => ({
            ok: true,
            status: 200,
            statusText: 'OK',
            body: fixtureData,
            text: () => fixtureData,
          }));
      const fixtureTwo =
        fs.readFileAsync(path.join(__dirname, '/fixture/feed/feed2.rss'))
          .then(fixtureData => ({
            ok: true,
            status: 200,
            statusText: 'OK',
            body: fixtureData,
            text: () => fixtureData,
          }));
      stub(fetch, 'Promise')
        .returns(Promise.resolve(fixtureOne))
        .onFirstCall().returns(Promise.resolve(fixtureOne))
        .onSecondCall().returns(Promise.resolve(fixtureTwo));
    });

    after(function () {
      fetch.Promise = originalFetchPromise;
    });

    it('returns a Promise', function () {
      const feedItems = Syzygys.retrieveAllFeedItems(feeds);

      feedItems.should.be.an.Promise();
    });

    it('returns an array of FeedItems', function () {
      const feedItemsP = Syzygys.retrieveAllFeedItems(feeds);

      return feedItemsP.then((feedItems) => {
        feedItems.should.be.an.instanceof(Array);
        feedItems[0].should.be.an.instanceof(FeedItem);
      });
    });

    it('combines the feed items from all feeds', function () {
      const feedItemsP = Syzygys.retrieveAllFeedItems(feeds);

      return feedItemsP.then((feedItems) => {
        const first = feedItems[0];
        const last = feedItems.pop();
        first.title.should.equal('RSS Solutions for Restaurants');
        first.feed.name.should.equal('Test Feed 1');
        last.title.should.equal('RSS Solutions for Meteorologists');
        last.feed.name.should.equal('Test Feed 2');
      });
    });
  });

  describe('.sortFeedItems', function () {
    const feedItemsFixture = [
      new FeedItem({ title: 'Oldest', date: new Date('2017-04-20') }),
      new FeedItem({ title: 'Newest', date: new Date('2017-10-20') }),
      new FeedItem({ title: 'Middle', date: new Date('2017-06-20') }),
    ];

    it('sorts an array of FeedItems by time descending', function () {
      const sortedFeedItems = Syzygys.sortFeedItems(feedItemsFixture);

      sortedFeedItems[0].title.should.equal('Newest');
      sortedFeedItems[1].title.should.equal('Middle');
      sortedFeedItems[2].title.should.equal('Oldest');
    });
  });

  describe('.renderTemplatesWithViewToOutput', function () {
    
  });

  describe('.prototype.run', function () {
  });
});
