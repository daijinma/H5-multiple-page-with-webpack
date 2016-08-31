<template>
    <swipe class="my-swipe">
        <swipe-item v-for="item in swipeArray">
            <img src="../asssets/images/loading.png" v-lazyload="item.bigimg" >
        </swipe-item>
    </swipe>
</template>

<script>
    import { Swipe, SwipeItem } from 'vue-swipe';
    import $ from 'jquery';
    require("../asssets/style/vue-swipe.css");


    module.exports={
        data(){
           return {
                swipeArray:[]
           }
        },
        ready(){
             $.ajax({
                url:"http://api.m.panda.tv/ajax_rmd_ads_get",
                data:{
                    __plat:'h5'
                },
                dataType:'jsonp',
                jsonpCallback:"jsonp1",
                success:(res)=> {
                    this.swipeArray = res.data;
                }
            })
        },
        components:{
            'Swipe': Swipe,
            'SwipeItem': SwipeItem
        }
    }
</script>

<style scoped>
    .my-swipe {
      height: 9rem;
      color: #fff;
      font-size: 30px;
      text-align: center;
    }

    img{
        display: block;
        width: 100%;
        height: 100%;
    }

</style>