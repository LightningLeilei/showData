<!--
 * @Author: liuyixue
 * @Date: 2019-07-01 09:56:18
 * @LastEditors: liuyixue
 * @LastEditTime: 2020-06-14 22:49:32
 * @Description: file content
 -->
<template>
  <div class="hello">
    <div class="select" style="margin:10px">
      <Row type="flex" justify="center" >
        <Col :xs="24" :sm="24" :md="24" :lg="4"></Col>
        <Col :xs="20" :sm="24" :md="20" :lg="4">
          <span style="font-size:16px;float:right;margin:5px 10px">请选择时间段</span>
        </Col>
        <Col :xs="20" :sm="24" :md="12" :lg="6">
          <Select style="width:240px;margin-right:30px" id="timeSelected" v-model="time_selected" @on-change="changeDate">
            <Option value="1">昨日</Option>
            <Option value="2" selected="selected">近7日</Option>
            <Option value="3">近30日</Option>
            <Option value="4">自定义</Option>
          </Select>
          </Col>
        <Col :xs="20" :sm="24" :md="12" :lg="4">
          <!-- <div id="datePick" style="visibility:hidden"> -->
        <div id="datePick">
            <DatePicker style="width:240px" type="daterange" placement="bottom-end" format="yyyy-MM-dd" placeholder="请选择" :options="optionsForDate"  @on-change="changeDateSelf" v-model="selfDate"></DatePicker>
          </div>
        </Col>
        <Col :xs="20" :sm="24" :md="24" :lg="6"></Col>
      </Row>
    </div>
    <Card :bordered="false">
      <p style="font-size:20px;text-align:justify" >{{startTime}}至{{endTime}}时段内，我校在线教学运行基本平稳，共运行课程{{totalAll.kc_total}}门，活跃教师{{totalAll.js_total}}人，活跃学生{{totalAll.xs_total}}人。其中学习空间每日运行课程平均{{totalAll.xx_kc}}门，每日活跃教师平均{{totalAll.xx_js}}人，每日活跃学生平均{{totalAll.xx_xs}}人；雨课堂每日运行课程平均{{totalAll.ykt_kc}}门，每日活跃教师平均{{totalAll.ykt_js}}人，每日活跃学生平均{{totalAll.ykt_xs}}人。</p>
    </Card>
    <Row style="margin:20px;" type="flex" justify="space-between">
      <Button style="background-color:#fb6e52;" @click="jumptoYxkc" id="yxkc">运行课程<div>{{total_btn.yxkc}}</div></Button>
      <Button style="background-color:#ffc655;" @click="jumptoHyjs" id="hyjs">活跃教师<div>{{total_btn.hyjs}}</div></Button>
      <Button style="background-color:#2dc7e9;" @click="jumptoHyxs" id="hyxs">活跃学生<div>{{total_btn.hyxs}}</div></Button>
      <!-- <Button style="background-color:#3cd7b8;" @click="jumptoHybj" id="hybj">活跃班级<div>{{total_btn.hybj}}</div></Button> -->
      <Button style="background-color:#f6b37f;" @click="jumptoJxhd" id="jxhd">教学互动<div>{{total_btn.jxhd}}</div></Button>
      <!-- <Button style="background-color:#8f9ae9;" @click="jumptoJxzy" id="jxzy">教学资源<div>{{total_btn.jxzy}}</div></Button> -->
      <!-- <Button style="background-color:#fb6e52;" to="./yxkc">运行课程<div>{{55}}</div></Button> -->
    </Row>
    <Card :bordered="false">
      <div class="cardTitle"><Icon type="ios-square" />各院系运行课程</div>
      <Row style="text-align:justify">
        <Col :xs="24" :sm="24" :md="24" :lg="12" >
          <p><span>{{startTime}}至{{endTime}}时段内运行课程排行前列的学院为</span>
          <span v-for="(item,idx) in total_yxkc.data1" :key ="idx" >{{item.value}}，</span>
          <span>统计情况如图所示。</span>
          </p>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="12">
          <div id="map" style="height:300px"></div>
        </Col>
      </Row>
    </Card>
    <Card :bordered="false">
      <div class="cardTitle"><Icon type="ios-square" />教学互动</div>
      <Row>
        <Col :xs="24" :sm="24" :md="24" :lg="12">
          <p>{{startTime}}至{{endTime}}时段内教学过程中平均每日互动数量为{{total_jxhd.counts}}次，具体教学互动情况如图所示。</p>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="12">
          <div id="map1" style="height:300px"></div>
        </Col>
      </Row>
    </Card>
    <Card :bordered="false" >
      <div class="cardTitle"><Icon type="ios-square" />教学资源</div>
      <Row>
        <Col :xs="24" :sm="24" :md="24" :lg="12">
          <p><span>{{startTime}}至{{endTime}}时段内各课程教学资源上传数量如图所示，其中教学资源上传数量最多的课程为</span>
          <span v-for="(item,idx) in total_jxzy.data1" :key ="idx" >{{item.value}},</span>
          </p>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="12">
          <div id="map2" style="height:300px"></div>
        </Col>
      </Row>
    </Card>
    <Card :bordered="false">
      <div class="cardTitle"><Icon type="ios-square" />到课率</div>
      <Row>
        <Col :xs="24" :sm="24" :md="24" :lg="12">
          <p>{{startTime}}至{{endTime}}时段内教学过程中平均到课率为{{total_dkl.counts}}，具体到课率统计如图所示。 </p>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="12">
          <div id="map3" style="height:300px"></div>
        </Col>
      </Row>
    </Card>
    <Card :bordered="false">
      <div class="cardTitle"><Icon type="ios-square" />最受欢迎课程</div>
      <Row>
        <Col :xs="24" :sm="24" :md="24" :lg="12">
         <p>
         <span>{{startTime}}至{{endTime}}时段内最受学生们欢迎的课程为</span>
          <span v-for="(item,idx) in total_hykc.data1" :key ="idx" >{{item.value}}，</span>
          参与学生人数较多的课程与其参与人次如图所示。</p>
        </Col>
        <Col :xs="24" :sm="24" :md="24" :lg="12">
          <div id="map4" style="height:300px"></div>
        </Col>
      </Row>
    </Card>
    <Card :bordered="false">
      <div class="cardTitle"><Icon type="ios-square" />学习空间（学习通）</div>
      <p>学习空间（学习通）共运行课程{{total_xxkj.yxkcAll}}门，平均每日运行课程{{total_xxkj.yxkc}}门，活跃教师{{total_xxkj.hyjsAll}}人，平均每日活跃教师{{total_xxkj.hyjs}}人，活跃学生{{total_xxkj.hyxsAll}}人，平均每日活跃学生{{total_xxkj.hyxs}}人。详细情况如下表所示: </p>
        <Row type="flex" justify="center">
          <Col span="4"></Col>
          <Col span="16">
            <Table border stripe :columns="XxkjTable.columns1" :data="XxkjTable.data1"/>
          </Col>
          <Col span="4"></Col>
        </Row>
    </Card>
    <Card :bordered="false">
      <div class="cardTitle"><Icon type="ios-square" />雨课堂</div>
      <p>雨课堂共运行课程{{total_ykt.yxkcAll}}门，平均每日运行课程{{total_ykt.yxkc}}门，活跃教师{{total_ykt.hyjsAll}}人，平均每日活跃教师{{total_ykt.hyjs}}人，活跃学生{{total_ykt.hyxsAll}}人，平均每日活跃学生{{total_ykt.hyxs}}人。详细情况如下表所示: </p>
        <Row type="flex" justify="center">
          <Col span="4"></Col>
          <Col span="16">
        <Table border stripe  :columns="YktTable.columns1" :data="YktTable.data1"/>
        </Col>
          <Col span="4"></Col>
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
      <Col :xs="6" :sm="8" :md="8" :lg="10"></Col>
      <Col :xs="12" :sm="8" :md="8" :lg="4">
        <Button style="background-color:#a40000;width:200px" @click="exportReport">点击导出简报</Button>
      </Col>
      <Col :xs="6" :sm="8" :md="8" :lg="10"></Col>
    </Row>
  </div>
