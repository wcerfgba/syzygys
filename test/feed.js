import './support/util'

import { Feed } from '../lib/';

describe('Feed', function () {

  it('has a name', function () {
    feed = new Feed();

    feed.should.have.property('name').which.is.a.String();
  });

  it('has a url', function () {
    feed = new Feed();

    feed.should.have.property('url').which.is.a.String();
  });

  it('has a description', function () {
    feed = new Feed();

    feed.should.have.property('description').which.is.a.String();
  });

  it('has tags', function () {
    feed = new Feed();

    feed.should.have.property('tags').which.is.an.Array();
  });

});