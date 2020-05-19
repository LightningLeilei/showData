<!--
 * @Author: liuyixue
 * @Date: 2020-05-18 11:52:49
 * @LastEditors: liuyixue
<<<<<<< HEAD
 * @LastEditTime: 2020-05-18 12:00:20
 * @Description: file content
--> 
<template>
    <div>
        <div id="hyxs">活跃学生</div>
    </div>
</template>
<script>
export default {
  data() {
    return {
=======
 * @LastEditTime: 2020-05-18 22:00:29
 * @Description: file content
-->
<template>
  <div style="min-height:450px;">
    <div class="cardTitle"><Icon type="ios-square" />活跃学生</div>
    <Form :model="formHyxs" :label-width="80">
      <Row type="flex" justify="center">
        <Col span="10">
          <FormItem label="学院">
            <Select v-model="formHyxs.xySelect">
              <Option v-for="item in xyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>

          <Col span="10">
          <FormItem label="时间">
            <DatePicker type="date" placeholder="请选择" v-model="formHyxs.dateSelect" @on-change="dataChange" ></DatePicker>
          </FormItem>
          </Col>

          <Col span="4">
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
        <Table border stripe  :columns="hyxsTable.columns1" :data="hyxsTable.data1"/>
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
import { tbHyxsList } from '../js/hyxs'

export default {
  data() {
    const pageSize = this.limit
    const pageOffset = this.offset
    const total = tbHyxsList.data1.length
    return {
      // 下拉列表数据
      xyList: [
        {value:1,label:'学院一'},
        {value:2,label:'学院二'},
        {value:3,label:'学院三'}
      ],
      // 表单项数据
      formHyxs: {
        xySelect:0,
        dateSelect: ''
      },
      // 表格数据 从对应js文件引入
      hyxsTable:{
        columns1: tbHyxsList.columns1,
        data1: tbHyxsList.data1
      },
      total: total || 12,
      limit: parseInt(pageSize) || 10, // 每页条数
      offset: parseInt(pageOffset) || 0, // 每页的查询索引
>>>>>>> 前四个
    }
  },
  mounted() {
  },
  methods: {
<<<<<<< HEAD
    
=======
    getList() {
      const params = {
        limit: this.limit, // 单页数据条数
        offset: this.offset,  // 第多少页
        param: {
          xy: this.formHyxs.xySelect, // 选择院系
          date: this.formHyxs.dateSelect  // 选择日期
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
      // Http.post("protection/build/page", JSON.stringify(params), "application/json").then(d => {
      //           if (d.code === 200) {
      //               this.constructList.data1 = d["data"]["records"]
      //               this.total = d["data"]["total"]
      //           } else {
      //               this.rankList.data1 = []
      //               this.total = 0;
      //               this.$Message.error("获取数据失败");
      //           }
      //       })
      this.hyxsTable.data1 = tbHyxsList.data1
      this.total = tbHyxsList.data1.length
    },
    check() {
      let xy = this.formHyxs.xySelect > 0 ? this.formHyxs.xySelect - 1 : 0
      // alert('选择学院:' +  this.xyList[xy].label + '选择日期' + this.formHyxs.dateSelect)
    },
    dataChange(date) {
      this.formHyxs.dateSelect = date
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
>>>>>>> 前四个
  }
}
</script>

<<<<<<< HEAD
=======
<style scoped>
.cardTitle{
  margin: 20px 0 30px 0;
  font-size: 24px;
  font-weight: bold;
  color: #255aaa;
}
</style>
>>>>>>> 前四个
