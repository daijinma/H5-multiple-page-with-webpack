/*! index.js */
import Vue from 'vue';
//import "vue-lazyload-img"
import head from '../components/head.vue';
import pdVideo from '../components/pd-video.vue';
import reset from '../asssets/style/reset.css';
import abp from '../asssets/style/abp.css';

//import pdVideo from '../components/pd-video.vue';


Vue.config.debug = true;
// Vue.use(Vue.lazyimg,{
//   fade:true,   //全部图片使用淡入特效
//   nohori:true, //禁用水平方向的检测
//   speed:20     //只有当屏幕滚动速度小于speed且图片在屏幕中出现了才开始懒加载
// });


new Vue({
  el: 'body',
  data: {},
  components: {
    'PdHead':head,
    pdVideo
  }

})
