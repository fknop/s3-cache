const {Command, flags} = require('@oclif/command')
const shell = require('shelljs')
const {hashFile} = require('../utils/hash')


class RestoreCommand extends Command {
  async run() {
    const {flags} = this.parse(RestoreCommand)
    const {mount, bucket} = flags
    const hash_file = flags['hash-file']

    const hash = hashFile(hash_file)
    this.log(`Hash: ${hash}`)

    const s3Path = `s3://${bucket}/${hash}`
    this.log(`Checking if ${s3Path} exists...`)
    if (shell.exec(`aws s3 ls ${s3Path}`).code !== 0) {
      this.log(`Hash does not exist, exiting.`)
      this.exit(0)
    }
    else {
      this.log(`Hash exists, downloading content to ${mount}`)
      const syncResult = shell.exec(`aws s3 sync ${s3Path} ${mount}`, {silent: true})
      if (syncResult.code === 0) {
        this.log('Successfully restored cache')
        this.exit(0)
      }
      else {
        this.error(syncResult.stderr)
        this.exit(syncResult.code)
      }
    }
  }
}

RestoreCommand.description = `Restore file from s3`

RestoreCommand.examples = [
  '$ s3-cache restore --bucket bucket-name --hash yarn.lock --mount node_modules',
  '$ s3-cache restore -b bucket-name -h yarn.lock -m node_modules'
]

RestoreCommand.flags = {
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
      'The path of the directory for the files restored from s3 to be saved at',
    char: 'm'
  })
}

module.exports = RestoreCommand
