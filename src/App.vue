<template>
    <div class="side-bar">
	   	<side-bar></side-bar>
    </div>
	<div class="router-view">
		<router-view></router-view>
	</div>
</template>
<style lang="less" scoped>
    .side-bar{
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      flex: 0 0 400px;
      width: 400px;
      height: 100%;
    }
    .router-view{
      display: flex;
      flex: 1 1;
      margin-left: 400px;
    }
</style>
<script>
    export default{
    	components: {
    		sideBar: require('./views/sideBar.vue')
    	}
    }
</script>