//app.js
import './style/reset.css';
import Vue from 'vue';
import VueRouter from 'vue-router';


window.APIHOST = 'http://zhihuapi.daijinma.cn';
window.IMG_REFERER = APIHOST+"/img?url="; 
window.PRE_NAME = "DJM_VUEZHD";

$.ajaxSettings.beforeSend = (xhr, setting) => setting.url = setting.url.replace(/^\/\_api\/(.+)/, APIHOST + '/$1');




Vue.use(VueRouter);

//初始化VueRouter
const router = new VueRouter({
    hashbang: false,
    history: true,
    //saveScrollPosition: false,  //暂时不加纪录滚动位置
    transitionOnLoad: true
});


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
    '*':{
        name:'404',
        component: function(resolve){
            router.go("/index");
        }
    }
});

router.start(app, '#app');
