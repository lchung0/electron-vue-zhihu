<template>
	<div class="modal-box detail" v-show="isShowModal" @click="closeModal">
		<div class="modal-content" @click="stopPropa()">
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
		bottom: 0;
		padding: 40px;
		z-index: 3000;
		overflow: hidden;
		background: rgba(0,0,0,0.5);
		box-shadow: 0px 5px 100px rgba(0,0,0,.5);
	}
	.modal-content{
		padding: 20px;
		height: 100%;
		min-width: 600px;
		background: #fff;
		overflow-y: auto;
		.close-modal{
			display: inline-block;
			margin: 10px;
		}
		.main-wrap{
			margin: 0 auto;
		}
	}
</style>
<script lang="babel">
	export default{
		data(){
			return {
				modalData: '',
				isShowModal: false
			}
		},
		events:{
			showModal(data){
				console.log('receive')
				this.isShowModal = true
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
		watch: {
			isShowModal(val){
				if(val)
					$('.modal-box').parent().css('overflow','hidden')
				else
					$('.modal-box').parent().css('overflow','auto')
			}
		},
		methods: {
			closeModal(){
				this.isShowModal = false
				$('.modal-box').hide(300)
				
			},
			stopPropa(){
				event.stopPropagation()
			},
			changeUrl(val){ //解决盗链问题，参考http://www.yatessss.com/2016/07/08/使用vue完成知乎日报.html
				return val.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
			}
		}
	}
</script>