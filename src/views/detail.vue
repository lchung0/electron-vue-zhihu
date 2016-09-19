<template>
	<div class="detail">
		{{{detailData.body}}}
	</div>
</template>
<style lang="less">
	
</style>
<script lang="babel">
	export default{
		data(){
			return{
				detailId: '',
				detailData: {}
			}
		},
		route:{
			data: transition => {
				transition.next({
					detailId: transition.to.params.detailId
				})
			},
			canReuse: transition => {
		      	return false
		    }
		},
		ready(){
			var data = {'id': this.detailId}
			$.ajax({
				url: 'http://localhost:3333/getNewsDetail',
				method: 'get',
				data: data,
				dataType: 'json',
				success: data => {
					this.detailData = data
					console.log(typeof(detailData))
				}
			})
		}
	}
</script>