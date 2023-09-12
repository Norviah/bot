import { client } from '@cli/util/client';
import { Hook } from '@oclif/core';

/**
 * The `postrun` hook.
 *
 * This hook is invoked after a command has finished executing with no errors.
 * As this command-interface works with the Discord application, we'll implement
 * this hook to ensure that the client is logged out after the command has
 * finished.
 *
 * @see https://oclif.io/docs/hooks/
 */
const hook: Hook<'postrun'> = async function () {
  if (client.readyTimestamp) {
    await client.destroy();
  }
};

export default hook;
