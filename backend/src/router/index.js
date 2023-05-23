const fs = require('fs');
const Router = require('koa-router');
const router = new Router();

// 使用文件系统将router文件夹下的所有文件（除了index.js）都读入并调用use方法
fs.readdirSync(__dirname).forEach(file => { 
    if(file !== 'index.js') {
        const fileObject = require('./' + file);
        router.use(fileObject.routes())
    }
})

module.exports = router;