export * from '../../lib/util';

export * from 'mocha';
export * from 'should';

import { Promise } from '../../lib/util';

import * as node_tmp from 'tmp';
export const tmp = Promise.promisifyAll(node_tmp);