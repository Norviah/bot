import { existsSync, mkdirSync } from 'fs';

import { Client } from './structs/client';
import { config } from './config';

import * as paths from './util/paths';

// Before continuing, we'll ensure that the directory that will hold the
// database exists, as enmap doesn't create it by itself.
if (!existsSync(paths.database)) {
  mkdirSync(paths.database);
}

new Client(config, { disableMentions: 'everyone' }).start();
