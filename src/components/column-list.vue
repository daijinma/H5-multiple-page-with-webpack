<template>
	<div class="type">
        <!-- href="/type.html?cate={{item.enname}}" -->
        <a v-for="item in column" class="item" >
            <img v-bind:src="item.img">
            <div class="txt"> {{item.cnname}} </div>
        </a>
    </div>
    
</template>

<script>
    module.exports={
        data: function(){
        return {
	            column:[
                    {
                        enname:'lol',
                        cnname:'英雄联盟',
                        img:'http://i6.pdim.gs/fb241da47d1fa3a6e60d69c9e809ec7c.png',
                    },
                    {
                        enname:'hearthstone',
                        cnname:'炉石传说',
                        img:'http://i8.pdim.gs/f20c5e01b74c7e858a90872a58a3b301.png',
                    },
                    {
                        enname:'yzdr',
                        cnname:'娱乐联萌',
                        img:'http://i9.pdim.gs/093ccee7bc2bd4c488ba4282f225aedd.png',
                    },
                    {
                        enname:'hwzb',
                        cnname:'英雄联盟',
                        img:'http://i6.pdim.gs/fb241da47d1fa3a6e60d69c9e809ec7c.png',
                    },
                    {
                        enname:'lol',
                        cnname:'英雄联盟',
                        img:'http://i6.pdim.gs/fb241da47d1fa3a6e60d69c9e809ec7c.png',
                    },
                    {
                        enname:'lol',
                        cnname:'英雄联盟',
                        img:'http://i6.pdim.gs/fb241da47d1fa3a6e60d69c9e809ec7c.png',
                    },
                    {
                        enname:'lol',
                        cnname:'英雄联盟',
                        img:'http://i6.pdim.gs/fb241da47d1fa3a6e60d69c9e809ec7c.png',
                    },
                    {
                        enname:'lol',
                        cnname:'英雄联盟',
                        img:'http://i6.pdim.gs/fb241da47d1fa3a6e60d69c9e809ec7c.png',
                    }
                ]
	        }
        }
    }
</script>

<style scoped lang="less">
    .type {
        overflow: hidden;
    }

    .type .item {
        margin-top: .359375rem;
        text-decoration: none;
        color: #333;
        width: 25%;
        float: left;
        text-align: center;
    }

    .type .item {
        margin-top: .359375rem;
        text-decoration: none;
        color: #333;
        width: 25%;
        float: left;
        text-align: center;
    }

    .type .item .txt {
        line-height: .625rem;
        color: #333;
        font-size: 0.6rem;
        font-weight: 400;
    }

    .type .item img {
        width: 2rem;
        height: 2rem;
    }


</style>