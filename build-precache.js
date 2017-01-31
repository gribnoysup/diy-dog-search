const fs = require('fs')
const path = require('path')
const glob = require('glob')

let precacheList = ''

console.log('')
console.log('Creating precache list...')

glob(path.join(__dirname, 'build', 'static') + '/**/?(*.js|*.svg)', (err, files) => {
  if (err) throw err

  const list = files.map((filename) => filename.replace(/.+(?=\/static)/ig, ''))
  list.unshift('/index.html')

  precacheList = `
    (function(global) {
      global.PRECACHE_LIST = ${JSON.stringify(list)}
    })(self);
  `

  fs.writeFileSync(path.join(__dirname, 'build', 'precache-list.js'), precacheList, 'utf-8')

  console.log('Created successfully.')
  console.log('')

  process.exit()
})
