import * as originalTmp from 'tmp';
import { Promise } from '../../lib/util';

export * from '../../lib/util';
export * from 'should';
export * from 'sinon';
export const tmp = Promise.promisifyAll(originalTmp);
