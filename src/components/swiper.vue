<template>
    <swipe class="my-swipe">
        <swipe-item v-for="item in topStories">
            <img v-bind:src="item.image" >
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
                topStories:[]
           }
        },
        ready(){
            this.topStories = store.state.topStories;
            console.log(store.state.topStories)
            console.log(this.topStories)
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