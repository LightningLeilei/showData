<!--
 * @Author: liuyixue
 * @Date: 2019-07-01 09:56:18
 * @LastEditors: liuyixue
 * @LastEditTime: 2020-06-14 21:54:18
 * @Description: file content
 -->
<template>
  <div id="app">
    <div class="layout">
      <Layout>
        <Header>
          
        </Header>
        <Content>
          <Row type="flex" justify="center">
            <Col span="3"></Col>
            <Col span="18">
              <router-view/>
            </Col>
            <Col span="3"></Col>
          </Row>
        </Content>
        <Footer>Corpyright 2020 Northwest University Reserved.西北大学信息化管理处（网络和数据中心）版权所有</Footer>
      </Layout>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'App',
  data() {
    return {
      // curRouter: this.$router.currentRoute.path
    }
  },
  mounted() {
  },
  methods: {
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}

.layout{
    /* border: 1px solid #d7dde4; */
    /* background: #f5f7f9; */
    position: relative;
    /* border-radius: 4px; */
    overflow: hidden;
}
.ivu-layout-header{
  background: no-repeat scroll;
  background-size: 100%;
  background-image: url("./assets/top.png") ;
  height:222px;
}
.ivu-layout-content{
  /* background: white; */
}
.ivu-layout-footer{
  height: 78px;
  text-align: center;
  font-size: 16px;
  color: #fff;
  background:#2348ba;
  margin-top: 20px;
}
</style>
