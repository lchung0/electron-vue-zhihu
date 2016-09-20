<template>
	<div class="carousel">
		<template v-for="(index,item) in imgList">
			<a class="carousel-item" :href="javascript;">
				<img :src="item.image">
			</a>
		</template>
	</div>
  	<!-- <div class="carousel">
	    <a class="carousel-item" href="#one!"><img src="http://lorempixel.com/250/250/nature/1"></a>
	    <a class="carousel-item" href="#two!"><img src="http://lorempixel.com/250/250/nature/2"></a>
	    <a class="carousel-item" href="#three!"><img src="http://lorempixel.com/250/250/nature/3"></a>
	    <a class="carousel-item" href="#four!"><img src="http://lorempixel.com/250/250/nature/4"></a>
	    <a class="carousel-item" href="#five!"><img src="http://lorempixel.com/250/250/nature/5"></a>
  	</div> -->
</template>
<style lang="less">
	.carousel{
		height: 300px;
	}
</style>
<script lang="babel">
	
	export default{
		props:{
			imgList: {
				type: Array,
				required: true
			}
		},
		data(){
			return {

			}
		},
		ready(){
			setTimeout(_ => {
				$('.carousel').carousel()
				console.log(this.imgList)
			},300)
		}
	}
</script>