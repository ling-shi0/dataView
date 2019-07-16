<template>
<div id="wxCompare">
  <div id="chart">
  </div>
</div>
</template>

<script>
  import echarts from 'echarts'
  import axios from 'axios'
    export default {
      name: "wxCompare",
      data(){
        return {

        }
      },
      mounted() {
        let res;
        let instance = axios.create({ headers: {'content-type': 'application/x-www-form-urlencoded'} });
        instance.get('http://localhost:3000/wxCompare').then((response)=>{
          res=response.data;
          let names=[];
          let bilis=[];
          let bilis2=[];
          for(let i=0;i<res[0].length;i++){
            names[i]=res[0][i].name;
            bilis[i]=res[0][i].bili;
            bilis2[i]=res[0][i].bili2;
          }
          console.log(names)
          this.chartInit1("chart",'豌豆荚','小米',"join_wx",names,bilis,bilis2)
        })
        },
      methods:{
        chartInit1:function (which,legend1,legend2,chartName,names,staitic1,staitic2) {
          let myChart = echarts.init(document.getElementById(which))
          let option = {
            title : {
              text: '主标题写在这',
              subtext: '副标题写在这'
            },
            tooltip : {
              trigger: 'item'
            },
            legend: {
              data:[legend1,legend2]
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
                name:legend1,
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
              },
              {
                name:legend2,
                type:'bar',
                data:staitic2,
                markPoint : {
                  data : [
                    {name : '年最高', type:'max'},
                    {name : '年最低', type:'min'}
                  ]
                },
                markLine : {
                  data : [
                    {type : 'average', name : '平均值'}
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
      }
    }
</script>

<style scoped>
  #wxCompare{
    margin: 0 auto;
    width: 1000px;
    height: 500px;
  }
#chart{
  width: 100%;
  height: 100%;
}
</style>
