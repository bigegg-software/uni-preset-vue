/*
 * @Author: your name
 * @Date: 2020-03-06 10:38:45
 * @LastEditTime: 2020-03-06 15:12:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \uni-preset-vue\prompts.js
 */
module.exports = [{
  type: 'list',
  name: 'preprocessor',
  message: '请选择所使用的 css 预处理器',
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
},{
  type: 'input',
  name: 'appName',
  message: '请输入应用名称',
  default: ''
},{
  type: 'input',
  name: 'mpWeixinAppid',
  message: '请输入微信appid',
  default: ''
}
]
