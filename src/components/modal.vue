<template>
	<div class="modal-box detail" v-show="isShowModal" @click="closeModal">
		<div class="modal-content">
			<span class="close-modal">X</span>
			{{{modalData.body}}}
		</div>
	</div>
</template>
<style lang="less">
	.modal-box{
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: -50%;
		padding: 40px;
		z-index: 1000;
		overflow: auto;
		background: rgba(0,0,0,0.5);
		box-shadow: 0px 5px 100px rgba(0,0,0,.5);
	}
	.modal-content{
		padding: 20px;
		background: #fff;
		.close-modal{
			display: inline-block;
			margin: 10px;
		}
	}
</style>
<script lang="babel">
	export default{
		data(){
			return {
				modalData: ''
			}
		},
		events:{
			showModal(data){
				$('.modal-box').show(300)
				this.modalData = data.data
				setTimeout(_ => {
					if(!$('img').length){
						return
					}

					let imgList = $('img')
					let that = this
					for(let i = 1,len = imgList.length; i < len; i++){
						imgList[i].src = that.changeUrl(imgList[i].src) 
					}
					//设置图片居中...虽然恶心，但没想到更好的方法
					$('.content-image').parent().css('text-align','center')
				},0)
			}
		},
		methods: {
			closeModal(){
				$('.modal-box').hide(300)
			},
			changeUrl(val){ //解决盗链问题，参考http://www.yatessss.com/2016/07/08/使用vue完成知乎日报.html
				return val.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
			}
		}
	}
</script>