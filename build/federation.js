const projectName = 'wsfComp' // 项目名称
const filename = 'remoteEntry.js' // 暴露入口文档
const component = { // 暴露的组件
  './Demo1': '@/component/demo/demo1'
}

const page = { // 暴露的页面

}

const remotes = { // 引入的内容
  'wsfComp':'wsfComp@http:localhost:19999/remoteEntry.js'
}

module.exports = {
  component,
  page,
  remotes,
  projectName,
  filename
}

