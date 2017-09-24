import Syzygys from '../lib';

Syzygys.withConfig({
  feeds: [
    {
      name: 'Pony Foo',
      url: 'https://feeds.feedburner.com/ponyfoo',
      tags: ['js'],
    },
    {
      name: 'Julia Evans',
      url: 'https://jvns.ca/atom.xml',
      tags: ['linux', 'networking'],
    },
  ],
  templateDir: './templates/',
  outputDir: './output/',
}).run();
