import { fs, tmp } from './support/util';
import { Config, Feed } from '../lib/';

describe('Config', function () {
  const validAttrs = {
    feeds: [],
    templateDir: '',
    outputDir: '',
  };

  it('has feeds', function () {
    const config = new Config(validAttrs);

    config.should.have.property('feeds').which.is.an.Array();
  });

  context('with plain Objects for feeds', function () {
    const plainObjectFeedAttrs = {
      feeds: [
        {
          name: 'Test Feed 1',
        },
        {
          name: 'Test Feed 2',
        },
      ],
    };

    it('constructs Feed objects', function () {
      const config = new Config(plainObjectFeedAttrs);

      config.feeds[0].should.be.an.instanceof(Feed);
      config.feeds[1].should.be.an.instanceof(Feed);
    });
  });

  it('has templateDir', function () {
    const config = new Config(validAttrs);

    config.should.have.property('templateDir').which.is.a.String();
  });

  describe('.fromFile', function () {
    it('creates a Config from a file containing JSON', function () {
      const validConfig = new Config(validAttrs);
      return tmp.fileAsync()
        .bind({})
        .then(function (file) {
          this.file = file;
          return fs.writeFileAsync(file, JSON.stringify(validConfig));
        })
        .then(function () { return Config.fromFile(this.file); })
        .then(config => config.should.deepEqual(validConfig));
    });
  });
});
