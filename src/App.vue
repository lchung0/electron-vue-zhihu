<template>
    <div class="app">
        <div class="bg-img bg-fixed" :style="{'background-image': 'url(' + fileUrl + ')'}"></div>
        <div class="side-bar">
          <side-bar :menu-list="menuList"></side-bar>
        </div>
        <div class="router-view">
            <router-view></router-view>
        </div>
    </div>
</template>
<style lang="less" scoped>
    @import '../node_modules/materialize-css/dist/css/materialize.min.css';
    @import './assets/fonts/iconfont.css';
    .bg-img{
        width: 400px;
        background-size: cover;
    }
    .bg-fixed{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: -1;
    }
    .side-bar{
        flex: 0 400px;
        width: 400px;
        height: 100%;
    }
    .router-view{
        left: 400px;
        flex: 1;
        overflow: auto;
    }
</style>
<script lang="babel">
    export default{
        data(){
            return {
                isLoading: false,
                fileUrl: '',
                menuList: []
            }
        },
        mounted(){
            this.$nextTick(_ => {
                var that = this
                var imgUrl = 'http://localhost:3333/getImage',
                    menuUrl = 'http://localhost:3333/getMenu'
                that.isLoading = true
                $.get(imgUrl, data => {
                    let otherData = 'Mitko_Pigoff'
                    that.isLoading = false
                    that.fileUrl = './static/images/' + otherData + '.png'
                })
                $.get(menuUrl, data => {
                    that.menuList = JSON.parse(data).others
                })
            })
        },
        components:{
            sideBar: require('./components/sideBar.vue')
        }
    }
</script>