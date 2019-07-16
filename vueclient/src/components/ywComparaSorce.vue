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
    <div id="charts">
    <div id="chart1" class="chart"></div>
    <div id="chart2" class="chart"></div>
    <div id="chart3" class="chart"></div>
    <div id="chart4" class="chart"></div>
  </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import axios from 'axios'
    export default {
        name: "ywComparaSorce",
      methods:{
        chartInit1:function (which,chartName,subChartName,names,staitic1) {
          let myChart = echarts.init(document.getElementById(which))
          let option = {
            title : {
              text: chartName,
              subtext: subChartName
            },
            tooltip : {
              trigger: 'axis'
            },
            calculable : true,
            xAxis : [
              {
                type : 'category',
                data : names,
                axisLabel:{
                  rotate:-90
                }
              }
            ],
            yAxis : [
              {
                type : 'value'
              }
            ],
            series : [
              {
                name:'蒸发量',
                type:'bar',
                data:staitic1,
                markPoint : {
                  data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                  ]
                },
                markLine : {
                  data : [
                    {type : 'average', name: '平均值'}
                  ]
                }
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
      mounted() {
        let res;
        let instance = axios.create({ headers: {'content-type': 'application/x-www-form-urlencoded'} });
        instance.get('http://localhost:3000/ywCompareScore').then((response)=>{
          res=response.data;
          console.log(res)
          let namesOfJia1=[];
          let namesOfY1=[];
          let sorce1=[];
          let sorce2=[];
          let namesOfJia2=[];
          let namesOfY2=[];
          let xiaZai1=[];
          let xiaZai2=[];
          for (let i=0;i<res[0].name1.length;i++){
            namesOfJia1.push(res[0].name1[i].name);
            sorce1.push(res[0].sorce1[i].sorce);
          }
          for (let i=0;i<res[0].name2.length;i++) {
            namesOfY1.push(res[0].name2[i].name);
            sorce2.push(res[0].sorce2[i].sorce);
          }
          for (let i=0;i<res[1].name1.length;i++){
            namesOfJia2.push(res[1].name1[i].name);
            xiaZai1.push(res[1].xiaZai1[i].xiazai);
          }
          for (let i=0;i<res[1].name2.length;i++) {
            namesOfY2.push(res[1].name2[i].name);
            xiaZai2.push(res[1].xiaZai2[i].xiazai);
          }
          this.chartInit1("chart1","图一的名字","subName1",namesOfJia1,sorce1)
          this.chartInit1("chart2","图二的名字","subName2",namesOfY1,sorce2)
          this.chartInit1("chart3","图三的名字","subName3",namesOfJia2,xiaZai1)
          this.chartInit1("chart4","图四的名字","subName4",namesOfY2,xiaZai2)
        })
      },
      data(){
          return {
            navList:[
              {name:'/application_per',navItem:'application_per'},
              {name:'/join',navItem:'join'},
              {name:'/top',navItem:'top'},
              {name:'/ywCompareScore',navItem:'ywCompareScore'},
              {name:'/wxCompare',navItem:'wxCompare'},
            ]
          }
      }
    }
</script>

<style scoped>
#charts{
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 1200px;
  height: 400px;
}
  .chart{
    width: 50%;
    height: 100%;
    margin-top: 20px;
  }

#ret{
  float: right;
}
#menu{
  width: 1000px;
}
</style>
