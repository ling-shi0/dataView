<template>
  <div class="viewport">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, i) in menu">
        <img :src="item.image" @click="clickImg(i,item)">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    name: 'Viewport',
    data () {
      return {
        menu: [
          {name: '', path: '/application_per', image: './static/images/loginBack.jpg'},
          {name: '', path: '/join', image: './static/images/loginBack.jpg'},
          {name: '', path: '/top', image: './static/images/loginBack.jpg'},
          {name: '', path: '/ywCompareScore', image: './static/images/loginBack.jpg'},
          {name: '', path: '/ywCompareScore', image: './static/images/loginBack.jpg'}]
      }
    },
    components: {
    },
    methods:{
      clickImg:function(i,item){
         i = i % this.menu.length
        this.$router.push(this.menu[i].path)
      }
    }
  }
</script>
<style scoped>
  .viewport{
   margin: 150px auto;
    width: 1000px;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  img {
    width: 100%;
    height: 100%;
  }

</style>
