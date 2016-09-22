<template>
	<i class="menu-icon waves-effect" alt="" @click="showMenu" alt="菜单"></i>
</template>
<style lang="less" scoped>
	.menu-icon{
		display: inline-block;
		width: 30px;
		height: 30px;
		background-image: url('../assets/icon/menu.svg');
		background-size: cover;
		transition: all .5s;
	}
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