module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '#': './src',
            '#app': './app',
            '#assets': './assets',
          },
          extensions: ['.js', '.ts', '.tsx'],
        },
      ],
    ],
  }
}
