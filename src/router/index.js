/*
 * @Author: liuyixue001
 * @Date: 2019-07-01 09:56:18
 * @LastEditors: liuyixue
 * @LastEditTime: 2020-05-14 11:29:03
 * @Description: file content
 */

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Geo from '@/components/geo'
import MapChina from '@/components/mapChina'
import IndexShow from '@/components/indexShow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/mapChina',
      name: 'MapChina',
      component: MapChina
    },
    {
      path: '/geo',
      name: 'geo',
      component: Geo
    },
    {
      path: '/indexShow',
      name: 'indexShow',
      component: IndexShow
    }
  ]
})
