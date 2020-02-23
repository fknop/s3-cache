s3-cache
========

CLI to cache and restore files from S3

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![License](https://img.shields.io/npm/l/s3-cache.svg)](https://github.com/fknop/s3-cache/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g s3-cache
$ s3-cache COMMAND
running command...
$ s3-cache (-v|--version|version)
s3-cache/0.0.0 darwin-x64 node-v12.13.1
$ s3-cache --help [COMMAND]
USAGE
  $ s3-cache COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`s3-cache cache`](#s3-cache-cache)
* [`s3-cache help [COMMAND]`](#s3-cache-help-command)
* [`s3-cache restore`](#s3-cache-restore)

## `s3-cache cache`

Cache file(s) to S3

```
USAGE
  $ s3-cache cache

OPTIONS
  -b, --bucket=s3-bucket-name  (required) Your S3 bucket name
  -h, --hash-file=path         (required) The path to the file or directory to hash for the cache key
  -m, --mount=path             (required) The path of the directory or file to be cached to S3

EXAMPLES
  $ s3-cache cache --bucket bucket-name --hash yarn.lock --mount node_modules
  $ s3-cache cache -b bucket-name -h yarn.lock -m node_modules
```

_See code: [src/commands/cache.js](https://github.com/fknop/s3-cache/blob/v0.0.0/src/commands/cache.js)_

## `s3-cache help [COMMAND]`

display help for s3-cache

```
USAGE
  $ s3-cache help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `s3-cache restore`

Restore file from s3

```
USAGE
  $ s3-cache restore

OPTIONS
  -b, --bucket=s3-bucket-name  (required) Your S3 bucket name
  -h, --hash-file=path         (required) The path to the file or directory to hash for the cache key
  -m, --mount=path             (required) The path of the directory for the files restored from s3 to be saved at

EXAMPLES
  $ s3-cache restore --bucket bucket-name --hash yarn.lock --mount node_modules
  $ s3-cache restore -b bucket-name -h yarn.lock -m node_modules
```

_See code: [src/commands/restore.js](https://github.com/fknop/s3-cache/blob/v0.0.0/src/commands/restore.js)_
<!-- commandsstop -->
