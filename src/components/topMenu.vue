<template>
	<a type="button" @click="showMenu">菜单</a>
</template>
<style lang="less" scoped>
	
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
                this.$root.$broadcast('showSideMenu',this.isShowMenu)
            }
		}
	}
</script>