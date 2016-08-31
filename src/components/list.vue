<template>
	<div class="wrap">
		<div class="list" v-for="type in array">
            <div class="title">{{type.type.cname}}</div>
            <div class="items" v-for="item in type.items">
                <a href="/room.html?roomid={{item.id}}" class="item">
                    <div class="show">
                        <img src="../asssets/images/loading.png" v-lazyload="item.pictures.img">
                        <div class="txt">{{item.name}}</div>
                    </div>
                    <div class="name">
                        <div class="left">{{item.userinfo.nickName}}</div>
                        <div class="right">{{item.person_num}}</div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';

    module.exports={
        data: function(){
        return {
	            array:[]
	        }
        },
        ready(){
            $.ajax({
                url:"http://api.m.panda.tv/ajax_get_live_list_by_multicate",
                data:{
                    hotroom:'1',
                    __plat:'h5'
                },
                dataType:'jsonp',
                jsonpCallback:"jsonp2",
                success:(res)=> {
                    this.array = res.data;
                }
            })
        }
    }
</script>

<style scoped lang="less">
    .list .title {
        font-size: .4375rem;
        line-height: .421875rem;
        border-left: 3px solid #009bfa;
        padding-left: .15625rem;
        box-sizing: border-box;
        margin-top: .25rem;
        color: #009bfa;
    }

    .list .items {
        padding-right: .15625rem;
        box-sizing: border-box;
        overflow: hidden;
        width: 50%;
        float: left;
    }
    .list .item .show {
        position: relative;
        border-radius: .0625rem;
    }

    .list .item .name {
        height: .875rem;
        line-height: .875rem;
        overflow: hidden;
        font-size: .28125rem;
        padding: 0 .125rem;
        box-sizing: border-box;
    }

    .list .item .show .txt {
        position: absolute;
        bottom: 2px;
        border-bottom-right-radius: .0625rem;
        border-bottom-left-radius: .0625rem;
        height: .5625rem;
        line-height: .5625rem;
        font-size: .3125rem;
        color: white;
        width: 100%;
        background-color: rgba(0,0,0,0.6);
        padding-left: .15625rem;
        box-sizing: border-box;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    .list .item .show img {
        border-radius: .0625rem;
        width: 100%;
    }

    .list .item .name .left {
        width: 2.8rem;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        float: left;
        color: #333;
    }

    .list .item .name .right {
        height: 100%;
        max-width: 1.8625rem;
        background: url(../asssets/images/icon_person.png?_inline) left .15625rem no-repeat;
        background-size: .390625rem .390625rem;
        float: right;
        padding-left: .46875rem;
        box-sizing: border-box;
        color: #009bfa;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }


</style>