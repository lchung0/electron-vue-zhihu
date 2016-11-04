<template>
	<div class="container">
		<a class="menu-btn btn-floating waves-effect waves-light black" @click="isShowMenu=!isShowMenu"><i class="menu-icon iconfont" :class="{'icon-nav': isShowMenu === false,'icon-close': isShowMenu === true}"></i></a>
		<div class="content" :class="{'go-left': !isShowMenu}">
			<div class="avatar-box">
				<img class="avatar" src="../../static/images/avatar.jpg" alt="头像">
				<div class="btn-group">
					<button class="login-btn btn waves-effect waves-light green">登录</button>
				</div>
			</div>
			<div class="menu-list">
				<ul>
					<li>
						<i class="circle-icon"></i>
						<a class="menu-item waves-effect waves-light" @click="backToIndex">
							首页
						</a>
					</li>
				    <li v-for="(item,index) in menuList">
				    	<i class="circle-icon"></i>
						<a class="menu-item waves-effect waves-light" href="javascript:;"
						   @click="getThemeData(item.id)">
						   {{item.name}}
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.container{
		position: fixed;
		width: 350px;
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
			background: #212121;
			overflow: auto;
			&.go-left{
				transform: translateX(-400px);
			}
			.avatar-box{
				position: absolute;
				width: 100%;
				top: 10%;
				text-align: center;
			}
			.btn-group{
				width: 100%;
				text-align: center;
			}
			.avatar{
				display: inline-block !important;
				border-radius: 50%;
			}
			.menu-list{
				padding: 0 60px;
				width: 100%;
				position: absolute;
				top: 20%;
				text-align: center;
				ul li{
					position: relative;
					&:hover{
						.circle-icon{
							opacity: 1;
						}
					}
				}
			}
			.circle-icon{
				position: absolute;
				top: 20px;
				display: inline-block;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				background: #fff;
				opacity: 0;
				transition: all .5s;
			}
			.menu-item{
				display: inline-block;
				margin-top: 10px;
				padding: 5px;
				width: 100%;
				height: 40px;
				color: #fff;
				font-size: 18px;
				border-bottom: 1px solid transparent;
				transition: all .5s;
				&:hover{
					border-bottom: 1px solid #eee;
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
			backToIndex(){
				this.$router.push({path: '/main'})
				location.reload()
			},
			getThemeData(id){
				this.$router.push({path: '/theme/' + id})
				location.reload()
			}
		}
	}
</script>