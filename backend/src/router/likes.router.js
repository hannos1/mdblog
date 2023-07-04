const Router = require('koa-router');
const { auth } = require('../middleware/auth.middleware');
const { cancelLike, addLike } = require('../controller/likes.controller');

const router = new Router({ prefix: '/LikeIt' });  // 以下编写的路径自动添加该前缀

// 点赞文章
router.post('/addLike', auth, addLike)
// 取消点赞文章
router.post('/cancelLike', auth, cancelLike);

module.exports = router;