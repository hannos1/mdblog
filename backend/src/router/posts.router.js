const Router = require('koa-router');
const { getInitData, publish, searchByName } = require('../controller/posts.controller');
const { contentHash, checkType } = require('../middleware/posts.middleware');
const { auth } = require('../middleware/auth.middleware');
const router = new Router({ prefix: '/post' });  // 以下编写的路径自动添加该前缀

// 初始化给出的数据
router.get('/initData', getInitData);

// 新增文章接口
router.post('/addPost', auth, checkType, contentHash, publish)
// 根据用户名查询文章
router.get('/searchByName', auth, searchByName)



module.exports = router;