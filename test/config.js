import { fs, tmp } from './support/util';
import { Config } from '../lib/';

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
