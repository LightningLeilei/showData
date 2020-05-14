<!--
 * @Author: liuyixue
 * @Date: 2019-07-01 09:56:18
 * @LastEditors: liuyixue
 * @LastEditTime: 2020-05-15 00:15:45
 * @Description: file content
 -->
<template>
  <div class="hello">
    <Card :bordered="false">
      <p>在线教学运行基本平稳，共运行课程____门，活跃教师____人，活跃学生_____人，其中学习空间每日运行课程平均____门，每日活跃教师平均_____人，每日活跃学生平均_____人；雨课堂每日运行课程平均____门，每日活跃教师平均_____人，每日活跃学生平均_____人。</p>
    </Card>
    <Row style="margin:20px;" type="flex" justify="space-between">
      <Button style="background-color:#fb6e52;" @click="jumptoYxkc">运行课程</Button>
      <Button style="background-color:#ffc655;">活跃教师</Button>
      <Button style="background-color:#2dc7e9;">活跃学生</Button>
      <Button style="background-color:#3cd7b8;">活跃班级</Button>
      <Button style="background-color:#f6b37f;">教学互动</Button>
      <Button style="background-color:#8f9ae9;">教学资源</Button>
    </Row>
    <Card :bordered="false">
      <div class="cardTitle"><Icon type="ios-square" />各院系开课数量</div>
      <Row>
        <Col span="12">
          <p>在线教学运行基本平稳，共运行课程____门，活跃教师____人，活跃学生_____人，其中学习空间每日运行课程平均____门，每日活跃教师平均_____人，每日活跃学生平均_____人；雨课堂每日运行课程平均____门，每日活跃教师平均_____人，每日活跃学生平均_____人。 </p>
        </Col>
        <Col span="12">
        </Col>
      </Row>
      
    </Card>
    <Card :bordered="false">
      <p>在线教学运行基本平稳，共运行课程____门，活跃教师____人，活跃学生_____人，其中学习空间每日运行课程平均____门，每日活跃教师平均_____人，每日活跃学生平均_____人；雨课堂每日运行课程平均____门，每日活跃教师平均_____人，每日活跃学生平均_____人。 </p>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    // console.log('name')
    // console.log(this.param)
  },
  methods: {
    jumptoYxkc() {
      this.$router.push({
        path: '/mapChina'
      })
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
.ivu-card :first-child{
    font-size: 20px;
}
/* 首行缩进 */
p{ text-indent:2em;}
/* 修改按钮格式 */
[type=button]{
  width: 160px;
  height: 55px;
  font-size: 18px;
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
