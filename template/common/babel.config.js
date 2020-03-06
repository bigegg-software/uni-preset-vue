/*
 * @Author: your name
 * @Date: 2020-03-06 10:38:45
 * @LastEditTime: 2020-03-06 12:58:06
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \uni-preset-vue\template\common\babel.config.js
 */
const plugins = []

if (process.env.UNI_OPT_TREESHAKINGNG) {
  plugins.push(require('@dcloudio/vue-cli-plugin-uni-optimize/packages/babel-plugin-uni-api/index.js'))
}

if (process.env.UNI_PLATFORM === 'app-plus' && process.env.UNI_USING_V8) {
  const path = require('path')

  const isWin = /^win/.test(process.platform)

  const normalizePath = path => (isWin ? path.replace(/\\/g, '/') : path)

  const input = normalizePath(process.env.UNI_INPUT_DIR)
  try {
    plugins.push([
      require('@dcloudio/vue-cli-plugin-hbuilderx/packages/babel-plugin-console'),
      {
        file (file) {
          file = normalizePath(file)
          if (file.indexOf(input) === 0) {
            return path.relative(input, file)
          }
          return false
        }
      }
    ])
  } catch (e) {
    console.log(e)
  }
}

process.UNI_LIBRARIES = process.UNI_LIBRARIES || ['@dcloudio/uni-ui']
process.UNI_LIBRARIES.forEach(libraryName => {
  plugins.push([
    'import',
    {
      'libraryName': libraryName,
      'customName': (name) => {
        return `${libraryName}/lib/${name}/${name}`
      }
    }
  ])
})
module.exports = {
  presets: [
    [
      '@vue/app',
      {
        modules: 'commonjs',
        useBuiltIns: process.env.UNI_PLATFORM === 'h5' ? 'usage' : 'entry'
      }
    ]
  ],
  plugins
}
