let mysqlUtil = require('../Utils/getDatabaseConnection')
// 声明一个同步方法, 这里要求有 SQL 语句的基础
let getYwCompareScore = async function () {
    // 获取连接, es6 新特性 awit 不能少
    let result=[];
    let resultOfFirst={
        name1:[],
        name2:[],
        sorce1:[],
        sorce2:[]
    };
    let resultOfSecond={
        name1:[],
        name2:[],
        xiaZai1:[],
        xiaZai2:[]
    };;
    let conn = await mysqlUtil();
    await new Promise((resolve, reject) => {
        conn.beginTransaction(err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
    let result2 = await new Promise((resolve, reject) => {
        let sqlStr = "SELECT name FROM yw_compare_sorce where flag = '[w'";
        conn.query(sqlStr, function (err, ret) {
            if (err) {
                // 回滚之前的数据库操作, 直至碰到 beginTransaction
                return conn.rollback(() => {
                    resolve(err);
                });
            }
            resolve(ret);
        });
    });
    let result1 = await new Promise((resolve, reject) => {
        let sqlStr = "SELECT sorce FROM yw_compare_sorce where flag = '[w'";
        conn.query(sqlStr, function (err, ret) {
            if (err) {
                // 回滚之前的数据库操作, 直至碰到 beginTransaction
                return conn.rollback(() => {
                    resolve(err);
                });
            }
            resolve(ret);
        });
    });
    let result3 = await new Promise((resolve, reject) => {
        let sqlStr = "SELECT name FROM yw_compare_sorce where flag = '[y'";
        conn.query(sqlStr, function (err, ret) {
            if (err) {
                // 回滚之前的数据库操作, 直至碰到 beginTransaction
                return conn.rollback(() => {
                    resolve(err);
                });
            }
            resolve(ret);
        });
    });
    let result4 = await new Promise((resolve, reject) => {
        let sqlStr = "SELECT sorce FROM yw_compare_sorce where flag = '[y'";
        conn.query(sqlStr, function (err, ret) {
            if (err) {
                // 回滚之前的数据库操作, 直至碰到 beginTransaction
                return conn.rollback(() => {
                    resolve(err);
                });
            }
            resolve(ret);
        });
    });
    let result5 = await new Promise((resolve, reject) => {
        let sqlStr = "SELECT name FROM yw_compare_xiazai where flag = '[w'";
        conn.query(sqlStr, function (err, ret) {
            if (err) {
                // 回滚之前的数据库操作, 直至碰到 beginTransaction
                return conn.rollback(() => {
                    resolve(err);
                });
            }
            resolve(ret);
        });
    });
    let result6 = await new Promise((resolve, reject) => {
        let sqlStr = "SELECT xiazai FROM yw_compare_xiazai where flag = '[w'";
        conn.query(sqlStr, function (err, ret) {
            if (err) {
                // 回滚之前的数据库操作, 直至碰到 beginTransaction
                return conn.rollback(() => {
                    resolve(err);
                });
            }
            resolve(ret);
        });
    });
    let result7 = await new Promise((resolve, reject) => {
        let sqlStr = "SELECT name FROM yw_compare_xiazai where flag = '[y'";
        conn.query(sqlStr, function (err, ret) {
            if (err) {
                // 回滚之前的数据库操作, 直至碰到 beginTransaction
                return conn.rollback(() => {
                    resolve(err);
                });
            }
            resolve(ret);
        });
    });
    let result8 = await new Promise((resolve, reject) => {
        let sqlStr = "SELECT xiazai FROM yw_compare_xiazai where flag = '[y'";
        conn.query(sqlStr, function (err, ret) {
            if (err) {
                // 回滚之前的数据库操作, 直至碰到 beginTransaction
                return conn.rollback(() => {
                    resolve(err);
                });
            }
            resolve(ret);
        });
    });
    await new Promise((resolve, reject) => {
        conn.commit(err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
    conn.release();
    let flag=true;
    let i=0;
    while(flag){
        flag = false;
        console.log(11111111)
        if (!!result2[i]){
            resultOfFirst.name1.push(result2[i]);
            flag=true;
        }
        if (!!result1[i]){
            resultOfFirst.sorce1.push(result1[i]);
            flag=true;
        }
        if (!!result3[i]){
            resultOfFirst.name2.push(result3[i]);
            flag=true;
        }
        if (!!result4[i]){
            resultOfFirst.sorce2.push(result4[i]);
            flag=true;
        }
        if (!!result5[i]){
            resultOfSecond.name1.push(result5[i]);
            flag=true;
        }
        if (!!result6[i]){
            resultOfSecond.xiaZai1.push(result6[i]);
            flag=true;
        }
        if (!!result7[i]){
            resultOfSecond.name2.push(result7[i]);
            console.log("下载"+result7[i])
            flag=true;
        }
        if (!!result8[i]){
            resultOfSecond.xiaZai2.push(result8[i]);
            flag=true;
        }
        i++;
    }
    result.push(resultOfFirst);
    result.push(resultOfSecond);
    return result;
};

module.exports = {
    getYwCompareScore
}
