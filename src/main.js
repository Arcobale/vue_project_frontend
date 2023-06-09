import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'
//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
//第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
//引入MockServer.js ---- mock数据
import '@/mock/mockServe';
//引入swiper样式
import 'swiper/css/swiper.css';
Vue.config.productionTip = false

//统一接收api文件夹里面全部请求函数
import * as API from '@/api';

// //全局引入
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI);
//全局引入
// import { Button } from 'element-ui';
// Vue.use(Button);
//在原型上引入
import { MessageBox } from 'element-ui';

//引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
//图片、JSON默认对外暴露
import loadImg from '@/assets/loading.gif'
//注册插件
Vue.use(VueLazyload, {
  //懒加载默认的图片
  loading: loadImg,
});

new Vue({
  render: h => h(App),
  //全局事件总线配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;//统一引入
    Vue.prototype.$msgbox = MessageBox; //引入消息弹框
    Vue.prototype.$alert = MessageBox.alert;
  },
  //注册路由：组件实例的身上会拥有$route,$router属性
  router,
  //注册仓库：组件实例的身上会多一个属性$store
  store,
}).$mount('#app')
