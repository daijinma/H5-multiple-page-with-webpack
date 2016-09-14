<template>
	<div class='index'>
		<iheader></iheader>
		<swiper></swiper>
		index
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
                	store.dispatch("SETKEYVALUE", 'stories', res.stories)
                	store.dispatch("SETKEYVALUE", 'topStories', res.top_stories)
                }
            })
		},
		ready(){
			
		},
		components:{
			iheader,
			list,
			swiper
		}
	}
</script>