<template>
	<div class="wrap">
		<ul>
            <li v-for="itme in stories">
                <a  v-link="{ name: 'detail',params: { id: itme.id } }">
                    stories:{{itme.title}}
                    <img v-bind:src="IMG_REFERER+itme.images[0]" alt="{{itme.title}}">
                </a>
            </li>      
        </ul>
    </div>
</template>

<script>
    import store from '../store/latest';

    module.exports={
        data: function(){
        return {
	            stories:store.state.stories,
                IMG_REFERER,
	        }
        },
        ready(){
            //this.stories = ;
            //console.log(this.stories);
        }
    }
</script>

<style scoped>
   
</style>