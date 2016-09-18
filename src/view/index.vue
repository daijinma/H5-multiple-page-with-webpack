<template>
	<div class='index'>
		<iheader></iheader>
		<swiper></swiper>
		<list></list>
	</div>
</template>

<script>
	import swiper from '../components/swiper.vue';
	import store from '../store/latest';
	import iheader from '../components/head.vue';
	import list from '../components/list.vue';

	module.exports = {
		data(){
			return {}
		},
		created(){
			$.ajax({
		        url:"/_api/news/latest",
		        method:"GET",
		        success:(res)=> {

		        	console.log(res)
		          this.$store.dispatch("SETKEYVALUE", 'stories', res.stories);
		          this.$store.dispatch("SETKEYVALUE", 'topStories', res.top_stories);
		        }
		    })
		},
		store,
		ready(){
			//this.init()
		},
		components:{
			iheader,
			list,
			swiper
		}
	}
</script>