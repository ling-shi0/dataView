let mysqlUtil = require('../Utils/getDatabaseConnection')
// 声明一个同步方法, 这里要求有 SQL 语句的基础
let getYingYongBili = async function () {
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
        let sqlStr = "SELECT types FROM yingyong_bili";
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
        let sqlStr = "SELECT bili FROM yingyong_bili";
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
        result.push({name:result2[i].types,bili:result1[i].bili})
    }
    return result;
};

module.exports = {
    getYingYongBili
}
