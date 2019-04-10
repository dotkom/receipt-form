const path = require('path');

module.exports = env => {
  return {
    mode: 'development',
    devtool: 'source-map',
    target: 'node',
    entry: {
      lambda: './src/lambda/index.ts',
    },
    output: {
      path: path.resolve('./dist/'),
      filename: '[name].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /\*node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
      ]
    },
    resolve: {
      modules: [path.resolve(__dirname, '../'), '../../node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    externals: [
      'canvas'
    ],
  }
}