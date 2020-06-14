/*
 * @Author: liuyixue001
 * @Date: 2019-07-01 09:56:18
 * @LastEditors: liuyixue
 * @LastEditTime: 2020-05-18 12:02:13
 * @Description: file content
 */

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import IndexShow from '@/components/indexShow'

import Yxkc from '@/components/yxkc'
import Hyjs from '@/components/hyjs'
import Hyxs from '@/components/hyxs'
import Hybj from '@/components/hybj'
import Jxhd from '@/components/jxhd'
import Jxzy from '@/components/jxzy'


Vue.use(Router)

export default new Router({
  base: "/",
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/indexShow',
      name: 'indexShow',
      component: IndexShow
    },
    {
      path: '/yxkc',
      name: 'Yxkc',
      component: Yxkc
    },
    {
      path: '/hyjs',
      name: 'Hyjs',
      component: Hyjs
    },
    {
      path: '/hyxs',
      name: 'Hyxs',
      component: Hyxs
    },
    {
      path: '/hybj',
      name: 'Hybj',
      component: Hybj
    },
    {
      path: '/jxhd',
      name: 'Jxhd',
      component: Jxhd
    },
    {
      path: '/jxzy',
      name: 'Jxzy',
      component: Jxzy
    }
  ]
})
