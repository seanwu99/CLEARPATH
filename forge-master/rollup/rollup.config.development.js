import babel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup'
import istanbul from 'rollup-plugin-istanbul';

let pkg = require('./package.json')
let external = Object.keys(pkg.dependencies)

export default {
  entry: 'src/client/index.js',
  plugins: [
    babel(babelrc()),
    istanbul({
      exclude: ['test/**/*', 'node_modules/**/*']
    })
  ],
  external: external,
  targets: [
    {
      dest: 'dist/bundle.js',
      moduleName: 'forge',
      sourceMap: true,
      format: 'umd'
    }
  ]
}