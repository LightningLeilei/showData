/*
 * @Author: liuyixue
 * @Date: 2019-07-01 09:56:18
 * @LastEditors: liuyixue
 * @LastEditTime: 2020-06-14 21:59:47
 * @Description: file content
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'echarts/map/js/china'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import moment from 'moment'

Vue.config.productionTip = false
Vue.use(ViewUI);
Vue.use(moment);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
