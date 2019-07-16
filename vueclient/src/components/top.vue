<template>
  <div>
    <div id="menu">
      <el-menu :default-active="this.$route.path" router mode="horizontal">
        <el-menu-item v-for="(item,i) in this.navList" :key="i" :index="item.name">
          {{ item.navItem }}
        </el-menu-item>
        <a href="/"><el-menu-item id="ret" >返回</el-menu-item></a>
      </el-menu>
    </div>
    <div id="top">
      <div id="chart1" class="chart"></div>
      <div id="chart2" class="chart"></div>
      <div id="chart3" class="chart"></div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import axios from 'axios'
    export default {
        name: "top",
      methods:{
        chartInit:function (which,res1,res2,chartName) {
          let myChart = echarts.init(document.getElementById(which))
          let option = {
            title : {
              text: 'top图，你自己改一下标题我也不知道该叫点啥',
              subtext: '副标题写在这',
              x:'center'
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            calculable : true,
            xAxis: [
              {
                type: 'category',
                data: res1,
                axisLabel:{
                  rotate:-90
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                show: false
              }
            ],
            series: [
              {
                name: chartName,
                type: 'bar',
                itemStyle: {
                  normal: {
                    color: function(params) {
                      // build a color map as your need.
                      var colorList = [
                        '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                        '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                        '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                      ];
                      return colorList[params.dataIndex]
                    },
                    label: {
                      show: true,
                      position: 'top',
                      formatter: '{c}'
                    }
                  }
                },
                data: res2
                }
            ]
          };
          myChart.showLoading();
          setTimeout(function () {
            myChart.setOption(option)
            myChart.hideLoading();
          },2000)
        }
      },
      data (){
          return {
                navList:[
                  {name:'/application_per',navItem:'application_per'},
                  {name:'/join',navItem:'join'},
                  {name:'/top',navItem:'top'},
                  {name:'/ywCompareScore',navItem:'ywCompareScore'},
                  {name:'/wxCompare',navItem:'wxCompare'},
                ]
          }
      },
      mounted() {
        let res;
        let instance = axios.create({headers: {'content-type': 'application/x-www-form-urlencoded'}});
        instance.get('http://localhost:3000/gameTop').then((response) => {
          res = response.data;
          let names = [];
          let bilis = [];
          for (let i = 0; i < res[0].length; i++) {
            names[i] = res[0][i].name;
            bilis[i] = res[0][i].bili;
          }
          console.log(names)
          this.chartInit("chart1", names, bilis, "gameTop")
        })
        instance.get('http://localhost:3000/totalTop').then((response) => {
          res = response.data;
          let names = [];
          let bilis = [];
          for (let i = 0; i < res[0].length; i++) {
            names[i] = res[0][i].name;
            bilis[i] = res[0][i].bili;
          }
          console.log(names)
          this.chartInit("chart2", names, bilis, "totalTop")
        })
        instance.get('http://localhost:3000/yingYongTop').then((response) => {
          res = response.data;
          let names = [];
          let bilis = [];
          for (let i = 0; i < res[0].length; i++) {
            names[i] = res[0][i].name;
            bilis[i] = res[0][i].bili;
          }
          console.log(names)
          this.chartInit("chart3", names, bilis, "yingyongTOP")
        })
      }
    }
</script>

<style scoped>
  #menu{
    width: 1000px;
    margin: 0 auto;
  }
  #top{
    margin-top: 30px;
    display: flex;
    width: 1500px;
    height: 500px;
  }
  .chart{
    width:100%;
    height: 100%;
  }
  #ret{
    float: right;
  }
</style>
