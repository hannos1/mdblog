const Router = require('koa-router');
const { auth } = require('../middleware/auth.middleware');
const { addBlackUser, delBlackUser } = require('../controller/blacks.controller');
const { checkUserIsValid } = require('../middleware/blacks.middleware');
const router = new Router({ prefix: '/blackList' });  // 以下编写的路径自动添加该前缀

// 拉黑用户
router.post('/addBlackUser', auth, checkUserIsValid, addBlackUser)
// 取消拉黑
router.post('/cancelBlackUser', auth, checkUserIsValid, delBlackUser);

module.exports = router;