import { babel } from '@rollup/plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import { nodeResolve, } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';

const config = {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },
  plugins: [
    nodeResolve({ preferBuiltins: false }),
    commonjs(),
    eslint(),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      plugins: [
        [
          "@babel/plugin-transform-runtime",
          {
            "regenerator": true
          }
        ]
      ]
    }),
    terser()
  ]
};

export default config;
