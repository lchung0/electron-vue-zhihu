<template>
    <div class="side-bar">
	   	<side-bar></side-bar>
    </div>
	<div class="main-content">
    <modal-component></modal-component>
    <div class="top-menu">
      <top-menu></top-menu>
    </div>
    <div class="router-view">
      <router-view></router-view>
    </div>
	</div>
</template>
<style lang="less" scoped>
    @import 'assets/css/materialize.min.css';
    .side-bar{
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      flex: 0 0 400px;
      width: 400px;
      height: 100%;
      box-shadow: 5px 0 10px rgba(0,0,0,0.5);
    }
    .main-content{
      display: flex;
      flex-wrap: wrap;
      position: relative;
      flex: 1 1;
      margin-left: 400px;
      padding: 10px 0 10px 35px;
      overflow: hidden;
      .top-menu{
        position: fixed;
        top: 0;
        left: 400px;
        z-index: 999;
        padding: 0 0 0 35px;
        width: 100%;
        height: 45px;
        line-height: 40px;
        box-shadow: 5px 0 10px rgba(0,0,0,0.5);
      }
      .router-view{
        position: relative;
        margin-top: 40px;
        padding-bottom: 40px;
        width: 100%;
        overflow: auto;
      }
    }
</style>
<script>
    export default{
        components: {
        		sideBar: require('./views/sideBar.vue'),
            topMenu: require('./components/topMenu.vue'),
            modalComponent: require('./components/modal.vue')
    	  }
    }
</script>