<!--
 * @Author: liuyixue
 * @Date: 2019-07-01 09:56:18
 * @LastEditors: liuyixue
 * @LastEditTime: 2020-06-14 17:21:10
 * @Description: file content
 -->
<template>
  <div class="hello" id="pdfDOM">
    <div class="select" style="margin:10px">
      <Row type="flex" justify="center" >
        <Col span="4"></Col>
        <Col span="4">
          <span style="font-size:16px;float:right;margin:5px 10px">请选择时间段</span>
        </Col>
        <Col span="6">
          <Select style="width:240px" v-model="time_selected" @on-change="changeDate">
            <Option value="1">昨日</Option>
            <Option value="2">近7日</Option>
            <Option value="3">近30日</Option>
            <Option value="4">自定义</Option>
          </Select>
          </Col>
        <Col span="4">
          <div id="datePick" style="visibility:hidden;margin-left:30px">
            <DatePicker style="width:240px" type="daterange" placement="bottom-end" format="yyyy-MM-dd" placeholder="请选择"  @on-change="changeDateSelf" v-model="selfDate"></DatePicker>
          </div>
        </Col>
        <Col span="6"></Col>
      </Row>
    </div>
    <Card :bordered="false">
      <p style="font-size:20px">在线教学运行基本平稳，共运行课程{{totalAll.kc_total}}门，活跃教师{{totalAll.js_total}}人，活跃学生{{totalAll.xs_total}}人。其中学习空间每日运行课程平均{{totalAll.xx_kc}}门，每日活跃教师平均{{totalAll.xx_js}}人，每日活跃学生平均{{totalAll.xx_xs}}人；雨课堂每日运行课程平均{{totalAll.ykt_kc}}门，每日活跃教师平均{{totalAll.ykt_js}}人，每日活跃学生平均{{totalAll.ykt_xs}}人。</p>
    </Card>
    <Row style="margin:20px;" type="flex" justify="space-between">
      <Button style="background-color:#fb6e52;" @click="jumptoYxkc" id="yxkc">运行课程<div>{{total_btn.yxkc}}</div></Button>
      <Button style="background-color:#ffc655;" @click="jumptoHyjs" id="hyjs">活跃教师<div>{{total_btn.hyjs}}</div></Button>
      <Button style="background-color:#2dc7e9;" @click="jumptoHyxs" id="hyxs">活跃学生<div>{{total_btn.hyxs}}</div></Button>
      <Button style="background-color:#3cd7b8;" @click="jumptoHybj" id="hybj">活跃班级<div>{{total_btn.hybj}}</div></Button>
      <Button style="background-color:#f6b37f;" @click="jumptoJxhd" id="jxhd">教学互动<div>{{total_btn.jxhd}}</div></Button>
      <Button style="background-color:#8f9ae9;" @click="jumptoJxzy" id="jxzy">教学资源<div>{{total_btn.jxzy}}</div></Button>
    </Row>
    <Card :bordered="false">
      <div class="cardTitle"><Icon type="ios-square" />各院系运行课程</div>
      <Row>
        <Col span="12">
          <!-- <p>{{selfDate}}时段内运行课程排行前列的学院统计如图所示，其中运行量最高的学院为{{strings}}学院、{{strings}}学院、{{strings}}学院、{{strings}}学院和{{strings}}学院。</p> -->

          <span>{{selfDate}}时段内运行课程排行前列的学院统计如图所示，其中运行量最高的学院为</span>
          <span v-for="(item,idx) in total_yxkc.data1" :key ="idx" >{{item.value}}学院、</span>
        </Col>
        <Col span="12">
          <div id="map" style="height:300px"></div>
        </Col>
      </Row>
    </Card>
    <Card :bordered="false">
      <div class="cardTitle"><Icon type="ios-square" />教学互动</div>
      <Row>
        <Col span="12">
          <div id="map1" style="height:300px"></div>
        </Col>
        <Col span="12">
          <p>{{selfDate}}时段内教学过程中平均每日互动数量为{{total_jxhd.counts}}次，具体教学互动情况如图所示。</p>
        </Col>
        
      </Row>
    </Card>
    <Card :bordered="false">
      <div class="cardTitle"><Icon type="ios-square" />教学资源</div>
      <Row>
        <Col span="12">
          <span>{{selfDate}}时段内各课程教学资源上传数量如图所示，其中教学资源上传数量最多的课程为</span>
          <span v-for="(item,idx) in total_jxzy.data1" :key ="idx" >{{item.value}}、</span>
        </Col>
        <Col span="12">
          <div id="map2" style="height:300px"></div>
        </Col>
      </Row>
    </Card>
    <Card :bordered="false">
      <div class="cardTitle"><Icon type="ios-square" />到课率</div>
      <Row>
        <Col span="12">
          <div id="map3" style="height:300px"></div>
        </Col>
        <Col span="12">
          <p>{{selfDate}}时段内教学过程中平均到课率为{{num}}，具体到课率统计如图所示。 </p>
        </Col>
      </Row>
    </Card>
    <Card :bordered="false">
      <div class="cardTitle"><Icon type="ios-square" />最受欢迎课程</div>
      <Row>
        <Col span="12">
          <p>{{selfDate}}时段内最受学生们欢迎的课程为{{strings}}、{{strings}}、{{strings}}、{{strings}}和{{strings}}。参与学生人数较多的课程与其参与人次如图所示。 </p>
        </Col>
        <Col span="12">
          <div id="map4" style="height:300px"></div>
        </Col>
      </Row>
    </Card>
    <Card :bordered="false">
      <div class="cardTitle"><Icon type="ios-square" />学习空间（学习通）</div>
      <p>学习空间（学习通）共运行课程{{num}}门，平均每日运行课程{{num}}门，活跃教师{{num}}人，平均每日活跃教师{{num}}人，活跃学生{{num}}人，平均每日活跃学生{{num}}人。详细情况如下表所示: </p>
      <!-- <div style="width:80%"> -->
        <Row type="flex" justify="center">
          <Col span="4"></Col>
          <Col span="16">
            <Table border stripe :columns="XxkjTable.columns1" :data="XxkjTable.data1"/>
          </Col>
          <Col span="4"></Col>
          <!-- <Page
            :total="total"
            ref="pager"
            :page-size="limit"
            :page-size-opts="[10,30,50]"
            show-elevator
            show-total
            show-sizer
            placement="top"
            @on-change="changePage"
            @on-page-size-change="changePageSize"
          ></Page> -->
        </Row>
      <!-- </div> -->
    </Card>
    <Card :bordered="false">
      <div class="cardTitle"><Icon type="ios-square" />雨课堂</div>
      <p>雨课堂共运行课程{{num}}门，平均每日运行课程{{num}}门，活跃教师{{num}}人，平均每日活跃教师{{num}}人，活跃学生{{num}}人，平均每日活跃学生{{num}}人。详细情况如下表所示: </p>
        <Row type="flex" justify="center">
          <Col span="4"></Col>
          <Col span="16">
        <Table border stripe  :columns="YktTable.columns1" :data="YktTable.data1"/>
        </Col>
          <Col span="4"></Col>
          <!-- <Page
            :total="total"
            ref="pager"
            :page-size="limit"
            :page-size-opts="[10,30,50]"
            show-elevator
            show-total
            show-sizer
            placement="top"
            @on-change="changePage"
            @on-page-size-change="changePageSize"
          ></Page> -->
        </Row>
      </Card>
    <Card :bordered="false">
      <div class="cardTitle"><Icon type="ios-square" />运行监测</div>
      <p>根据本周运行监测：</p>
      <div class="p_inAll">
        <p>1.经监测，各个技术支持群本周出现个别用户咨询问题，集中在腾讯课堂摄像头显示、雨课堂统计到课率、大学MOOC的使用问题、网络缴费问题、雨课堂留学生登录问题等，中心均已协调解决。</p>
        <p>2.因疫情期间数据接口调整，导致学校中间库数据同步不及时。雨课堂本周修复了数据接口同步的问题。</p>
        <p>3.本周有老师在备课时反馈超星直播客户端对上传加载的图片格式判断不正确，不能很好的适配。超星给出解决方案：3月30日上午完成了直播客户端的最新更新：优化了加载图片时，对图片格式的判断；同时也修改了屏幕共享直播时，自动切换到图片的问题。</p>
      </div>
    </Card>
    <Row type="flex" justify="center">
      <Col span="10"></Col>
      <Col span="4">
        <Button style="background-color:#a40000;width:200px" @click="exportReport">点击导出简报</Button>
      </Col>
      <Col span="10"></Col>
    </Row>
  </div>
