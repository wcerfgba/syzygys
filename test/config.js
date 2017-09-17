import { describe, it, fs, tmp } from './support/util';
import { Config } from '../lib/';

describe('Config', function () {
  const validAttrs = {
    feeds: [],
    templatePaths: [],
  };

  it('has feeds', function () {
    const config = new Config(validAttrs);

    config.should.have.property('feeds').which.is.an.Array();
  });

  it('has templatePaths', function () {
    const config = new Config(validAttrs);

    config.should.have.property('templatePaths').which.is.an.Array();
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
