var express = require('express');
var router = express.Router();
let testCon = require('../public/javascripts/Dao/gameBili')
let yingYongCon = require('../public/javascripts/Dao/yingYongBili')
let game_topCon = require('../public/javascripts/Dao/game_top')
let join_wxCon = require('../public/javascripts/Dao/join_wx')
let join_ywCon = require('../public/javascripts/Dao/join_yw')
let total_topCon = require('../public/javascripts/Dao/total_top')
let wx_compareCon = require('../public/javascripts/Dao/wx_compare')
let yingYongTopCon = require('../public/javascripts/Dao/yingYong_top')
let ywCompareScoreCon = require('../public/javascripts/Dao/yw_compare_score')
let ywCompareXiazaiCon = require('../public/javascripts/Dao/yw_compare_xiazai')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/first',function (req,res,next) {
  let result=[];
  listfn = async () => {
    let re = await testCon.getGameBili();
    result.push(re);
  }
  listfn();
  setTimeout(function () {
    res.json(result);
  },2000)
});
router.get('/yingYongBili',function (req,res,next) {
  let result=[];
  listfn = async () => {
    let re = await yingYongCon.getYingYongBili();
    result.push(re);
  }
  listfn();
  setTimeout(function () {
    res.json(result);
  },2000)
})

router.get('/gameTop',function (req,res,next) {
  let result=[];
  listfn = async () => {
    let re = await game_topCon.getGameTop();
    result.push(re);
  }
  listfn();
  setTimeout(function () {
    res.json(result);
  },2000)
})

router.get('/joinWx',function (req,res,next) {
  let result=[];
  listfn = async () => {
    let re = await join_wxCon.getJoinWx();
    result.push(re);
  }
  listfn();
  setTimeout(function () {
    res.json(result);
  },2000)
})

router.get('/joinYw',function (req,res,next) {
  let result=[];
  listfn = async () => {
    let re = await join_ywCon.getJoinYw();
    result.push(re);
  }
  listfn();
  setTimeout(function () {
    res.json(result);
  },2000)
})

router.get('/totalTop',function (req,res,next) {
  let result=[];
  listfn = async () => {
    let re = await total_topCon.getTotalTop();
    result.push(re);
  }
  listfn();
  setTimeout(function () {
    res.json(result);
  },2000)
})

router.get('/wxCompare',function (req,res,next) {
  let result=[];
  listfn = async () => {
    let re = await wx_compareCon.getWxCompare();
    result.push(re);
  }
  listfn();
  setTimeout(function () {
    res.json(result);
  },2000)
})

router.get('/yingYongTop',function (req,res,next) {
  let result=[];
  listfn = async () => {
    let re = await yingYongTopCon.getYingYongTop();
    result.push(re);
  }
  listfn();
  setTimeout(function () {
    res.json(result);
  },2000)
})

router.get('/ywCompareScore',function (req,res,next) {
  let result;
  listfn = async () => {
    let re = await ywCompareScoreCon.getYwCompareScore();
    console.log("这里是后端的显示"+re);
    result=re;
  }
  listfn();
  setTimeout(function () {
    res.json(result);
  },2000)
})
router.get('/ywCompareXiazai',function (req,res,next) {
  let result=[];
  listfn = async () => {
    let re = await ywCompareXiazaiCon.getYwCompareXiazai();
    result.push(re);
  }
  listfn();
  setTimeout(function () {
    res.json(result);
  },2000)
})
module.exports = router;
