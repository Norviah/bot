## Unreleased

### Features

- **structs/BaseCommand**: implement helper methods to determine the type of command <code>[2fe11d0](https://github.com/Norviah/bot/commit/2fe11d0d192018c79761a8f90ff46f885e65e799)</code>

- implement a structure to construct embed messages <code>[61c54cf](https://github.com/Norviah/bot/commit/61c54cfff879119beaa36582805271e1860e80d4)</code>

- implement the client's command handler <code>[3662112](https://github.com/Norviah/bot/commit/3662112ec31af435ecccf4cc6a6054a9d318cfa0)</code>

- **structs/ModuleUtil**: implement a method to determine who sent an interaction <code>[ba6b0ca](https://github.com/Norviah/bot/commit/ba6b0ca312ee52baee5dad20dc63103ddbabaf92)</code>

- **structs/ModuleUtil**: implement a method to join strings separated by a word <code>[c1d985f](https://github.com/Norviah/bot/commit/c1d985f6828b91ce8c51b1e9c977c4f42fb7f804)</code>

- implement a structure to contain useful methods for modules <code>[e53e263](https://github.com/Norviah/bot/commit/e53e263fe770c5c0ee10a7a5d261ab33a14c7300)</code>

- **cli**: ensure the client is logged out after executing a command <code>[b5a8848](https://github.com/Norviah/bot/commit/b5a88485291e499cea779b0677b8f5c4afdbdef5)</code>

- **structs**: implement a structure to provide methods for reading system files <code>[db10c6c](https://github.com/Norviah/bot/commit/db10c6cf58ab1fb2e8b9f687fe927b5dc67df0fe)</code>

- implement a cli to help manage aspects of the client <code>[d36a8eb](https://github.com/Norviah/bot/commit/d36a8eb9a543b90abd96538b34f16362fe6b5dc7)</code>

- **prisma**: define initial schema <code>[645687f](https://github.com/Norviah/bot/commit/645687f5516aec7e695c34c1829f1d8b5d4c27c9)</code>

- implement the base structure for commands <code>[f6d9548](https://github.com/Norviah/bot/commit/f6d9548204fb64312492d3e113354e67ed938cff)</code>

- **types/ts**: implement a type to construct a type where all properties are explicitly required <code>[48f245a](https://github.com/Norviah/bot/commit/48f245a5677ef9c7a8bf2893037d7a9d0ce90060)</code>

- add base listeners <code>[17667ff](https://github.com/Norviah/bot/commit/17667ff290aca85dd6c4f6e96c795a02fb309018)</code>

- **structs/Module**: ensure a valid handler is passed when initialized <code>[1e9a552](https://github.com/Norviah/bot/commit/1e9a552388939fb215638635932bb192759684ee)</code>

- implement the base structure for listeners <code>[5d7fa70](https://github.com/Norviah/bot/commit/5d7fa7026b822840f8dd56d29c6cf31a2d03f79f)</code>

- implement the base structure for modules and handlers <code>[85d668a](https://github.com/Norviah/bot/commit/85d668ae22c2165d8a3f3b139ce5dd1af38ca3e8)</code>

- **structs/Logger**: implement a method for debugging purposes <code>[b61b3fe](https://github.com/Norviah/bot/commit/b61b3fea3edc0cc34bd951b783660a8f83166d0b)</code>

- implement a custom error class <code>[82d8d5f](https://github.com/Norviah/bot/commit/82d8d5f47694773987e3c758c37e72b906a1f009)</code>

### Build System

- **bump**: sort commits in ascending order <code>[ff2f53a](https://github.com/Norviah/bot/commit/ff2f53af63a0e8be911bb9aa77f05002cb29a303)</code>

- **typedoc**: delete the output directory before writing output <code>[8e93bba](https://github.com/Norviah/bot/commit/8e93bba800de477d08b2a33d741c03877d590507)</code>

- **typedoc**: have the start page be the documentation <code>[2795169](https://github.com/Norviah/bot/commit/27951690a8efc2e4c108e74b368b95a742a11690)</code>

- **typedoc**: include types when generating documentation <code>[e41996d](https://github.com/Norviah/bot/commit/e41996dd9416e3cf1251d2a6d39b1d5e58743619)</code>

### Refactor

- use discord.js' built in type for referring valid command interactions <code>[0b78497](https://github.com/Norviah/bot/commit/0b78497651ee91c9cec6927b3a6b5b5b5adbc286)</code>

- **cli**: set the client reference as an export <code>[238befe](https://github.com/Norviah/bot/commit/238befe0116ae78d70540e3423874b48249baa3f)</code>

- move the config file to a json file <code>[9da4a9c](https://github.com/Norviah/bot/commit/9da4a9c1d07eb5a64b8a5ae7a5f990c92c235ce3)</code>

- **cli/structs**: move the `client` property to the base command class <code>[bcf8d88](https://github.com/Norviah/bot/commit/bcf8d88a210cb26f1fc415c694d5b627f7634006)</code>

- **structs/Client**: expose the `Ready` generic argument <code>[9a8a64e](https://github.com/Norviah/bot/commit/9a8a64e42ae9a704851eded16b943f2d9994b9d5)</code>

- **structs/Logger**: implement a default title when logging for debugging purposes <code>[0cf7f97](https://github.com/Norviah/bot/commit/0cf7f97296e96765ba6e486a8a0584ce8d2b68b7)</code>

- move the logic for importing the config into a separate file <code>[da9f181](https://github.com/Norviah/bot/commit/da9f181b565e9696d37dc8e4399c532eb8c8c929)</code>

### Bug Fixes

- **structs/BaseCommand**: ensure default permissions for commands are everyone by passing `null` than `undefined` <code>[0254409](https://github.com/Norviah/bot/commit/0254409b61a472a9c554d29fa07c5552e51d9df8)</code>

	When generating a payload for a command, if no default permissions are
	set, `undefined` will instead set the default permissions to
	`Administrator`. By instead passing \`null\` when a command has no default permissions,
	Discord then correctly infer default permissions as everyone.

- **structs/BaseCommand**: ensure all messages sent when an error occurs is an ephemeral message <code>[e1a1f80](https://github.com/Norviah/bot/commit/e1a1f807da456e47627af7cdc89a84ab171c0ff8)</code>

- **structs/BaseCommand**: ensure the response when an error occurs is ephemeral <code>[0f4b242](https://github.com/Norviah/bot/commit/0f4b242048e86fa1380a1b7d7baeb70206933087)</code>

- **structs/Logger**: ensure that errors are saved in the `errors` root directory <code>[b466ba0](https://github.com/Norviah/bot/commit/b466ba00aa81acb2413cbc2a83872c98c907a379)</code>

- **structs/Client**: ensure the client logs in before returning in `Client.start` <code>[9b8c392](https://github.com/Norviah/bot/commit/9b8c392ee8a0de8c6cdafd08787964f2b995f3db)</code>

- **structs/Module**: remove the prisma reference <code>[4170426](https://github.com/Norviah/bot/commit/41704267e0399e71101d770078186c3062080edd)</code>

	When printing the Prisma client to console, the terminal hangs
	indefinitely. As modules have a reference to the Prisma client, the
	terminal hangs when printing a module to the console.
	
	Removing the client property from modules fixes this issue.

- **structs/Logger**: correctly infer the type for options <code>[6e270d1](https://github.com/Norviah/bot/commit/6e270d112a6cbbaffcaf32005271e6b3f3c5dbd9)</code>

## v0.1.0 (2023-08-31)

### Features

- initialize prisma <code>[9e092b2](https://github.com/Norviah/bot/commit/9e092b2c593509bd15b21148ee26fc939bbcaf93)</code>

- implement the base structure for the client <code>[84ef08a](https://github.com/Norviah/bot/commit/84ef08a1111ee2f261bd4a47e9b048a24b5893aa)</code>

- implement the structure for logging <code>[4ead554](https://github.com/Norviah/bot/commit/4ead554a256db436aefa0ec49e48c9aa739fc719)</code>

### Build System

- **bump**: define a title for the `deps` commit type <code>[babdcc1](https://github.com/Norviah/bot/commit/babdcc186eee410aaf04e4c718b591b1d9510fa8)</code>

- **typedoc**: correctly point to the structs to document <code>[f751294](https://github.com/Norviah/bot/commit/f7512946deae888eb2c7cd979f5e179344d4aadb)</code>

- **bump**: ask for confirmation before releasing a new version <code>[cd87ed5](https://github.com/Norviah/bot/commit/cd87ed5b1d418acc82f1533b23ae17c37f5e2409)</code>

- **bump**: implement scripts to run pre and post bump <code>[7af59db](https://github.com/Norviah/bot/commit/7af59dbaacd91430ffc10f780e34487aa9925d7f)</code>

### Dependencies

- add prisma for database management <code>[9173eb1](https://github.com/Norviah/bot/commit/9173eb1146af1ab619180abab97fa8741f50e30f)</code>

### Refactor

- move error handling logic within the client structure <code>[b44165a](https://github.com/Norviah/bot/commit/b44165a661544529abeee0294454b6116e9543fe)</code>

### Init

- initial commit <code>[7a2bc55](https://github.com/Norviah/bot/commit/7a2bc559b4b1e46d0d4f5a5a8fbad7fc2c4e271c)</code>