/*! index.js */
import Vue from 'vue';
import "vue-lazyload-img";
import head from '../components/head.vue';
import columnList from '../components/column-list.vue';
import list from '../components/list.vue';
import swiper from '../components/swiper.vue';
import reset from '../asssets/style/reset.css';
import main from '../asssets/style/main.css';
import aaa from '../asssets/images/123.png';

Vue.config.debug = true;
Vue.use(Vue.lazyimg,{
  fade:true,   //全部图片使用淡入特效
  nohori:true, //禁用水平方向的检测
  speed:20     //只有当屏幕滚动速度小于speed且图片在屏幕中出现了才开始懒加载
});

new Vue({
  el: 'body',
  data: {
    message: 'Hello Vue.js!'
  },
  components: {
    'swiper': swiper,
    'PdHead':head,
    'columnList':columnList,
    list
  }

})

// setTimeout(function(){
// 	require.ensure(['../components/list.vue'],function(require){
// 		var a = document.createElement('a');
// 		a.innerHTML = "appenChild";
//         document.body.appendChild(a);
//     });
// },2000)
