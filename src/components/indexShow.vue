<!--
 * @Author: liuyixue
 * @Date: 2020-05-12 23:15:06
 * @LastEditors: liuyixue
 * @LastEditTime: 2020-05-12 23:17:13
 * @Description: file content
 -->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
  </div>
</template>

<script>
export default {
  name: 'indexShow',
  data () {
    return {
      msg: 'Here is the data show page.'
    }
  },
  mounted() {
    // console.log('name')
    // console.log(this.param)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
