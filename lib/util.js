import * as Promise from 'bluebird';
export { Promise };

import * as node_fs from 'fs';
export const fs = Promise.promisifyAll(node_fs);