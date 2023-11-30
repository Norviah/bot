## bot

A template for a Discord application, this repository differs from something
like [Sapphire](https://www.sapphirejs.dev/) in that it is not a framework, but
a template. Everything needed to get a bot up and running is included, of course
with the ability to modify any of it as you wish.

This template includes various functionality to help make development easier and
more friendly.

### Installation / Setup

To install and run this template, you must first clone the repository by using
the following command.

```sh
git clone https://github.com/norviah/bot.git
```

You then must install dependencies by using your respective package manager.
After dependencies are installed, you must then configure the project.

1. Copy the contents of [config.json.scheme](config.json.scheme) into a new file
   called `config.json`, filling the values with the appropriate information.
2. Copy the contents of [.env.scheme](.env.scheme) into `.env` and also fill in
   the required values.
3. Initialize prisma by running `npm run build:prisma`.
4. Deploy commands by running `npm run cli:deploy`.

After these steps, you should be able to run the bot by using `npm run start`.
By default, only basic commands are included in the template, but you can add
more by creating more commands in the [commands](./src/commands) directory.

### Documentation / Development

To improve the bot or to add more functionality, please read the
[documentation](./docs/README.md), it includes information on every structure
within the project.

### Resources

- [discord.js](https://discord.js.org) / [discord.js
  guide](https://discordjs.guide) 
- [typescript](https://www.typescriptlang.org) 
- [prisma](https://www.prisma.io/docs/)
