<template>
    <div class="side-bar">
	   	<side-bar></side-bar>
    </div>
	<div class="main-content">
    <div class="top-menu">
      <top-menu></top-menu>
    </div>
    <div class="router-view">
      <router-view></router-view>
    </div>
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
    .main-content{
      display: flex;
      flex-wrap: wrap;
      flex: 1 1;
      margin-left: 400px;
      padding: 10px 20px 10px;
      .top-menu{
        width: 100%;
        height: 30px;
      }
      .router-view{
        width: 100%;
      }
    }
</style>
<script>
    export default{
        components: {
        		sideBar: require('./views/sideBar.vue'),
            topMenu: require('./components/topMenu.vue')
    	  }
    }
</script>