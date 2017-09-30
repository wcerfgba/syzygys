import * as originalTmp from 'tmp';
import { Promise } from '../../src/util';

export * from '../../src/util';
export * from 'should';
export * from 'sinon';
export const tmp = Promise.promisifyAll(originalTmp);
