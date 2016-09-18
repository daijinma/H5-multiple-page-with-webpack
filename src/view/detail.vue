<template>
	<div class='detail'>
		<iheader></iheader>
		<link rel="stylesheet" href="{{css}}">
		{{{data.body}}}
	</div>
</template>

<script>
	import iheader from '../components/head.vue';
	import utils from '../utils.js';
	//  (?<=<.+)(http|https).+?pic[0-9].zhimg.+?\.(jpg|png|jpge|gif)(?=.+>)
	//  这里需要匹配 知乎文章正文 的 img标签
	//  包含三类
	//  http的  zhimg
	//  https的知乎img
	//  知乎主站的 字符画 ，字符画不处理
	const IMG_REFERER_REGEXP = new RegExp('(https|http).+?pic[0-9].zhimg.+?(jpg|png|jpge|gif)','gm');

	module.exports = {
		data(){
			return {
				id:0,
				data:{},
				css:''
			}
		},
		ready(){
			this.id = this.$route.params.id;
			$.ajax({
                url:"/_api/news/"+this.id,
                method:"GET",
                success:(res)=> {
                	res.body = res.body.replace('<div class="img-place-holder"></div>','<div class="img-place-holder" style="background-image:url('+res.image+')"></div>')
                	res.body = res.body.replace(IMG_REFERER_REGEXP,function(){
                		let url = arguments[0]
                		if(arguments[1] == 'https'){
                			url = 'http'+url.substring(5,url.length);
                		}
                		return IMG_REFERER+url
                	});

                	this.css = res.css;
                    this.data = res;
                }
            })
		},
		components:{
			iheader
		}
	}
</script>

<style>
	.detail .img-place-holder{
		background-size: cover;
	    background-position: center;
	}
</style>