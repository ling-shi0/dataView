let mysqlUtil = require('../Utils/getDatabaseConnection')
// 声明一个同步方法, 这里要求有 SQL 语句的基础
let getJoinYw = async function () {
    // 获取连接, es6 新特性 awit 不能少
    let result=[];
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
        let sqlStr = "SELECT name FROM join_yw";
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
        let sqlStr = "SELECT xiazai FROM join_yw";
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
        let sqlStr = "SELECT xiazai1 FROM join_yw";
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
        let sqlStr = "SELECT sorce FROM join_yw";
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
        let sqlStr = "SELECT sorce1 FROM join_yw";
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
    for(let i=0;i<result2.length;i++){
        result.push({name:result2[i].name,bili:result1[i].xiazai,bili2:result3[i].xiazai1,pingFen1:result4[i].sorce,pingFen2:result5[i].sorce1})
    }
    return result;
};

module.exports = {
    getJoinYw
}
