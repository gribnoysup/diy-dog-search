(function serviceWorker(global) {
  importScripts('/sw-toolbox.js')

  function openCache(options) {
    options = options || { cache: {} }
    var cacheName = options.cache.name || global.toolbox.options.cache.name
    return caches.open(cacheName)
  }

  function isSuccess(response, options) {
    options = options || {}
    var successResponses = options.successResponses || global.toolbox.options.successResponses
    return successResponses.test(response.status)
  }

  var index = 'index.html'

  var host = global.location.host
  var beer = /api.punkapi.com\/v2\/beers\/\d+/
  var offline = new RegExp(host + '/offline$')

  var router = global.toolbox.router
  var cacheFirst = global.toolbox.cacheFirst
  var networkFirst = global.toolbox.networkFirst
  var networkOnly = global.toolbox.networkOnly

  // debug mode for local build
  global.toolbox.options.debug = /localhost/.test(host)

  function getFromCache(request, options) {
    return openCache(options)
    .then(function onOpen(cache) {
      return cache.match(request)
    })
    .then(function onMatch(response) {
      if (response) return response
      throw new Error('No match found')
    })
  }

  function onAppRoute(_request, values, options) {
    var request = new Request('/index.html')

    return fetch(request)
    .then(function onResponse(response) {
      if (request.method === 'GET' && isSuccess(response, options)) {
        openCache(options)
        .then(function onOpen(cache) {
          cache.put(request, response)
        })
      }

      return response.clone()
    })
    .catch(function(error) {
      if (offline.test(_request.url)) {
        return getFromCache(request, options)
      }

      return Response.redirect('/offline')
    })
  }

  router.get('/static/*', cacheFirst, { cache: { name: 'static' } })

  router.get('/offline', onAppRoute, { cache: { name: 'public' } })
  router.get('/beer/*', onAppRoute, { cache: { name: 'public' } })
  router.get('/', onAppRoute, { cache: { name: 'public' } })

  // TODO: save random beer to cache with id
  router.get(beer, networkFirst, {
    cache: {
      name: 'punkapi-beer',
      maxEntries: 10
    }
  })

  // Boilerplate to ensure that service-worker takes control of the page ASAP
  global.addEventListener('install', function onInstall(event) {
    event.waitUntil(global.skipWaiting())
  })

  global.addEventListener('activate', function onActivate(event) {
    event.waitUntil(global.clients.claim())
  })
})(self);
