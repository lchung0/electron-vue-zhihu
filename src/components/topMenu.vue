<template>
	<div class="menu-content">
		<i class="icon menu-icon waves-effect" @click="showMenu" alt="菜单"></i>
		<i class="icon home-icon waves-effect" v-link="{path: '/index'}"></i>
		<i class="icon back-icon waves-effect" @click="back()"></i>
	</div>
</template>
<style lang="less" scoped>
	.menu-content{
		width: 100%;
		.icon{
			display: inline-block;
			width: 28px;
			height: 28px;
			transition: all .5s;
			background-size: cover;
			&:not(:first-child){
				margin-left: 25px;
			}
		}
	}
	.menu-icon{ background-image: url('../assets/icon/menu.svg'); }
	.home-icon{ background-image: url('../assets/icon/home.svg'); }
	.back-icon{ background-image: url('../assets/icon/back.svg'); }
</style>
<script lang="babel">
	export default{
		methods: {
			data(){
	            return {
	                isShowMenu: false
	            }
	        },
			showMenu(){
                this.isShowMenu = !this.isShowMenu
                var toggleSrc = !this.isShowMenu ? 'static/images/menu.svg' : 'static/images/close.svg'
                $('.menu-icon').css('background-image','url(' + toggleSrc + ')') 
                this.$root.$broadcast('showSideMenu',this.isShowMenu)
            }
		}
	}
</script>