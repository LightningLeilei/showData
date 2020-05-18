<!--
 * @Author: liuyixue
 * @Date: 2019-07-01 09:56:18
 * @LastEditors: liuyixue
 * @LastEditTime: 2020-05-18 14:59:11
 * @Description: file content
 -->
<template>
  <div id="app">
    <div class="layout">
      <Layout>
        <Header>Header</Header>
        <Content>
          <!-- <div>Content</div> -->
          <!-- <img src="./assets/logo.png"> -->
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
export default {
  name: 'App'
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
  background-image: url("./assets/top.png");
  /* display:inline-block; */
  height:222px;
    /* background-image: url("./assets/top.png"); */
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
