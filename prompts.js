/*
 * @Author: your name
 * @Date: 2020-03-06 10:38:45
 * @LastEditTime: 2020-03-06 11:19:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \uni-preset-vue\prompts.js
 */
module.exports = [{
  type: 'list',
  name: 'preprocessor',
  message: '请选择 css 预处理器 模板',
  choices: [{
    name: '不使用',
    value: 'none'
  },
  {
    name: 'Less',
    value: 'less'
  },
  {
    name: 'Sass/SCSS (with dart-sass)',
    value: 'dart-sass'
  },
  {
    name: 'Sass/SCSS (with node-sass)',
    value: 'node-sass'
  },
  {
    name: 'Stylus',
    value: 'Stylus'
  }],
  default: 'None'
}
]