</template>

<script>
import moment from 'moment'
import { tbXxkjList,tbYktList } from '../js/tables'
//外部引入js变量
export default {
  name: 'HelloWorld',
  data () {
    const today = moment()
    return {
      today,
      num: 99,
      // 选择日期或自定义
      time_selected: 0,
      selfDate: [],
      startTime:'',
      endTime:'',
      // 最上方统计数据
      totalAll:{ 
        kc_total: '',
        xx_kc: '',
        ykt_kc: '',
        js_total: '',
        xx_js: '',
        ykt_js: '',
        xs_total: '',
        xx_xs: '',
        ykt_xs: '',
      },
      // 下钻页面入口按钮 统计数据
      total_btn:{
        yxkc: '',
        hyjs: '',
        hyxs: '',
        hybj: '',
        jxhd: '',
        jxzy: ''
      },
      // 各院系运行课程 统计数据
      total_yxkc:{
        data1:[{
          label:'',
          value:''
          }
        ]
      },
      // 教学互动 统计数据
      total_jxhd:{
        counts: ''
      },
      // 教学资源 统计数据
      total_jxzy:{
        data1:[
          {
          label:'',
          value:''
          }
        ]
      },
      // 到课率 统计数据
      total_dkl:{
         counts: ''
      },
      // 最受欢迎课程 统计数据
      total_hykc:{
        data1:[
        ]
      },
      //学习空间（学习通）
      total_xxkj:{ 
        yxkcAll: '',
        yxkc: '',
        hyjsAll: '',
        hyjs: '',
        hyxsAll: '',
        hyxs: '',
      },
      //雨课堂
      total_ykt:{ 
        yxkcAll: '',
        yxkc: '',
        hyjsAll: '',
        hyjs: '',
        hyxsAll: '',
        hyxs: '',
      },
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
      },
      optionsForDate: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now();
        }
      }
    }
  },
  mounted() {
    this.echartsGeo()
    this.changeDate(2)
  },
  methods: {
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
        this.selfDate[0] = this.startTime
        this.selfDate[1] = this.endTime
        // console.log("hhhhhh")
        //window.location.reload()
        //selfDate需要处理
        //更新整个页面数据的方法(遗留问题：数据可以获取但无法页面更新)
        this.updateIndexData(this.startTime,this.endTime)
      } 
    },
    updateIndexData(start,end){
      let _self = this;
    //获得主页面最顶部概括介绍中的数据，其中funN按所需数据的顺序命名
    var fun1 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active/runCourse/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        fun2 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active/runTeacherNumber/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        fun3 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active-participant/runStudentNumber/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        fun4 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active/getRunCourseAvgNumber/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        fun5 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active/getRunTeacherAvgNumber/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        fun6 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active-participant/runXxkjAvgStudentNumber/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        fun7 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active/getYKTCourseAvgNumber/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        fun8 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active/getYKTTeacherAvgNumber/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        fun9 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active-participant/runYktAvgStudentNumber/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        //各院系运行课程的数据获取：返回的数据类型为二维数组
        fun10 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active/getRunCourseXYFq/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        //教学互动
        fun11 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active-participant/runAvgHdNumber/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        //教学资源
        fun12 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-resource/runMaxCourseFiveNumber/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        //到课率
        fun13 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active-participant/runAvgDkl/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        //最受欢迎课程
        fun14 = $.ajax({url: "http://172.18.4.32:8081/zxjx/course-info/popCourseName/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        //教学互动图表数据
        fun15 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active-participant/runEveryDayHdNumber/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        //教学资源图表数据
        fun16 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-resource/runCourseResourceNumber/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
         //到课率图表数据
        fun17 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active-participant/runEveryDayAvgDkl/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        //学习空间（学习通）
        fun18 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active/getCxxCourseTeacher/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        fun19 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active/getCxxCourse2Teacher/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        fun20 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active/getCxxCourse4Teacher/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        fun21 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active-participant/runSumAndAvgNumber/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        fun22 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active-participant/runAvgNumber/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        // //学习空间（学习通）表格数据
        fun23 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active/getBiaoCxx192/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        //雨课堂
        fun24 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active/getYctCourseTeacher/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        fun25 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active/getYctCourse2Teacher/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        fun26 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active/getYctCourse4Teacher/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        fun27 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active-participant/runYctSumAndAvgNumber/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        fun28 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active-participant/runYctSumAndAvgNumber/"+start+"/"+end+"",type:'POST',dataType:'JSON'}),
        //雨课堂表格数据
        fun29 = $.ajax({url: "http://172.18.4.32:8081/zxjx/teach-active/getBiaoYct1002/"+start+"/"+end+"",type:'POST',dataType:'JSON'});
        //$.when(fun1,fun2,fun3,fun4,fun5,fun6,fun7,fun8,fun9,fun10,fun11,fun12,fun13,fun14,fun15,fun16,fun17,fun18,fun19,fun20,fun21,fun22,fun23,fun24,fun25,fun26,fun27,fun28,fun29).then(function(data1,data2,data3,data4,data5,data6,data7,data8,data9,data10,data11,data12,data13,data14,data15,data16,data17,data18,data19,data20,data21,data22,data23,data24,data25,data26,data27,data28,data29){        
        $.when(fun1,fun2,fun3,fun4,fun5,fun6,fun7,fun8,fun9,fun10,fun11,fun12,fun14,fun15,fun16,fun17,fun18,fun19,fun20,fun21,fun22,fun23,fun24,fun25,fun26,fun27,fun28,fun29).then(function(data1,data2,data3,data4,data5,data6,data7,data8,data9,data10,data11,data12,data14,data15,data16,data17,data18,data19,data20,data21,data22,data23,data24,data25,data26,data27,data28,data29){        
        //首页面下钻按钮的赋值
        _self.total_btn.yxkc=data1[0];
        _self.total_btn.hyjs=data2[0];
        _self.total_btn.hyxs=data3[0];
        //_self.total_btn.hybj
        _self.total_btn.jxhd=data11[0];
        //_self.total_btn.jxzy
        //成功回调，所有请求正确返回时调用，完成相应赋值
        _self.totalAll.kc_total=data1[0];
        _self.totalAll.js_total=data2[0];
        _self.totalAll.xs_total=data3[0];
        _self.totalAll.xx_kc=data4[0];
        _self.totalAll.xx_js=data5[0];
         _self.totalAll.xx_xs=data6[0];
        _self.totalAll.ykt_kc=data7[0];
        _self.totalAll.ykt_js=data8[0];
        _self.totalAll.ykt_xs=data9[0];
        _self.total_jxhd.counts=data11[0];
        //_self.total_dkl.counts=data13[0];
        _self.total_xxkj.yxkcAll=data18[0][0].ckc;
        _self.total_xxkj.yxkc=data19[0][0].avgckc;
        _self.total_xxkj.hyjsAll=data18[0][0].tzrs;
        _self.total_xxkj.hyjs=data20[0][0].avgtrs;
        _self.total_xxkj.hyxsAll=data21[0];   
        // _self.total_xxkj.hyxs=data22[0];
        _self.total_ykt.yxkcAll=data24[0][0].ckc;
        _self.total_ykt.yxkc=data25[0][0].avgckc;
        _self.total_ykt.hyjsAll=data24[0][0].tzrs;
        _self.total_ykt.hyjs=data26[0][0].avgtrs;
        _self.total_ykt.hyxsAll=data27[0];
        _self.total_ykt.hyxs=data28[0];
        //重置表格中的数据
        _self.XxkjTable.data1 =[]     
        for(var i=0;i<data23[0].length;i++){
            _self.XxkjTable.data1.push(data23[0][i])
        }
        _self.YktTable.data1= []
        for(var i=0;i<data29[0].length;i++){
            _self.YktTable.data1.push(data29[0][i])
        }
        //各院系运行课程、教学资源、最受欢迎课程模块的赋值
        _self.total_yxkc.data1=[]
        _self.total_jxzy.data1=[]
        _self.total_hykc.data1=[]
        //各院系运行课程文字描述部分赋值
          for(let i=0;i<9&&i<data10[0].length;i++){
              _self.total_yxkc.data1.push({
                label:data10[0][i].pl,
                value:data10[0][i].xymc
              })
            }
            _self.echartsGeo(data10,data14,data15,data16,data17)            
           for(let i=0;i<5&&i<data12[0].length;i++){
              _self.total_jxzy.data1.push({
              label:data12[0][i].zysl,
              value:data12[0][i].kcmc
            })
          }
            for(let i=0;i<5&&i<data10[0].length;i++){
                _self.total_hykc.data1.push({
                  label:data14[0][i].zrs,
                  value:data14[0][i].kcmc
                })
            }
    },function(){
        //失败回调，任意一个请求失败时返回
        console.log('getDataError');
    })  
    },
    // 自定义日期
    changeDateSelf(d) {
      this.startTime = moment(d[0]).format("YYYY-MM-DD")
      this.endTime = moment(d[1]).format("YYYY-MM-DD")
      this.selfDate[0] = this.startTime
      this.selfDate[1] = this.endTime
      this.updateIndexData(this.startTime,this.endTime)
    },
    // 带日期跳转
    jumptoYxkc() {
      const params = {
        start:this.startTime,
        end:this.endTime
      }
      let newjumptoYxkc = this.$router.resolve({
        path: '/yxkc',
        query: params
      })
      window.open(newjumptoYxkc.href,'_blank');
    },
    jumptoHyjs() {
      const params = {
        start:this.startTime,
        end:this.endTime
      }
      let newjumptoHyjs = this.$router.resolve({
        path: '/hyjs',
        query: params
      })
      window.open(newjumptoHyjs.href,'_blank');
    },
    jumptoHyxs() {
      const params = {
        start:this.startTime,
        end:this.endTime
      }
      let newjumptoHyxs = this.$router.resolve({
        path: '/hyxs',
        query: params
      })
      window.open(newjumptoHyxs.href,'_blank');
    },
    jumptoHybj() {
      const params = {
        start:this.startTime,
        end:this.endTime
      }
      let newjumptoHybj = this.$router.resolve({
        path: '/hybj',
        query: params
      })
      window.open(newjumptoHybj.href,'_blank');
    },
    jumptoJxhd() {
      const params = {
        start:this.startTime,
        end:this.endTime
      }
      let newjumptoJxhd = this.$router.resolve({
        path: '/jxhd',
        query: params
      })
      window.open(newjumptoJxhd.href,'_blank');
    },
    jumptoJxzy() {
      const params = {
        start:this.startTime,
        end:this.endTime
      }
      let newjumptoJxzy = this.$router.resolve({
        path: '/jxzy',
        query: params
      })
      window.open(newjumptoJxzy.href,'_blank');
    },
    echartsGeo(data10,data14,data15,data16,data17) {
      let echarts = require('echarts')
      let myChart = echarts.init(document.getElementById('map'))
      let myChart1 = echarts.init(document.getElementById('map1'))
      let myChart2 = echarts.init(document.getElementById('map2'))
      let myChart3 = echarts.init(document.getElementById('map3'))
      let myChart4 = echarts.init(document.getElementById('map4'))
      let option = {
        dataset: {
          source: [
             [ 'amount', 'product']
          ]
        },
        grid: {containLabel: true},
        xAxis: {
          //name: '数量'
        },
        yAxis: {
           type: 'category'
        },
        // visualMap: {
        //   // 视觉效果数值以横坐标amount为基准
        //   orient: 'horizontal',
        //   left: 'center',
        //   min: 0,
        //   max: 500,
        //   text: ['High Score', 'Low Score'],
        //   // Map the score column to color
        //   dimension: 0,
        //   inRange: {
        //       color: ['#D7DA8B', '#E15457']
        //   }
        // },
        series: [
          {
            type: 'bar',
            encode: {
              // Map the "amount" column to X axis.
              x: 'amount',
              // Map the "product" column to Y axis
              y: 'product'
            },
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
          pieces: [{
            gt: 1,
            lt: 3,
            color: 'rgba(0, 180, 0, 0.5)'
          }, {
            gt: 5,
            lt: 7,
            color: 'rgba(0, 180, 0, 0.5)'
          }]
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
                width:1.5
              },
              data: [
             ]
            },
            areaStyle: {},
            data: []
          }
        ]};
      let option2 = {
        color: ['#3398DB'],
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [{
          type: 'bar',
            data: []
        }]};
      let option3 = {
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [],
            type: 'line',
            areaStyle: {}
        }]
        };
      let option4 = {
        color: ['#3398DB'],
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [{
          type: 'bar',
            data: []
        }]
        };
      //第一个图形的加载
      //图中数据的填充
      myChart.showLoading(); // 数据加载完之前先显示一段简单的loading动画
      myChart1.showLoading();
      myChart2.showLoading();
      myChart3.showLoading();
      myChart4.showLoading();
      var item_kcmc =[]
      var item_zysl =[]
      if (data10&&data14&&data15&&data16) {
          data10[0].forEach(item => {
            option.dataset.source.push([item.pl,item.xymc])
          });
          data15[0].forEach(item => {
            option1.series[0].data.push([item.cysj,item.hd])
          });
          data16[0].forEach(item => {
            option2.xAxis.data.push(item.kcmc)
            option2.series[0].data.push(item.zysl)
          });
          data17[0].forEach(item => {
            option3.xAxis.data.push(item.hdsj)
            let temp = item.pjedaydkl
            let temp1 = temp.split('.')
            option3.series[0].data.push(temp1[0])
          });
          data14[0].forEach(item => {
            option4.xAxis.data.push(item.kcmc)
            option4.series[0].data.push(item.zrs)
          });
          myChart.hideLoading(); // 隐藏加载动画
          myChart1.hideLoading(); 
          myChart2.hideLoading(); 
          myChart3.hideLoading(); 
          myChart4.hideLoading(); 
          myChart.setOption(option)   //加载数据图表
          myChart1.setOption(option1)
          myChart2.setOption(option2)
          myChart3.setOption(option3)
          myChart4.setOption(option4)
        }
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
      // alert('还未实现')
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
  text-align: justify;
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
