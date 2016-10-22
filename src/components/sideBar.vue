<template>
	<div class="container">
		<a class="menu-btn btn-floating waves-effect waves-light black" @click="isShowMenu=!isShowMenu"><i class="menu-icon iconfont icon-nav"></i></a>
		<div class="content" :class="{'go-left': !isShowMenu}">
			<div class="avatar-box">
				<img class="avatar" src="../../static/images/avatar.jpg" alt="头像">
				<div class="btn-group">
					<button class="login-btn btn waves-effect waves-light green">登录</button>
				</div>
			</div>
			<div class="menu-list">
				<ul>
				    <li v-for="(item,index) in menuList">
						<a class="btn-floating waves-effect waves-light btn-large">{{item.name}}</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.container{
		position: fixed;
		width: 400px;
		height: 100%;
		.menu-btn{
			position: absolute;
			right: 10px;
			top: 20px;
			width: 50px;
			height: 50px;
			background: red;
			.menu-icon{
				width: 100%;
				height: 100%;
				line-height: 50px;
				font-size: 22px;
				font-style: normal;
				text-align: center;
			}
		}
		.content{
			position: relative;
			width: 100%;
			height: 100%;
			transition: all .5s ease-in-out;
			&.go-left{
				transform: translateX(-400px);
			}
			.avatar-box{
				position: absolute;
				width: 100%;
				top: 20%;
				text-align: center;
			}
			.btn-group{
				display: inline-block;
				width: 100%;
				text-align: center;
			}
			.avatar{
				border-radius: 50%;
			}
			.menu-list{
				position: absolute;
				padding-left: 15px;
				top: 30%;
				text-align: center;
			}
			li{
				float: left;
				display: inline-block;
				margin-left: 40px;
				margin-top: 20px;
				width: 70px;
				height: 70px;
				text-align: center;
				.btn-large{
					width: 100%;
					height: 100%;
					line-height: 70px;
				}
			}
		}
	}
</style>
<script lang="babel">
	export default{
		props:{
			menuList: {
				type: Array,
				require: true,
				default: []
			}
		},
		data(){
			return {
				isShowMenu: false
			}
		},
		methods:{
			showMenu(){
			}
		}
	}
</script>