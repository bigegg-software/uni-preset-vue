/*
 * @Author: your name
 * @Date: 2020-03-06 10:38:45
 * @LastEditTime: 2020-03-06 12:50:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \uni-preset-vue\generator.js
 */
const fs = require('fs')
const path = require('path')

const isBinary = require('isbinaryfile')

async function generate (dir, files, base = '', rootOptions = {}) {
  const glob = require('glob')

  glob.sync('**/*', {
    cwd: dir,
    nodir: true
  }).forEach(rawPath => {
    const sourcePath = path.resolve(dir, rawPath)
    const filename = path.join(base, rawPath)

    if (isBinary.sync(sourcePath)) {
      files[filename] = fs.readFileSync(sourcePath) // return buffer
    } else {
      let content = fs.readFileSync(sourcePath, 'utf-8')
      if (path.basename(filename) === 'manifest.json') {
        content = content.replace('{{name}}', rootOptions.projectName || '')
      }
      if (filename.charAt(0) === '_' && filename.charAt(1) !== '_') {
        files[`.${filename.slice(1)}`] = content
      } else if (filename.charAt(0) === '_' && filename.charAt(1) === '_') {
        files[`${filename.slice(1)}`] = content
      } else {
        files[filename] = content
      }
    }
  })
}

module.exports = (api, options, rootOptions) => {
  api.extendPackage(pkg => {
    return {
      dependencies: {
        'regenerator-runtime': '^0.12.1',// 锁定版本，避免高版本在小程序中出错
        '@dcloudio/uni-helper-json': '*'
      },
      devDependencies: {
        'postcss-comment': '^2.0.0'
      }
    }
  })
  switch(options.preprocessor){
    case("less"):{
      api.extendPackage(pkg => {
        return {
          devDependencies: {
            "less": "^3.11.1",
            "less-loader": "^5.0.0",
          }
        }
      })
      break
    }
    case("dart-sass"):{
      api.extendPackage(pkg => {
        return {
          devDependencies: {
            'sass-loader': '^8.0.2',
            'dart-sass': '^1.25.0',
          }
        }
      })
      break
    }
    case("node-sass"):{
      api.extendPackage(pkg => {
        return {
          devDependencies: {
            'sass-loader': '^8.0.2',
            'node-sass': '^4.13.1',
          }
        }
      })
      break
    }
  }

  api.render(async function (files) {
    Object.keys(files).forEach(name => {
      delete files[name]
    })

    const template = options.repo || options.template

    const base = 'src'
    await generate(path.resolve(__dirname, './template/common'), files)
    await generate(path.resolve(__dirname, './template/default'), files, base, rootOptions)
  })
}
