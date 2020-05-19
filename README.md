<!--
 * @Author: liuyixue
 * @Date: 2019-07-01 09:56:18
 * @LastEditors: liuyixue
 * @LastEditTime: 2020-05-15 11:04:49
 * @Description: file content
--> 
# geo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## Work Tips

* 前端采用vue框架+view UI(从前的iview)组件库+echarts数据图形化展示。
* 可以先看一下git的用法，把远程仓库的东西拉到本地，今后开发建议都用git合作，比较方便。（内容有限，暂不采用分支模式。）
* 拉到本地后参看README.md文档，先npm install下载依赖；平时开发跑程序运行npm run dev ，即可在本地8080端口网页界面查看效果。采用热加载模式，边改边实时查看，不必反复运行。
* 主要关注/src文件夹，/src/assets文件夹存放涉及图片等文件，/src/components文件夹存放组件化网页（主要实现代码在此），/src/router文件存放路由寻址内容。整体渲染过程为index.html->main.js->App.vue->components/index.vue(或其他.vue文件）。
* [Vue官方文档实例](https://cn.vuejs.org/v2/guide/instance.html) 
* [View UI官方文档](https://www.iviewui.com/docs/introduce)
* [echarts官方文档实例](https://echarts.apache.org/examples/zh/index.html)


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
