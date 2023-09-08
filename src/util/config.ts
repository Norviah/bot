import { ClientError } from '@/structs/ClientError';
import { Read } from '@/structs/Read';

import { fromZodError } from 'zod-validation-error';

import type { Config } from '@/schemas';
import type { ZodError } from 'zod';

import * as schemas from '@/schemas';
import * as paths from '@/util/paths';

let config: Config;

try {
  config = schemas.config.parse(Read.JSON(paths.CONFIG));
} catch (error) {
  if (error instanceof ClientError) {
    console.log(error.message);
  } else {
    console.log(fromZodError(error as ZodError).message);
  }

  process.exit(1);
}

export { config };
