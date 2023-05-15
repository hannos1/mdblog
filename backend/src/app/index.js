// node模块

// 第三方模块
const Koa = require('koa'); // koa是一个类，调用需要实例化
const { koaBody } = require('koa-body');
const KoaStatic = require('koa-static');
const parameter = require('koa-parameter'); // 参数校验
// 自定义模块

const app = new Koa();

module.exports = app;