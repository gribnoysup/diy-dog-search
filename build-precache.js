const fs = require('fs')
const path = require('path')
const glob = require('glob')

let precacheList = ''

console.log('Creating precache list...')

glob(path.join(__dirname, 'build', 'static') + '/**/?(*.js|*.svg)', (err, files) => {
  const list = files.map((filename) => filename.replace(/.+(?=\/static)/ig, ''))

  precacheList = `
    (function(global) {
      global.PRECACHE_LIST = ${JSON.stringify(list)}
    })(self);
  `

  fs.writeFileSync(path.join(__dirname, 'build', 'precache-list.js'), precacheList, 'utf-8')
})


console.log('Created successfully.')
process.exit()
