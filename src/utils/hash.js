const SHA256 = require('crypto-js/sha256')
const fs = require('fs')
const Path = require('path')

const hashFile = (path) => {
  const finalPath = Path.resolve(process.cwd(), path)
  const data = fs.readFileSync(finalPath, {encoding: 'utf-8'})
  return SHA256(data)
}

module.exports = {
  hashFile
}
