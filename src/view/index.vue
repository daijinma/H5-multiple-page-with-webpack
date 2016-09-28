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

			this.$store.dispatch("SETKEYVALUE", 'stories', this.getStoreValue('stories','[]'));
			this.$store.dispatch("SETKEYVALUE", 'topStories', this.getStoreValue('topStories','[]'));
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
		methods:{
			getStoreValue(key,defaultValue){
				var val = localStorage.getItem(PRE_NAME+key);
				val = (val==='undefined' || val===undefined)?defaultValue:val;
				return JSON.parse(val);
			}
		},
		components:{
			iheader,
			list,
			swiper
		}
	}
</script>