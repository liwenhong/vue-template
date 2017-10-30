/**
 * Created by Administrator on 2017/10/27.
 */
// const api_host = `https://api.${你的域名}\${你的项目名\${api_version}`;//https://api.xxxxx.com/blog/v1
//api遵循restful设计，这里规定api返回结构
const response = {
  code:Number,
  /*
   * 小于0是错误，这里前端不需要关心错误是什么，
   * 等于0是没有权限
   * 大于0表示成功
   * 我这么设计是由原因的，欢迎大家来一起探讨
   */
  msg:String,//当然，你也可以叫errMsg，message什么的，随便你啦
  /*
   * 在我这里，默认只有错误的时候，才会出现
   */
  data:Object,
  /*
   * 后端返回对象，我们一直说前后端语言一样，有很多好处，呐，这里就是!
   * 这样写，基本能保证后端传给前端是什么，前端收到的就是什么
   */
};

import axios from 'axios';
import { Loading } from 'element-ui';

const MyPlugin = {};
axios.defaults.withCredentials = true;//唯有加上这句话，才能够支持跨域请求，如果实在不明白的可以留言

MyPlugin.install = function install(Vue, api_host) {
  //构建axios请求基础
  const request = axios.create({
    baseURL: api_host,//api host：顾名思义就是api的请求基础地质
    timeout: 10000,// 超时时间
  });
  //请求方法的构建,type为：get、post、delete等等
  const createRequestFuc = (type) => {
    return function (resource, params, showError = true) {
      //返回请求的Promise的对象
      return new Promise((resolve, reject) => {
       let loadingInstance = Loading.service({ fullscreen: true });
        // this.$Loading.start();//请求发起时，show loading，一般的框架都会有全局调用的loading方法。
        params = type === 'get' ? { params } : params;//axios里get方法和其它方法接收参数的方式不一致,这里做个统一
        request[type](resource, params)//调用request
          .then(res => {
            // resolve(res);
            console.log(res);
            if (res && res.data && res.status === 200) {//判断请求返回结果，code为判断值，这里可以替换成你自己的框架定义
              resolve(res.data);//返回结果
            } else {
              showError && this.$message.error(res.data);//判断是否调用自带全局waring或error
              reject(res.data);//无论上面是否执行，都应该reject，阻止代码继续执行
            }
            loadingInstance.close();//结束loading
          })
          .catch((err) => {
          console.log(err);
            this.$message.error("请求失败");//这种情况一般是请求失败，报错方式可以自己更改
            loadingInstance.close();//结束loading
            reject(err);//无论上面是否执行，都应该reject，阻止代码继续执行
          });
      });
    }
  }
  //构建请求
  Vue.prototype.$get = createRequestFuc('get');
  Vue.prototype.$put = createRequestFuc('put');
  Vue.prototype.$post = createRequestFuc('post');
  Vue.prototype.$patch = createRequestFuc('patch');
  Vue.prototype.$delete = createRequestFuc('delete');
};
export default MyPlugin;
