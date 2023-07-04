const Router = require('koa-router');
const { getInitData, publish, searchByName, modify, searchById, searchByTitle } = require('../controller/posts.controller');
const { contentHash, checkType } = require('../middleware/posts.middleware');
const { checkIdIsValid } = require('../middleware/users.middleware')
const { auth } = require('../middleware/auth.middleware');
const router = new Router({ prefix: '/post' });  // 以下编写的路径自动添加该前缀

// 初始化给出的数据
router.get('/initData', auth, checkIdIsValid, getInitData);
// 新增文章接口
router.post('/addPost', auth, checkIdIsValid, checkType, contentHash, publish)
// 根据用户名查询文章
router.get('/searchByName', auth, searchByName)
// 更新/修改文章接口
router.post('/postUpdate', auth, checkType, contentHash, modify)
// 根据文章id查询文章具体内容
router.get('/quaryPostDetail', auth, searchById)
// 根据文章标题模糊查询
router.post('/searchPostByTitle', auth, checkIdIsValid, searchByTitle)

module.exports = router;