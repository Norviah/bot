[Bot](../README.md) / [structs/ClientError](../modules/structs_ClientError.md) / ErrorCodes

# Enumeration: ErrorCodes

[structs/ClientError](../modules/structs_ClientError.md).ErrorCodes

## Table of contents

### Enumeration Members

- [DUPLICATE\_MODULE](structs_ClientError.ErrorCodes.md#duplicate_module)
- [INVALID\_DIRECTORY](structs_ClientError.ErrorCodes.md#invalid_directory)
- [INVALID\_HANDLER](structs_ClientError.ErrorCodes.md#invalid_handler)
- [INVALID\_JSON](structs_ClientError.ErrorCodes.md#invalid_json)
- [INVALID\_MODULE](structs_ClientError.ErrorCodes.md#invalid_module)
- [MISSING\_JSON\_FILE](structs_ClientError.ErrorCodes.md#missing_json_file)
- [NON\_JSON\_FILE](structs_ClientError.ErrorCodes.md#non_json_file)
- [NON\_TS\_FILE](structs_ClientError.ErrorCodes.md#non_ts_file)
- [UNKNOWN\_EMITTER](structs_ClientError.ErrorCodes.md#unknown_emitter)

## Enumeration Members

### DUPLICATE\_MODULE

• **DUPLICATE\_MODULE** = ``"DUPLICATE_MODULE"``

The event where a handler attempts to register a module with a name that
already exists within the handler's collection.

#### Defined in

[src/structs/ClientError.ts:23](https://github.com/Norviah/bot/blob/3146ef8/src/structs/ClientError.ts#L23)

___

### INVALID\_DIRECTORY

• **INVALID\_DIRECTORY** = ``"INVALID_DIRECTORY"``

The event where a specified directory was not found.

#### Defined in

[src/structs/ClientError.ts:5](https://github.com/Norviah/bot/blob/3146ef8/src/structs/ClientError.ts#L5)

___

### INVALID\_HANDLER

• **INVALID\_HANDLER** = ``"INVALID_HANDLER"``

The event where a module is initialized with a handler that does not manage
the module's respective type.

#### Defined in

[src/structs/ClientError.ts:17](https://github.com/Norviah/bot/blob/3146ef8/src/structs/ClientError.ts#L17)

___

### INVALID\_JSON

• **INVALID\_JSON** = ``"INVALID_JSON"``

The event where an invalid JSON file was provided.

#### Defined in

[src/structs/ClientError.ts:50](https://github.com/Norviah/bot/blob/3146ef8/src/structs/ClientError.ts#L50)

___

### INVALID\_MODULE

• **INVALID\_MODULE** = ``"INVALID_MODULE"``

The event where a handler attempts to import a module from a script that
does not export a valid instance of the module.

#### Defined in

[src/structs/ClientError.ts:11](https://github.com/Norviah/bot/blob/3146ef8/src/structs/ClientError.ts#L11)

___

### MISSING\_JSON\_FILE

• **MISSING\_JSON\_FILE** = ``"MISSING_JSON_FILE"``

The event where a JSON file was not found.

#### Defined in

[src/structs/ClientError.ts:40](https://github.com/Norviah/bot/blob/3146ef8/src/structs/ClientError.ts#L40)

___

### NON\_JSON\_FILE

• **NON\_JSON\_FILE** = ``"NON_JSON_FILE"``

The event where a non-JSON file was provided.

#### Defined in

[src/structs/ClientError.ts:45](https://github.com/Norviah/bot/blob/3146ef8/src/structs/ClientError.ts#L45)

___

### NON\_TS\_FILE

• **NON\_TS\_FILE** = ``"NON_TS_FILE"``

The event where a handler is told to import a module from a non-typescript
file.

#### Defined in

[src/structs/ClientError.ts:29](https://github.com/Norviah/bot/blob/3146ef8/src/structs/ClientError.ts#L29)

___

### UNKNOWN\_EMITTER

• **UNKNOWN\_EMITTER** = ``"UNKNOWN_EMITTER"``

The event where a listener references an emitter that wasn't provided when
initializing the listener handler.

#### Defined in

[src/structs/ClientError.ts:35](https://github.com/Norviah/bot/blob/3146ef8/src/structs/ClientError.ts#L35)
