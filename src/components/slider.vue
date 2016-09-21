<template>
	<div class="carousel">
		<template v-for="(index,item) in imgList">
			<a class="carousel-item" :href="javascript;">
				<img :src="item.image">
			</a>
		</template>
	</div>
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
			},1000)
		}
	}
</script>