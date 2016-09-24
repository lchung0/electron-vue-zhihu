<template>
	<div class="carousel">
		<template v-for="(index,item) in imgList">
			<a class="carousel-item" :href="javascript;">
				<img :src="item.image | changeUrl">
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
		},
		filters: {
			changeUrl(val){
				if(typeof(val)==='string')
					return val.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
				else 
					return val[0].replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
			}
		}
	}
</script>