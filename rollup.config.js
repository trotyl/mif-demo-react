import pkgInfo from '@mif/core/rollup/pkg-info'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import packageJson from './package.json'

export default {
  input: './esm5/index.js',
  output: {
    file: './demo-react.mif.js',
    format: 'system',
    name: 'mif',
  },
  external: ['moment'],
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      namedExports: {
        './node_modules/react-dom/index.js': ['render']
      }
    }),
    replace({
      'process.env.NODE_ENV': `'dev'`
    }),
    pkgInfo(packageJson),
  ]
}
