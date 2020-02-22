const {Command, flags} = require('@oclif/command')
const {hashFile} = require('../utils/hash')
const shell = require('shelljs')
const Path = require('path')
const fs = require('fs')

class CacheCommand extends Command {
  async run() {
    const {flags} = this.parse(CacheCommand)
    const {mount, bucket} = flags
    const hash_file = flags['hash-file']

    const mountPath = Path.resolve(process.cwd(), mount)
    const stat = fs.statSync(mountPath)

    const isDirectory = stat.isDirectory()

    const hash = hashFile(hash_file)
    this.log(`Hash: ${hash}`)

    const s3Path = `s3://${bucket}/${hash}`
    this.log(`Checking if ${s3Path} exists...`)

    if (shell.exec(`aws s3 ls ${s3Path}`).code !== 0) {
      this.log(`Hash does not exist, caching ${mountPath} to ${s3Path}`)

      const syncResult = isDirectory ?
        shell.exec(`aws s3 sync ${mountPath} ${s3Path}`, {silent: true}) :
        shell.exec(`aws s3 cp ${mountPath} ${s3Path}/`, {silent: true})

      if (syncResult.code === 0) {
        this.exit(0)
      }
      else {
        this.error(syncResult.stderr)
        this.exit(1)
      }
    }
    else {
      this.log(`Hash already exist, exiting.`)
      this.exit(0)
    }
  }
}

CacheCommand.description = `Cache file(s) to S3`

CacheCommand.examples = [
  '$ s3-cache cache --bucket bucket-name --hash yarn.lock --mount node_modules',
  '$ s3-cache cache -b bucket-name -h yarn.lock -m node_modules'
]

CacheCommand.flags = {
  bucket: flags.string({
    required: true,
    helpValue: 's3-bucket-name',
    description: 'Your S3 bucket name',
    char: 'b'
  }),
  'hash-file': flags.string({
    required: true,
    helpValue: 'path',
    description: 'The path to the file or directory to hash for the cache key',
    char: 'h'
  }),
  mount: flags.string({
    required: true,
    helpValue: 'path',
    description:
      'The path of the directory or file to be cached to S3',
    char: 'm'
  }),
}

module.exports = CacheCommand
