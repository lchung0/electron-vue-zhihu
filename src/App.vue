<template>
    <div class="bg-img bg-fixed" :style="{'background-image': 'url(' + fileUrl + ')'}"></div>
    <div class="side-bar">
      <side-bar></side-bar>
    </div>
</template>
<style lang="less" scoped>
    @import '../node_modules/materialize-css/dist/css/materialize.min.css';

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
        width: 400px;
        height: 100%;
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
        ready(){
            var that = this
            var imgUrl = 'http://localhost:3333/getImage',
                menuUrl = 'http://localhost:3333/getMenu'
            that.isLoading = true
            $.get(imgUrl, data => {
                that.isLoading = false
                that.fileUrl = './static/images/'+data+'.png'
            })
            $.get(menuUrl, data => {
                that.menuList = JSON.parse(data).others
            })
        },
        components:{
            sideBar: require('./components/sideBar.vue')
        }
    }
</script>