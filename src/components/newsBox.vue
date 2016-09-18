<template>
	<div class="container">
		<div class="image-box">
			<slot name="image"></slot>
		</div>
		<div class="title-box">
			<slot name="title"></slot>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.container{
		margin-top: 20px;
		width: 60%;
		min-width: 600px;
		height: 100px;
		line-height: 100px;
		box-shadow: 5px 5px 10px rgba(0,0,0,0.2);
		border-radius: 5px;
		.image-box{
			display: inline-block;
			vertical-align: middle;
			width: 100px;
			height: 100px;
			border-top-left-radius: 5px;
			border-bottom-left-radius: 5px;
			overflow: hidden;
		}
		.title-box{
			display: inline-block;
			margin-left: 20px;
			vertical-align: middle;
			font-size: 16px;
			font-weight: 600;
		}
	}
</style>
<script lang="babel">
	export default{

	}
</script>