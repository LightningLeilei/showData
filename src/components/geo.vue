<template>
    <div>
        <div id="map" style="width:800px;height:600px"></div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
  // name:'geo',
  data() {
    return {
      // echarts: require('echarts')
    }
  },
  mounted() {
    this.echartsGeo(this)
  },
  methods: {
    echartsGeo(self) {
      let echarts = require('echarts')
      let _self = self
      $.get('https://geo.datav.aliyun.com/areas/bound/420100_full.json', function(geoJson) {
        echarts.registerMap('wh', geoJson)
        let myChart = echarts.init(document.getElementById('map'))
        let option = {
          title: {
            text: '武汉各区人口密度',
            subtext: '人口密度数据来自Wikipedia'
          },
          tooltip: {},
          visualMap: {
            min: 800,
            max: 50000,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
              color: ['lightskyblue', 'yellow', 'orangered']
            }
          },
          series: [{
            name: '武汉各区人口密度',
            type: 'map',
            mapType: 'wh', // 自定义扩展图表类型
            itemStyle: {
              normal: {
                label: {
                  show: true
                }
              },
              emphasis: {
                label: {
                  show: true
                }
              }
            },
            data: [
              {name: '汉南区', value: 20057.34},
              {name: '汉阳区', value: 15477.48},
              {name: '东西湖区', value: 31686.1},
              {name: '蔡甸区', value: 6992.6},
              {name: '硚口区', value: 44045.49},
              {name: '洪山区', value: 40689.64},
              {name: '黄陂区', value: 37659.78},
              {name: '江岸区', value: 45180.97},
              {name: '江汉区', value: 55204.26},
              {name: '江夏区', value: 21900.9},
              {name: '青山区', value: 4918.26},
              {name: '武昌区', value: 5881.84},
              {name: '新洲区', value: 4178.01}
              // {name: '北区', value: 2227.92},
              // {name: '大埔', value: 2180.98},
              // {name: '沙田', value: 9172.94},
              // {name: '西贡', value: 3368},
              // {name: '离岛', value: 806.98}
            ],
            // 自定义名称映射
            nameMap: {
              // 'Central and Western': '中西区',
              // 'Eastern': '东区',
              // 'Islands': '离岛',
              // 'Kowloon City': '九龙城',
              // 'Kwai Tsing': '葵青',
              // 'Kwun Tong': '观塘',
              // 'North': '北区',
              // 'Sai Kung': '西贡',
              // 'Sha Tin': '沙田',
              // 'Sham Shui Po': '深水埗',
              // 'Southern': '南区',
              // 'Tai Po': '大埔',
              // 'Tsuen Wan': '荃湾',
              // 'Tuen Mun': '屯门',
              // 'Wan Chai': '湾仔',
              // 'Wong Tai Sin': '黄大仙',
              // 'Yau Tsim Mong': '油尖旺',
              // 'Yuen Long': '元朗'
            }
          }]
        }
        myChart.setOption(option)
        myChart.on('click', function (params) {
          const p = params
          _self.$router.push({
            path: '/radar',
            query: p
          })
        })
      })
    }
  }
}
</script>
