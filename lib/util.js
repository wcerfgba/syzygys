import * as Promise from 'bluebird';
import * as originalFs from 'fs';

export { Promise };
export const fs = Promise.promisifyAll(originalFs);
