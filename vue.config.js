const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const nodeExternals = require('webpack-node-externals')
const merge = require('lodash.merge')
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'

const createApiFile = TARGET_NODE
  ? './create-api-server.js'
  : './create-api-client.js'

const target = TARGET_NODE
  ? 'server'
  : 'client'

const isDev = process.env.NODE_ENV === 'development'
module.exports = {
  'css': {
    'extract': process.env.NODE_ENV === 'production',
    'loaderOptions': {
      'sass': {
        'data': `@import "src/assets/scss/requires.scss";`,
      },
      'css': {
        'data': `@import "node_modules/vue-resize/dist/vue-resize.css";`,
      },
    },
  },
  'devServer': {
    'port': '5030',
    'proxy': {
      '^/api': {
        'target': `${process.env.NODEURL}`,
        'ws': true,
        'changeOrigin': false,
      },
    },
    'watchOptions': {
      'poll': 1000,
    },
  },
  'productionSourceMap': true,
  'crossorigin': 'use-credentials',
  'configureWebpack': () => ({
    'entry': `./src/entry-${target}`,
    'target': TARGET_NODE ? 'node' : 'web',
    'plugins': [
      TARGET_NODE
        ? new VueSSRServerPlugin()
        : new VueSSRClientPlugin(),
    ],
    'externals': TARGET_NODE ? nodeExternals({
      'whitelist': /\.css$/,
    }) : undefined,
    'output': {
      'libraryTarget': TARGET_NODE
        ? 'commonjs2'
        : undefined,
    },
    'resolve': {
      'alias': {
        'create-api': createApiFile,
      },
    },
  }),
  'chainWebpack': (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) =>
        merge(options, {
          'optimizeSSR': false,
        }))
    config
      .plugin('html')
      .tap((args) => {
        args[0].minify = true
        return [
          ...args,
        ]
      })
    const processEnvs = {
      'process.dev': isDev,
      'process.browser': !TARGET_NODE,
      'process.client': !TARGET_NODE,
      'process.server': !!TARGET_NODE,
    }
    if (isDev) {
      // АХТУНГ!!! эти энвы должны быть и в replace.js
      processEnvs['process.BASEURLReplacePattern'] = `"${process.env.BASEURL}"`
      processEnvs['process.NODEURLReplacePattern'] = `"${process.env.NODEURL}"`
      processEnvs['process.cookieurlReplacePattern'] = `"${process.env.COOKIEURL}"`
      processEnvs['process.mediaReplacePattern'] = `"${process.env.MEDIA}"`
    } else {
      processEnvs['process.BASEURLReplacePattern'] = 'BASEURLReplacePattern'
      processEnvs['process.NODEURLReplacePattern'] = 'NODEURLReplacePattern'
      processEnvs['process.cookieurlReplacePattern'] = 'cookieurlReplacePattern'
      processEnvs['process.mediaReplacePattern'] = 'mediaReplacePattern'
    }
    config.plugin('define').tap((definitions) => {
      definitions[0] = Object.assign(definitions[0], processEnvs)
      return definitions
    })
  },
}
