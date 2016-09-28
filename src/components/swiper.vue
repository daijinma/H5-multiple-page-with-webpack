<template>
    <swipe class="my-swipe">
        <swipe-item v-for="item in topStories"  v-link="{name: 'detail', params: { id: item.id }}">
            <div class="bg-img" :style="{backgroundImage:'url('+item.image+')'}">
            <div class="title">{{item.title}}</div>
        </swipe-item>
    </swipe>
</template>

<script>
    import { Swipe, SwipeItem } from 'vue-swipe';
    import "../style/vue-swipe.css";
    import store from '../store/latest';

    module.exports={
        data(){
           return {
                IMG_REFERER,
           }
        },
        vuex : {
            getters : {
                topStories : (state) => state.topStories
            }
        },
        ready(){
            //this.topStories = store.state.topStories;
        },
        components:{
            'Swipe': Swipe,
            'SwipeItem': SwipeItem
        }
    }
</script>

<style scoped>
    .my-swipe {
      height: 6rem;
      color: #fff;
      font-size: 30px;
      text-align: center;
    }

    .bg-img{
        display: block;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
    }
    .title{
        position: absolute;
        bottom:0;
        left:0;
        width: 100%;
        text-align: left;
        padding:0.2rem;
        font-size: 0.5rem;
        text-shadow: 1px 1px 5px #ccc;
    }
</style>