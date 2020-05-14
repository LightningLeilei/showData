<template>
    <div>
        <div id="map" style="width:800px;height:600px"></div>
    </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
    this.echartsGeo(this)
  },
  methods: {
    echartsGeo(self) {
      let echarts = require('echarts')
      let myChart = echarts.init(document.getElementById('map'))
      let data = [
        { name: '北京', value: 177 },
        { name: '天津', value: 42 },
        { name: '河北', value: 102 },
        { name: '山西', value: 81 },
        { name: '内蒙古', value: 47 },
        { name: '辽宁', value: 67 },
        { name: '吉林', value: 82 },
        { name: '黑龙江', value: 66 },
        { name: '上海', value: 24 },
        { name: '江苏', value: 92 },
        { name: '浙江', value: 114 },
        { name: '安徽', value: 109 },
        { name: '福建', value: 116 },
        { name: '江西', value: 91 },
        { name: '山东', value: 119 },
        { name: '河南', value: 137 },
        { name: '湖北', value: 116 },
        { name: '湖南', value: 114 },
        { name: '重庆', value: 91 },
        { name: '四川', value: 125 },
        { name: '贵州', value: 62 },
        { name: '云南', value: 83 },
        { name: '西藏', value: 9 },
        { name: '陕西', value: 80 },
        { name: '甘肃', value: 56 },
        { name: '青海', value: 10 },
        { name: '宁夏', value: 18 },
        { name: '新疆', value: 67 },
        { name: '广东', value: 123 },
        { name: '广西', value: 59 },
        { name: '海南', value: 14 }
      ]
      let geoCoordMap = {}
      let mapFeatures = echarts.getMap('china').geoJson.features
      mapFeatures.forEach(element => {
        let name = element.properties.name
        geoCoordMap[name] = element.properties.cp // 经纬度
      })
      let convertData = function(data) {
        let res = []
        for (let i = 0; i < data.length; i++) {
          let geoCoord = geoCoordMap[data[i].name]
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            })
          }
        }
        return res
      }
      let option = {
        visualMap: {
          show: true,
          min: 0,
          max: 200,
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {
            // color: ['#3B5077', '#031525'] // 蓝黑
            // color: ['#ffc0cb', '#800080'] // 红紫
            // color: ['#3C3B3F', '#605C3C'] // 黑绿
            // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
            // color: ['#23074d', '#cc5333'] // 紫红
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            color: ['#1488CC', '#2B32B2'] // 浅蓝
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
          }
        },
        geo: {
          show: true,
          map: 'china',
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#031525',
              borderColor: '#3B5077'
            },
            emphasis: {
              areaColor: '#2B91B7'
            }
          }
        },
        series: [
          {
            name: 'point',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function(val) {
              return val[2] / 10
            },
            lable: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#05C3F9'
              }
            },
            zlevel: 6
          },
          {
            type: 'map',
            map: 'china',
            geoIndex: 0,
            lable: {
              normal: {
                show: true
              },
              emphasis: {
                show: true,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077'
              },
              emphasis: {
                areaColor: '#2B91B7'
              }
            },
            animation: false,
            data: data
          },
          {
            name: 'key',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin',
            lable: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#F62157'
              }
            },
            data: convertData(data)
          },
          {
            name: 'top',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data.sort(function(a, b) {
              return b.value - a.value
            }).slice(0, 5)),
            symbolSize: function(val) {
              return val[2] / 10
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            lable: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: 'yellow',
                shadowBlur: 10,
                shadowColor: 'yellow'
              }
            },
            zlevel: 1
          }

        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>
