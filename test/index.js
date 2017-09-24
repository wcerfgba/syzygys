import Syzygys, { Config } from '../lib';
import { tmp, fs } from './support/util';

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

  describe('.prototype.getTemplatePaths', function () {
    it('returns an array of paths', function () {

    });
  });

  describe('.prototype.retrieveAllFeedItems', function () {
  
  });

  describe('.prototype.sortFeedItems', function () {
  
  });

  describe('.prototype.renderAllTemplatesWithFeedItemsToOutput', function () {
  
  });

  describe('.prototype.run', function () {
    // Acceptance test has a lot of setup, see `test/acceptance/`
  });
});
