<template>
	<div class="wrap">
		<ul>
            <li  v-for="item in stories" v-link="{name: 'detail', params: { id: item.id }}" class="list-detail-box" v-cloak>
                <div class="list-content-box">
                    <p>{{item.title}}</p>
                    <p class="time" v-if="item.display_date">{{item.display_date}}</p>
                </div>
                <div v-if="item.images" class="list-img-box">
                    <img v-bind:src="item.images[0]" >
                    <p v-if="item.multipic" class="tip"><i class="iconfont">&#xe61c</i>多图</p>
                </div>
            </li>    
        </ul>
    </div>
</template>

<script>
    import store from '../store/latest';

    module.exports={
        data: function(){
        return {
                IMG_REFERER,
	        }
        },
        vuex : {
            getters : {
                stories : (state) => state.stories
            }
        },
        ready(){
            
        }
    }
</script>

<style scoped>
    .list-detail-box{
        position: relative;
        width: 97%;
        margin: 8px auto 0 auto;
        background: #ffffff;
        padding: 13px;
        display: flex;
        flex-direction: row;
        border-radius: 5px;
        border: 1px solid #eaeaea;
        border-bottom: 1px solid #d0d0d0;
    }
    .list-content-box{
      margin-right: 10px;
      flex: 1;
    }
    .list-content-box>p{
        font-size: 0.4rem;
    }
    .list-content-box .time{
        position: absolute;
        bottom: 10px;
        left: 13px;
        font-size: 13px;
        color: #b0b0b0;
    }
    .list-img-box{
      position: relative;
      width: 2rem;
      height: 2rem;
    }
    .list-img-box>img{
        width: 2rem;
        height: 2rem;
    }
    .list-img-box .tip{
        color: #ffffff;
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 10px;
        padding: 2px 4px;
        background: rgba(0, 0, 0, 0.5);
    }
</style>