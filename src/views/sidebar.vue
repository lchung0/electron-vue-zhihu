<template>
	<div class="container">
		<div class="bg-box" :class="{'coverbg': isLoading}" :style="{'background-image': 'url(' + fileUrl + ')'}">
			<!-- :style="{'background-image': 'url(' + fileUrl + ')'}" -->
			<img v-show="isLoading" class="loading" src="http://localhost:8080/static/images/loading.gif" alt="loading">
			<div class="mask">
				<div class="menu">
					<div class="user-login">
						<div class="avatar">
							<img src="http://localhost:8080/static/images/avatar.jpg" alt="用户头像">
							<span>请登录</span>
						</div>
						<div class="login-bar">
							<span></span>
						</div>
					</div>
					<div class="menu-list">
						<ul class="collapsible popout" data-collapsible="accordion">
							<li class="active">
								<div class="collapsible-header active waves-effect" v-link="{path: '/index'}">
						      		首页
							    </div>
							</li>
							<li v-for="item in menuList">
								<div class="collapsible-header waves-effect" v-link="{name: 'theme', params:{themeId: item.id}}">
						      		{{item.name}}
							    </div>
							    <div class="collapsible-body">
							    	<p>{{item.description}}</p>
							    </div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.container{
		width: 100%;
		height: 100%;
		overflow-y: hidden;
		display: flex;
	}
	.bg-box{
		position: relative;
		display: inline-block;
		width: 400px;
		height: 100%;
		background-size: cover;
		transition: all .3s;
		&.coverbg{
			background-color: #02c4fc;
		}
		.loading{
			position: absolute;
			top: 50%;
			margin: -150px 0 0 0; 
			height: auto;
			width: 100%;
		}
		.mask{
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			padding: 25px;
			transform: translateX(-400px);
			/* background: #02c4fc; */
			transition: all .5s ease-in-out;
			&.move-right{
				transform: translateX(0);
			}
			.menu{
				width: 100%;
				height: 100%;
				/*background: rgba(255,255,255,.5);*/
				.user-login{
					position: relative;
					width: 100%;
					height: 110px;
					.avatar{
						position: absolute;
						top: 50%;
						margin: -30px 20px;
					}
					img{
						width: 40px;
						height: 40px;
						border-radius: 50%;
						vertical-align: middle;
					}
				}
				.menu-list{
					.collapsible-header{
						font-size: 16px;
						font-weight: bold;
					}
					.collapsible-body{
						p{
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
						}
					}
					ul{
						padding: 0;
						li{
							box-shadow: 3px 3px 10px rgba(0,0,0,.5);
							div{
								background: #fff;
								border: none;
								border-top: 1px solid #eee;
							}
						}
					}
				}
			}
		}
	}
</style>
<script lang="babel">
	export default{
		data(){
			return {
				fileUrl: '',
				isLoading: false,
				menuList: []
			}
		},
		events: {
			showSideMenu(isShowMenu){
				isShowMenu ? $('.mask').addClass('move-right') : $('.mask').removeClass('move-right')
			}
		},
		ready(){
			var that = this
			var imgUrl = 'http://localhost:3333/getImage',
				menuUrl = 'http://localhost:3333/getMenu'
			that.isLoading = true
			$.get(imgUrl, data => {
				that.isLoading = false
				that.fileUrl = './static/images/'+data+'.png'
				console.log(that.fileUrl)
			})
			$.get(menuUrl, data => {
				that.menuList = JSON.parse(data).others
			})
		}
	}
</script>