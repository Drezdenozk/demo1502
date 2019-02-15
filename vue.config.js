module.exports = {
  'devServer': { // Данный прокси работает только для DEV режима
    'proxy': {
      '^/api': {
        'target': `https://swapi.co/`,
      },
    },
  },
}
