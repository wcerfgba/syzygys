import { Template, FeedItem } from '../lib';
import { fs, tmp } from './support/util';

describe('Template', function () {
  const templateFixture = `
  {{#feedItems}}
  {{title}}
  {{/feedItems}}
  `;

  describe('.prototype.render', function () {
    const feedItemsFixture = {
      feedItems: [
        new FeedItem({ title: 'first' }),
        new FeedItem({ title: 'second' }),
        new FeedItem({ title: 'third' }),
      ],
    };
    const renderResultFixture = `
  first
  second
  third
  `;

    it('correctly renders the fixture', function () {
      const template = new Template({ templateData: templateFixture, templateFormat: 'mustache' });
      const renderResult = template.render(feedItemsFixture);

      renderResult.should.equal(renderResultFixture);
    });
  });

  describe('.fromFile', function () {
    it('return a valid Template', function () {
      return tmp.fileAsync()
        .bind({})
        .then(function (file) {
          this.file = file;
          return fs.writeFileAsync(file, templateFixture);
        })
        .then(function () { return Template.fromFile(this.file); })
        .then((template) => {
          template.should.be.instanceof(Template);
          template.templateData.should.equal(templateFixture);
          template.templateFormat.should.equal('mustache');
        });
    });
  });
});
