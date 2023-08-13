import { Client } from '@/structs/Client';
import { logger } from '@/util/logger';
import { GatewayIntentBits, Partials } from 'discord.js';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

import type { ClientOptions } from 'discord.js';

const options: ClientOptions = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
  ],

  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
};

try {
  new Client(options).start();
} catch (error) {
  if (error instanceof ZodError) {
    logger.exit(fromZodError(error).message, { title: 'invalid config' });
  } else {
    logger.write((error as Error).message, { subDir: 'bubble error' });
  }

  throw error;
}
