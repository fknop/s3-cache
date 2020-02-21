const {Command, flags} = require('@oclif/command')
const {hashFile} = require('../utils/hash')

class CacheCommand extends Command {
  async run() {
    const {flags} = this.parse(CacheCommand)
    const {hash, mount} = flags

    const hash_result = hashFile(hash)
    this.log(`Hash: ${hash_result}`)
    this.log({hash, mount})
  }
}

CacheCommand.description = `Cache file(s) to S3`

CacheCommand.examples = [
  '$ s3-cache cache --hash yarn.lock --mount node_modules'
]

CacheCommand.flags = {
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
      'The path of the directory or file to be cached to S3'
  })
}

module.exports = CacheCommand