</template>

<script>
import moment from 'moment'
import { tbXxkjList,tbYktList } from '../js/tables'
// import { jsPDF } from '../js/jspdf.min.js'
import html2Canvas from 'html2canvas'
import jsPDF from 'jspdf'

//外部引入js变量
export default {
  name: 'HelloWorld',
  data () {
    const today = moment()
    return {
      today,
      //newData:time.timeData(),
      // openDateRange:true,
      // curRouter: this.$router.currentRoute.path,
      num: 99,
      // 选择日期或自定义
      time_selected: 0,
      selfDate: [],
      startTime:'',
      endTime:'',
      // 最上方统计数据
      totalAll:{ 
        kc_total: 100,
        xx_kc: 100,
        ykt_kc: 100,
        js_total: 101,
        xx_js: 101,
        ykt_js: 101,
        xs_total: 102,
        xx_xs: 102,
        ykt_xs: 102
      },
      // 下钻页面入口按钮 统计数据
      total_btn:{
        yxkc: 10,
        hyjs: 11,
        hyxs: 12,
        hybj: 13,
        jxhd: 14,
        jxzy: 15
      },
      // 各院系运行课程 统计数据
      total_yxkc:{
        data1:[{
          label:1,
          value:'sx'
          },
          {
          label:2,
          value:'yw'
          },
          {
          label:2,
          value:'enl'
          }
        ]
      },
      // 教学互动 统计数据
      total_jxhd:{
        counts: 0
      },
      // 教学资源 统计数据
      total_jxzy:{
        data1:[]
      },

      // 到课率 统计数据
      total_dkl:{},

      // 最受欢迎课程 统计数据
      total_hykc:{},
      strings: 'here',
      total: 7,
      // limit: parseInt(pageSize) || 10, // 每页条数
      // offset: parseInt(pageOffset) || 0, // 每页的查询索引
      XxkjTable:{
        columns1: tbXxkjList.columns1,
        data1: tbXxkjList.data1
      },
      YktTable:{
        columns1: tbYktList.columns1,
        data1: tbYktList.data1
      }
      
    }
  },
  mounted() {
    this.echartsGeo()
  },
  methods: {
    convertImgToBase64 (url, callback, outputFormat) {
      let canvas = document.createElement('CANVAS')
      let ctx = canvas.getContext('2d')
      let img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = function () {
        canvas.height = img.height
        canvas.width = img.width
        ctx.drawImage(img, 0, 0)
        let dataURL = canvas.toDataURL(outputFormat || 'image/jpeg')
        callback.call(this, dataURL)
        canvas = null
      }
      img.src = url
      console.log('convertImgToBase64')
    },
    getPdf (pdfDom) {
      let title = this.htmlTitle
      html2Canvas(pdfDom, {
        allowTaint: true
      }).then(function (canvas) {
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        let pageHeight = contentWidth / 592.28 * 841.89
        let leftHeight = contentHeight
        let position = 0
        let imgWidth = 595.28
        let imgHeight = 592.28 / contentWidth * contentHeight
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        let PDF = new JsPDF('', 'pt', 'a4')
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save(title + '.pdf')
      })
    },
    getBase64Pdf () {
      let _this = this
      this.convertImgToBase64(this.imgSrc, function (base64ImgSrc) {
        console.log('here')
        _this.$refs.img1.src = base64ImgSrc
        let pdfDom = _this.$refs.pdfDom
        _this.getPdf(pdfDom)
      })
    },
    getOptionsData() {
      let res = [
        {xymc:'经济',pl:'52'},
        {xymc:'化工',pl:'39'}
        ]
      this.total_yxkc.data1 = []
      for(let i=0; i< res.length;i++){
        this.total_yxkc.data1.push({
          label:res[i].pl,
          value:res[i].xymc
        })
        this.total_jxzy.data1.push({
          label:res[i].pl,
          value:res[i].xymc
        })
        
      }
    },
    // 日期下拉菜单
    changeDate(val) {
      let tempD
      if(val == 1){ // 昨日
      tempD = 1
      }else if(val == 2) { // 近7日
      tempD = 7
      }else if(val == 3) {
        tempD = 30
      }else if(val == 4) {
        document.getElementById("datePick").style.visibility="visible"
      }
      if(tempD){
        // 处理“近X天”的日期，end时间为昨日
        this.startTime = moment().subtract(tempD,'d').format("YYYY-MM-DD")
        this.endTime = moment().subtract(1,'d').format("YYYY-MM-DD")
        console.log(this.startTime)
        console.log(this.endTime)
        // ---------- 随后调用更新整个页面数据的方法this.updateIndexData(this.startTime,this.endTime)
      }
    
    },
    updateIndexData(start,end) {
      //数据传输
      $.ajax({
        type : "POST",
        url : "/zxjx/teach-active/runCourse?startTime="+start+"&endTime="+end+"",
        data : {
            //id : id,
        },
        success : function(data) {
            alert(data);
        },
        error : function(){
            alert("错误");
        }
      });

    },
    // 自定义日期
    changeDateSelf(d) {
      // alert(d[0])
      // alert('7d before'+ moment(d[0]).subtract(7,'d').format("YYYY-MM-DD"))
      this.startTime = moment(d[0]).format("YYYY-MM-DD")
      this.endTime = moment(d[1]).format("YYYY-MM-DD")
      // alert("startime"+this.selfDate[0])
      console.log(this.startTime)
      console.log(this.endTime)
      // ---------- 随后调用更新整个页面数据的方法
    },
    // 带日期跳转
    jumptoYxkc() {
      const params = {
        start:this.startTime,
        end:this.endTime
      }
      this.$router.push({
        path: '/yxkc',
        query: params
      })
    },
    jumptoHyjs() {
      this.$router.push({
        path: '/hyjs'
      })
    },
    jumptoHyxs() {
      this.$router.push({
        path: '/hyxs'
      })
    },
    jumptoHybj() {
      this.$router.push({
        path: '/hybj'
      })
    },
    jumptoJxhd() {
      this.$router.push({
        path: '/jxhd'
      })
    },
    jumptoJxzy() {
      this.$router.push({
        path: '/jxzy'
      })
    },
    echartsGeo() {
      let echarts = require('echarts')
      let myChart = echarts.init(document.getElementById('map'))
      let myChart1 = echarts.init(document.getElementById('map1'))
      let myChart2 = echarts.init(document.getElementById('map2'))
      let myChart3 = echarts.init(document.getElementById('map3'))
      let myChart4 = echarts.init(document.getElementById('map4'))
      let tempData = [
        {xymc:'经济',pl:'52'},
        {xymc:'化工',pl:'39'},
        {xymc:'科学',pl:'32'},
        {xymc:'软件',pl:'82'},
        {xymc:'语文',pl:'157'},
        {xymc:'数学',pl:'73'},
        {xymc:'自然',pl:'30'},
        {xymc:'地理',pl:'112'}
        ]

      let option = {
        dataset: {
          source: [['amount', 'product']]
        },
        grid: {containLabel: true},
        xAxis: {name: 'amount'},
        yAxis: {type: 'category'},
        visualMap: {
          // 视觉效果数值以横坐标amount为基准
          orient: 'horizontal',
          left: 'center',
          min: 0,
          max: 100,
          text: ['少数', '多数'],
          // Map the score column to color
          dimension: 0,
          inRange: {
              color: ['#D7DA8B', '#E15457']
          }
        },
        series: [
          {
            type: 'bar',
            encode: {
              // Map the "amount" column to X axis.
              x: 'amount',
              // Map the "product" column to Y axis
              y: 'product'
            }
          }
        ]
      };
      let option1 = {
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '30%']
        },
        visualMap: {
          type: 'piecewise',
          show: false,
          dimension: 0,
          seriesIndex: 0,
          pieces: []
        },
        series: [
          {
            type: 'line',
            smooth: 0.6,
            symbol: 'none',
            lineStyle: {
              color: 'green',
              width: 5
            },
            markLine: {
              symbol: ['none', 'none'],
              label: {show: false},
              lineStyle:{
                color:'green',
                width: 1.5
              },
              data: []
            },
            areaStyle: {},
            data: []
          }
        ]
      };
      let option2 = {
        color: ['#3398DB'],
        xAxis: {
            type: 'category',
            // boundaryGap:false,
            axisLabel:{
              interval: 0,
              rotate: 50
            }, 
            data: ['yi超级长的名字', 'Tue长机场', '长名字第三个', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: ['120', '200', '150', '80', '70', '110', '130'],
            type: 'bar'
        }]
      };
      let option3 = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'line',
            areaStyle: {}
        }]
      };
      tempData.forEach(item => {
        option.dataset.source.push([item.pl,item.xymc]);
        option1.series[0].data.push([item.xymc,item.pl]);
      });
      for(let i=0; i <tempData.length; i=i+2){
        option1.visualMap.pieces.push({
          gt: i+1,
          lt: i+2,
          color: 'rgba(100, 180, 0, 0.8)'
        })
        option1.series[0].markLine.data.push({xAxis:i},{xAxis: i+1})
      }
      console.log(option2.series[0].data)
      myChart.setOption(option)
      myChart1.setOption(option1)
      myChart2.setOption(option2)
      myChart3.setOption(option3)
      myChart4.setOption(option2)

    },
    changePage (d) {
        let self = this
        self.offset = self.limit * (d - 1)
        self.getList()
      },
    changePageSize (d) {
      let self = this
      self.limit = d
      if (self.$refs['pager'].currentPage === 1) {
        self.getList()
      }
    },
    exportReport() {
      // this.getBase64Pdf()
    }
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 首个卡片字号不同，略大 */
.ivu-card{
  margin:20px;
  font-size: 18px;
}

/* 首行缩进 */
p{ 
  text-indent:2em;
  line-height: 2;
}
.p_inAll p{
  text-indent:0;
  margin-left:2em;
  margin-right: 1em;
}
/* 修改按钮格式 */
[type=button]{
  width: 160px;
  height: 65px;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}
.cardTitle{
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: bold;
  color: #255aaa;
}
.ivu-icon{
  color: #255aaa;
  line-height: 0;
  margin-right: 10px;
  vertical-align: 0;
}

</style>
