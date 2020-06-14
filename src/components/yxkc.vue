<!--
 * @Author: liuyixue
 * @Date: 2020-05-18 11:52:49
 * @LastEditors: liuyixue
 * @LastEditTime: 2020-06-14 22:41:10
 * @Description: file content
--> 
<template>
  <div style="min-height:450px;">
    <div class="cardTitle"><Icon type="ios-square" />运行课程</div>
    <Form :model="formYxkc" :label-width="80">
      <Row type="flex" justify="center">
        <Col :xs="20" :sm="24" :md="10" :lg="10">
          <FormItem label="学院">
            <Select v-model="formYxkc.xySelect" style="max-width:300px">
              <Option v-for="item in xyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>

          <Col :xs="20" :sm="24" :md="8" :lg="8">
          <FormItem label="时间">
            <DatePicker style="max-width:240px" type="daterange" placeholder="请选择" v-model="formYxkc.dateSelect" @on-change="dataChange" :options="dateOptions" ></DatePicker>
          </FormItem>
          </Col>

          <Col :xs="20" :sm="24" :md="6" :lg="6">
          <FormItem>
            <Button type="primary" @click="check">查询</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div>
      <Row type="flex" justify="center">
          <Col span="1"></Col>
          <Col span="22">
        <Table border stripe  :columns="yxkcTable.columns1" :data="yxkcTable.data1"/>
        </Col>
          <Col span="1"></Col>
          <Page
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
          ></Page>
        </Row>
    </div>
  </div>
      
</template>
<script>
import { tbYxkcList } from '../js/yxkc'
import moment from 'moment'

export default {
  data() {
    const param = this.$route.query,
          startTime = param.start,
          endTime = param.end
    const pageSize = this.limit
    const pageOffset = this.offset
    const total = tbYxkcList.data1.length
    return {
      startTime:startTime,
      endTime:endTime,
      // 下拉列表数据
      xyList: [
        {value:1,label:'学院一'},
        {value:2,label:'学院二'},
        {value:3,label:'学院三'}
      ],
      // 表单项数据
      formYxkc: {
        xySelect:0,
        dateSelect: ''
      },
      // 表格数据 从对应js文件引入
      yxkcTable:{
        columns1: tbYxkcList.columns1,
        data1: tbYxkcList.data1
      },
      total: total || 12,
      limit: parseInt(pageSize) || 10, // 每页条数
      offset: parseInt(pageOffset) || 0, // 每页的查询索引
      // 根据首页选择日期现在本页面日期选择器
      dateOptions: {
        disabledDate (date) {
          return date && ((date.valueOf() > moment(endTime)) || (date.valueOf() < moment(startTime))); 
        }
      },
    }
  },
  mounted() {
  },
  methods: {
    getList() {
      const params = {
        limit: this.limit, // 单页数据条数
        offset: this.offset,  // 第多少页
        param: {
          xy: this.formYxkc.xySelect, // 选择院系
          date: this.formYxkc.dateSelect  // 选择日期
        }
      }
      $.ajax({
        type: 'POST',
        url: "/login",
        dataType: "json",
        contentType : "application/json",
        data: JSON.stringify(params),
        success: function(data) {
          console.log(data)
        },
        error: function() {
          console.log("error!!")
        }
      })
      Http.post("protection/build/page", JSON.stringify(params), "application/json").then(d => {
                if (d.code === 200) {
                    this.constructList.data1 = d["data"]["records"]
                    this.total = d["data"]["total"]
                } else {
                    this.rankList.data1 = []
                    this.total = 0;
                    this.$Message.error("获取数据失败");
                }
            })
      this.yxkcTable.data1 = tbYxkcList.data1
      this.total = tbYxkcList.data1.length
    },
    check() {
      let xy = this.formYxkc.xySelect > 0 ? this.formYxkc.xySelect - 1 : 0
      // alert('选择学院:' +  this.xyList[xy].label + '选择日期' + this.formYxkc.dateSelect)
    },
    dataChange(date) {
      this.formYxkc.dateSelect = date
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
    }
  }
}
</script>

<style scoped>
.cardTitle{
  margin: 20px 0 30px 0;
  font-size: 24px;
  font-weight: bold;
  color: #255aaa;
}
</style>