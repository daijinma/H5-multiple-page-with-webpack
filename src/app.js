//app.js
import './style/reset.css';
import 'vue-lazyload-img';
import Vue from 'vue';
import VueRouter from 'vue-router';


window.APIHOST = 'http://10.20.5.110:3001'; // 110 的测试机
window.IMG_REFERER = APIHOST+"/img?url="; // 110 的测试机
$.ajaxSettings.beforeSend = (xhr, setting) => setting.url = setting.url.replace(/^\/\_api\/(.+)/, APIHOST + '/$1');




Vue.use(VueRouter);

//初始化VueRouter
const router = new VueRouter({
    hashbang: false,
    history: true,
    //saveScrollPosition: false,  //暂时不加纪录滚动位置
    transitionOnLoad: true
});

// Vue.use(Vue.lazyimg,{
//   fade:true,   //全部图片使用淡入特效
//   nohori:true, //禁用水平方向的检测
//   speed:20     //只有当屏幕滚动速度小于speed且图片在屏幕中出现了才开始懒加载
// });


const app = Vue.extend({});


router.map({
    '/index': {
        name:'home',
        component: function(resolve){
            require(['./view/index.vue'],resolve);
        }
    },
    '/detail/:id': {
        name:'detail',
        component: function(resolve){
            require(['./view/detail.vue'],resolve);
        }
    },
    /* 404路由 */
    '*': {
        component: function(resolve){
            require(['./view/404.vue'],resolve);
        }
    }
});

router.start(app, '#app');
