<template>
<div id="pieChart">
<div id="chart"></div>
</div>
</template>

<script>
import echarts from 'echarts'
import axios from 'axios'
export default {
  name: 'application_per',
  data () {
    return {
      testMes:[],
      dataOfChart:[],
      dataOfChart2:[]
    }
  },
  mounted () {
    let res;
    let instance = axios.create({ headers: {'content-type': 'application/x-www-form-urlencoded'} });
    instance.get('http://localhost:3000/first').then((response)=>{
     res=response.data;
      for(let i=0;i<res[0].length;i++){
        let item={
          name: res[0][i].name,
          value: this.toPoint(res[0][i].bili)
        }
        this.dataOfChart.push(item)
      }
    })
    instance.get('http://localhost:3000/yingYongBili').then((response)=>{
      res=response.data;
      for(let i=0;i<res[0].length;i++){
        let item={
          name: res[0][i].name,
          value: this.toPoint(res[0][i].bili)
        }
        this.dataOfChart2.push(item)
        this.chartInit(this.dataOfChart,this.dataOfChart2)
      }
    })
  },
  methods:{
    chartInit:function (res1,res2) {
      let myChart = echarts.init(document.getElementById('chart'))
      let option = {
        title : {
          text: '比例图，你自己改一下标题我也不知道该叫点啥',
          subtext: '副标题写在这',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        calculable : true,
        series : [
          {
            name:'游戏比例',
            type:'pie',
            radius : [25, 110],
            center : ['25%', 200],
            roseType : 'area',
            x: '50%',               // for funnel
            max: 40,                // for funnel
            sort : 'ascending',     // for funnel
            data:res1
          },
          {
            name:'应用比例',
            type:'pie',
            radius : [25, 110],
            center : ['75%', 200],
            roseType : 'area',
            x: '50%',               // for funnel
            max: 40,                // for funnel
            sort : 'ascending',     // for funnel
            data:res2
          }
        ]
      };
      myChart.showLoading();
      setTimeout(function () {
        myChart.setOption(option)
        myChart.hideLoading();
      },2000)
    },
    toPoint:function (percent){
      let str=percent.replace("%","");
      str= str/1;
      return str;
    }
  }
}
</script>

<style scoped>
#pieChart{
  width:650px;
  height: 500px;
  margin: 0 auto;
}
#chart{
  height: 100%;
  width: 100%;
}
</style>
