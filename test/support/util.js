import * as originalTmp from 'tmp';
import { Promise } from '../../lib/util';

export * from '../../lib/util';
export * from 'should';
export * from 'sinon';
export { default as path } from 'path';
export const tmp = Promise.promisifyAll(originalTmp);
