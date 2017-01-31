const rimraf = require('rimraf')
const replace = require('replace-in-file')

const options = {
  files: 'build/**/*.js',
  replace: /\/\/# sourceMappingURL=.+/g,
  with: '',
}

console.log('')
console.log('Removing sourcemap files...')

rimraf('build/**/*.map', function(err) {
  if (err) throw err

  replace(options, function(err, fileNames) {
    if (err) throw err

    console.log('Removed sourcemaps successfully.')
    console.log('')
    
    process.exit()
  })
})
