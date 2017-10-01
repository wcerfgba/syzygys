import * as Promise from 'bluebird';
import * as originalFs from 'fs';
import * as originalPath from 'path';
import originalSanitizeHtml from 'sanitize-html';

export { Promise };
export { Readable } from 'stream';
export const fs = Promise.promisifyAll(originalFs);
export const path = Promise.promisifyAll(originalPath);
export { default as FeedParser } from 'feedparser';
export { default as fetch } from 'node-fetch';
export const sanitizeHtml = html => originalSanitizeHtml(html, {
  allowedTags: originalSanitizeHtml.defaults.allowedTags,
  parser: {
    decodeEntities: true,
  },
});
export const log = console.log;
export { default as Moment } from 'moment';
