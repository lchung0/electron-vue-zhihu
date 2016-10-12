<template>
	<div class="box effect">
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam blanditiis delectus et non ducimus saepe dolore, perferendis iusto aspernatur laudantium hic rem nobis inventore incidunt accusamus minima consequuntur cumque praesentium.
	</div>
	<button @click="showBox" class="btn">show</button>
	<button @click="closeBox" class="btn">close</button>
</template>
<style lang="less" scoped>
	.box{
		display: none;
		position: absolute;
		bottom: 70px;
		right: 0;
		width: 0px;
		height: 0px;
		background: red;
		transition: all .5s;
	}
	.effect{
		width: 350px;
		height: 600px;
	}
	button{
		display: inline-block;
		position: absolute;
		bottom: 10px;
		width: 100px;
		height: 50px;
		&:last-child{
			margin-left: 100px;
		}
	}
</style>
<script lang="babel">
	export default{
		methods:{
			showBox(){
				$('.box').addClass('effect').css('display','block')
				//$('.box').show(500)
			},
			closeBox(){
				$('.box').removeClass('effect').css('display','none')
				//$('.box').hide(500)
			}
		}
	}
</script>