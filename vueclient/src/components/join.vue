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
<div id="joinCharts">
<div id="join_wx" class="chart"></div>
<div id="join_yw" class="chart"></div>
</div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import axios from 'axios'
  export default {
    name: "top",
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
      },
      chartInit2:function (which,chartName,names,staitic1,staitic2,staitic3,staitic4) {
        let myChart = echarts.init(document.getElementById(which))
        let option2 = {
          tooltip : {
            trigger: 'axis'
          },
          calculable : true,
          legend: {
            data:["应用宝评论数","豌豆荚评论数",'应用宝评分','豌豆荚评分']
          },
          xAxis : [
            {
              type : 'category',
              data :names,
              axisLabel:{
                rotate:-90
              }
            }
          ],
          yAxis : [
            {
              type : 'value',
              name : '评论数',
              axisLabel : {
                formatter: '{value} 万个'
              }
            },
            {
              type : 'value',
              name : '评分',
              axisLabel : {
                formatter: '{value}'
              }
            }
          ],
          series : [
            {
              name:"应用宝评论数",
              type:'bar',
              data:staitic1
            },
            {
              name:"豌豆荚评论数",
              type:'bar',
              data:staitic2
            },
            {
              name:'应用宝评分',
              type:'line',
              yAxisIndex: 1,
              data:staitic3
            },
            {
              name:'豌豆荚评分',
              type:'line',
              yAxisIndex: 1,
              data:staitic4
            }
          ]
        };
        myChart.showLoading();
        setTimeout(function () {
          myChart.setOption(option2);
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
      let instance = axios.create({ headers: {'content-type': 'application/x-www-form-urlencoded'} });
      instance.get('http://localhost:3000/joinWx').then((response)=>{
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
        this.chartInit1("join_wx",'豌豆荚','小米',"join_wx",names,bilis,bilis2)
      })
      instance.get('http://localhost:3000/joinYw').then((response)=>{
        res=response.data;
        let names=[];
        let bilis=[];
        let bilis2=[];
        let fen=[];
        let fen2=[];
        for(let i=0;i<res[0].length;i++){
          names[i]=res[0][i].name;
          bilis[i]=res[0][i].bili;
          bilis2[i]=res[0][i].bili2;
          fen[i]=res[0][i].pingFen1;
          fen2[i]=res[0][i].pingFen2;
        }
        console.log(names)
        console.log(bilis)
        console.log(bilis2)
        console.log(fen)
        this.chartInit2("join_yw","join_yw",names,bilis,bilis2,fen,fen2)
      })
    }
  }
</script>

<style scoped>
#joinCharts{
  display: flex;
  margin: 0 auto;
  width: 1200px;
  height: 500px;
}
.chart{
  width: 50%;
  height: 100%;
}
#menu{
  width: 1000px;
  margin: 0 auto;
}
#ret{
  float: right;
}
</style>
