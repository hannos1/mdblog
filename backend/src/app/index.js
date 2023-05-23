// node模块
const path = require('path');
// 第三方模块
const Koa = require('koa'); // koa是一个类，调用需要实例化
const cors = require('koa-cors')
const { koaBody } = require('koa-body');
const parameter = require('koa-parameter'); // 参数校验
// 自定义模块
const router = require('../router/index.js');

const app = new Koa();
app.use(parameter(app));
app.use(koaBody({
    multipart: true, // 开启文件上传
    formidable: {
        uploadDir: path.join(__dirname, '../uploads'),    // 上传到的路径
        keepExtensions: true, // 是否保留上传文件的扩展名
    },
}));
app.use(cors({
    origin: '*', // 允许所有域名跨域访问
    allowMethods: ['GET', 'POST', 'DELETE', 'PATCH'], // 允许的跨域请求方法
    allowHeaders: ['Content-Type', 'Authorization'] // 允许的跨域请求头
}))
app.use(router.routes());
app.use(router.allowedMethods());   // 处理不支持的请求方法

module.exports = app;