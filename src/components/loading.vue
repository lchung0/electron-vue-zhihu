<template>
	<div class="container">
		<div class="loading">
			<div class="preloader-wrapper big active">
			    <div class="spinner-layer spinner-white-only">
			    	<div class="circle-clipper left">
			        	<div class="circle"></div>
			      	</div><div class="gap-patch">
			        	<div class="circle"></div>
			      	</div><div class="circle-clipper right">
			        	<div class="circle"></div>
			      	</div>
			   	 </div>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.container{
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		overflow: hidden;
		.loading{
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -32px;
			margin-left: -32px;
		}
	}
</style>
<script lang="babel">
	export default{

	}
</script>