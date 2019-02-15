const path = require('path')
const fs = require('fs')
const fastify = require('fastify')({
  'logger': false,
})
const proxy = require('fastify-http-proxy')
const favicon = require('fastify-favicon')
const serveStatic = require('serve-static')

const template = fs.readFileSync('./dist/index.html', 'utf-8')
fastify.register(favicon, {
  'path': './dist',
})
fastify.use('/dist', serveStatic('./dist'))
fastify.use('/js', serveStatic('./dist/js'))
fastify.use('/css', serveStatic('./dist/css'))
fastify.use('/public', serveStatic('./public'))
fastify.use('/img', serveStatic('./dist/img'))
fastify.register(proxy, {
  'upstream': `https://swapi.co/`,
  'prefix': '/api',
  'rewritePrefix': '/api',
  'http2': false,
})


fastify.get('/*', (req, reply) => {
  reply
    .type('text/html')
    .code(200)
    .send(template)
})


fastify.listen(8080, '0.0.0.0', (err) => {
  if (err) {
    console.warn(err)
    process.exit(1)
  }
  console.warn('server start')
})
