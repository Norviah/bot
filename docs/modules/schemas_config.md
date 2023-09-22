[Bot](../README.md) / schemas/config

# Module: schemas/config

## Table of contents

### Type Aliases

- [Config](schemas_config.md#config)

### Variables

- [config](schemas_config.md#config-1)

## Type Aliases

### Config

Ƭ **Config**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `debug` | `boolean` | Determines if the client should run in debug mode. When in debug mode, the client will log additional information reagarding things such as commands, events, and listeners. |
| `devServer` | `string` | The guild ID for your development server. When working with a Discord bot, it is highly recommended to have a server that is dedicated to development purposes. This server should be used to test commands and features before deploying them globally. Deploying commands globally takes time, however, deploying to a specific is nearly instant. |
| `token` | `string` | Represents the access token for your client. This token is used to authenticate your client with Discord's API, which must not be shared with anyone. **`See`** https://discord.com/developers/docs/topics/oauth2 |

#### Defined in

[src/schemas/config.ts:36](https://github.com/Norviah/bot/blob/78f7ec8/src/schemas/config.ts#L36)

## Variables

### config

• `Const` **config**: `ZodObject`<[`Config`](schemas_config.md#config)\>

#### Defined in

[src/schemas/config.ts:4](https://github.com/Norviah/bot/blob/78f7ec8/src/schemas/config.ts#L4)
