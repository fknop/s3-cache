const {Command, flags} = require('@oclif/command')

class RestoreCommand extends Command {
  async run() {
    const {flags} = this.parse(RestoreCommand)
    const {hash, mount} = flags
    this.log({hash, mount})
  }
}

RestoreCommand.description = `Restore file from s3`

RestoreCommand.examples = [
  '$ s3-cache restore --hash yarn.lock --mount node_modules'
]

RestoreCommand.flags = {
  hash: flags.string({
    required: true,
    helpValue: 'path',
    name: 'hash',
    description: 'The path to the file or directory to hash for the cache key'
  }),
  mount: flags.string({
    required: true,
    helpValue: 'path',
    name: 'mount',
    description:
      'The path of the directory for the files restored from s3 to be saved at'
  })
}

module.exports = RestoreCommand
