## Unreleased

### Features

- implement a structure to contain useful methods for modules <code>[a024a5d](https://github.com/Norviah/bot/commit/a024a5dc59fa24e9a802dc6c67dc889f6720c574)</code>

- implement a cli to help manage aspects of the client <code>[b7b76fe](https://github.com/Norviah/bot/commit/b7b76fe2ce89f87ad52dc1cc7939470d9c7f0e17)</code>

- implement the base structure for commands <code>[02978e8](https://github.com/Norviah/bot/commit/02978e893b874897d1030b697905dbc4d46ad54a)</code>

- add base listeners <code>[abd01f8](https://github.com/Norviah/bot/commit/abd01f8b8920a1d6dc0c8f045ecab1c5b0ace06b)</code>

- implement the base structure for listeners <code>[cb08218](https://github.com/Norviah/bot/commit/cb0821865a03506e0f03f0922563702acf93085f)</code>

- implement the base structure for modules and handlers <code>[da06d65](https://github.com/Norviah/bot/commit/da06d6531f103568517999e48703dd2860730edc)</code>

- implement a custom error class <code>[82d8d5f](https://github.com/Norviah/bot/commit/82d8d5f47694773987e3c758c37e72b906a1f009)</code>

- **cli**: ensure the client is logged out after executing a command <code>[5d37387](https://github.com/Norviah/bot/commit/5d37387ce86f19d5cd88c4732561c8988d507d36)</code>

- **prisma**: define initial schema <code>[aebb243](https://github.com/Norviah/bot/commit/aebb2431601ccbb175b82e2d6d30546ac7c63e9f)</code>

- **structs**: implement a structure to provide methods for reading system files <code>[b764a55](https://github.com/Norviah/bot/commit/b764a55892f1752266017bba5ea1ab0a452bb772)</code>

- **structs**: ensure a module has been passed a proper handler when initialized <code>[8a8cf3b](https://github.com/Norviah/bot/commit/8a8cf3bafef2d16cd358afc88ee72109c554b5db)</code>

- **structs**: implement a default title when logging for debugging purposes <code>[1f225fb](https://github.com/Norviah/bot/commit/1f225fb6db1d17a8228df0d149e60cd5a9558244)</code>

- **structs**: implement a method in `Logger` for debugging purposes <code>[aa4d3e4](https://github.com/Norviah/bot/commit/aa4d3e4bf51fbe4b7566411e56bf0e16e23364ba)</code>

- **structs/ModuleUtil**: implement a method to determine who sent an interaction <code>[8294586](https://github.com/Norviah/bot/commit/8294586180c343cb6ffe5095ae6a323ab2ad6a25)</code>

- **structs/ModuleUtil**: implement a method to join strings separated by a word <code>[f337663](https://github.com/Norviah/bot/commit/f337663d8fb5ceb4faf690cd2a46cb9418b69c3a)</code>

### Bug Fixes

- **structs**: remove the prisma reference from modules <code>[fcfedfb](https://github.com/Norviah/bot/commit/fcfedfb8df0c2d974b31ca6d0e6149dc4e12afae)</code>

	For some reason, when printing the Prisma client to console, the
	terminal hangs indefinitely. As all modules have a reference to the
	Prisma client, the terminal hangs when printing any module.
	
	Removing the client reference from modules fixes this issue.

- **structs**: correctly type options for the logger class <code>[0bc8656](https://github.com/Norviah/bot/commit/0bc865668618d2d92d619e64a9fc3d9cd67e22df)</code>

- **structs/Client**: ensure the client logs in before returning in `Client.start` <code>[25e3bda](https://github.com/Norviah/bot/commit/25e3bda329524877b9b09053952d1e9babe24299)</code>

- **structs/Logger**: ensure that errors are saved in the `errors` root directory <code>[f8bd85a](https://github.com/Norviah/bot/commit/f8bd85adc327fc7e67a123d5c0e74e249dc68d00)</code>

### Refactor

- move the config file to a json file <code>[5967fa1](https://github.com/Norviah/bot/commit/5967fa1ed473cf88642a312c2973aa8e904b2bf2)</code>

- move the logic for importing the config into a separate file <code>[da9f181](https://github.com/Norviah/bot/commit/da9f181b565e9696d37dc8e4399c532eb8c8c929)</code>

- **cli**: set the client reference as an export <code>[513a15b](https://github.com/Norviah/bot/commit/513a15b0e3148e5ca428c27cc1b1efaba89d398c)</code>

- **cli/structs**: move the `client` property to the base command class <code>[d0af849](https://github.com/Norviah/bot/commit/d0af849f439aa6970e485b0f156b9459820221b4)</code>

- **structs/Client**: expose the `Ready` generic argument <code>[4a5c2c2](https://github.com/Norviah/bot/commit/4a5c2c23abfeb7b997cfa378982b67eea7bfd048)</code>

### Build System

- **typedoc**: delete the output directory before writing output <code>[520ef34](https://github.com/Norviah/bot/commit/520ef345bfe63679587020075131b64c85c9b244)</code>

- **typedoc**: have the start page be the documentation <code>[867d656](https://github.com/Norviah/bot/commit/867d6562e563e7473ac5ad9f3e074145aedb641f)</code>

- **typedoc**: include types when generating documentation <code>[8ddfa0b](https://github.com/Norviah/bot/commit/8ddfa0b5b1bd821c9c87a6c8f3954d84d6221719)</code>

### types

- **ts**: implement a type to construct a type where all properties are explicitly required <code>[013a352](https://github.com/Norviah/bot/commit/013a3520cecc7b9a33710077e75ade7eb2c3bde7)</code>

## v0.1.0 (2023-08-31)

### Features

- initialize prisma <code>[9e092b2](https://github.com/Norviah/bot/commit/9e092b2c593509bd15b21148ee26fc939bbcaf93)</code>

- implement the base structure for the client <code>[84ef08a](https://github.com/Norviah/bot/commit/84ef08a1111ee2f261bd4a47e9b048a24b5893aa)</code>

- implement the structure for logging <code>[4ead554](https://github.com/Norviah/bot/commit/4ead554a256db436aefa0ec49e48c9aa739fc719)</code>

### Build System

- **bump**: define a title for the `deps` commit type <code>[babdcc1](https://github.com/Norviah/bot/commit/babdcc186eee410aaf04e4c718b591b1d9510fa8)</code>

- **bump**: ask for confirmation before releasing a new version <code>[cd87ed5](https://github.com/Norviah/bot/commit/cd87ed5b1d418acc82f1533b23ae17c37f5e2409)</code>

- **bump**: implement scripts to run pre and post bump <code>[7af59db](https://github.com/Norviah/bot/commit/7af59dbaacd91430ffc10f780e34487aa9925d7f)</code>

- **typedoc**: correctly point to the structs to document <code>[f751294](https://github.com/Norviah/bot/commit/f7512946deae888eb2c7cd979f5e179344d4aadb)</code>

### Dependencies

- add prisma for database management <code>[9173eb1](https://github.com/Norviah/bot/commit/9173eb1146af1ab619180abab97fa8741f50e30f)</code>

### Refactor

- move error handling logic within the client structure <code>[b44165a](https://github.com/Norviah/bot/commit/b44165a661544529abeee0294454b6116e9543fe)</code>

### Init

- initial commit <code>[7a2bc55](https://github.com/Norviah/bot/commit/7a2bc559b4b1e46d0d4f5a5a8fbad7fc2c4e271c)</code>