import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import commonjs from "rollup-plugin-commonjs";
import resolve from 'rollup-plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import eslint from 'rollup-plugin-eslint';
import less from 'rollup-plugin-less';
import url from "rollup-plugin-url"

const writeoptions = {
  dest: "dist/assets"
}

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/tmPlayer.js',
    format: 'iife',
    name: 'bundle',
    sourcemap: true,
    exports: 'named'
  },
  plugins: [
    resolve({
      module: true,
      jsnext: true,
      main: true,
      browser: true,
      extensions: ['.js']
    }),
    less({
      output: 'dist/tmPlayer.css',
      insert: true
    }),
    commonjs({
      include: ['node_modules/**']
    }),
    eslint({
      include: ['src/**/*.js'] // 需要检查的部分
    }),
    babel({
      exclude: 'node_modules/**', // 排除引入的库
      runtimeHelpers: true // 配置runtime，不设置会报错
    }),
    serve({
      contentBase: './',
      historyApiFallback: true,
      host: 'localhost',
      port: 10001,
    }),
    globals(),
    url({
      output: './',
      limit: 5 * 1024, // inline files < 10k, copy files > 10k
      include: ["**/*.swf"], // defaults to .svg, .png, .jpg and .gif files
      emitFiles: true // defaults to true
    })
  ]
};