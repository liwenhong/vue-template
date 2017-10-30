<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links
<span>this is test area</span></h2>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        input: ''
      }
    },
    mounted: function () {
      /*    axios({
       method:'get',
       url:'http://127.0.0.1:8090/test',
       headers:{"Content-Type":"application/x-www-form-urlencoded"}
       })
       .then(function (response) {
       console.log(response);
       })
       .catch(function (error) {
       console.log(error);
       });*/
      let da = {
        name: 'lwh',
        id: '11'
      }

      this.$get('/test', {name: 'hhh'}, false).then((data) => {
        console.log(data);
      });
      this.$post('/testP', da).then((data) => {
        console.log(data);
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  h1, h2 {
    font-weight: normal;
    span{
      color:red;
    }
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
