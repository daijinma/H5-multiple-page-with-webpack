<template>
	<div class='index'>
		<iheader></iheader>
		{{{data.body}}}
	</div>
</template>

<script>
	import iheader from '../components/head.vue';
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
				data:{}
			}
		},
		ready(){
			this.id = this.$route.params.id;
			$.ajax({
                url:"/_api/news/"+this.id,
                method:"GET",
                success:(res)=> {
                	res.body = res.body.replace(IMG_REFERER_REGEXP,function(){
                		let url = arguments[0]
                		if(arguments[1] == 'https'){
                			console.log(url)
                			url = 'http'+url.substring(5,url.length);
                		}
                		return IMG_REFERER+url
                	});


                    this.data = res;
                }
            })
		},
		components:{
			iheader
		}
	}
</script>