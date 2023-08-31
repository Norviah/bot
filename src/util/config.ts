import { logger } from '@/util/logger';
import { config as source } from '@config';
import { fromZodError } from 'zod-validation-error';

import type { Config } from '@/schemas';
import type { ZodError } from 'zod';

import * as schemas from '@/schemas';

let config: Config;

try {
  config = schemas.config.parse(source);
} catch (error) {
  logger.exit(fromZodError(error as ZodError).message, { title: 'invalid config' });
}

export { config };
