const Router = require('koa-router');
const router = new Router({ prefix: '/user' });  // 以下编写的路径自动添加该前缀
const { auth } = require('../middleware/auth.middleware')
const { register, login, changePassword, searchUserByName, avatarUpload } = require('../controller/users.controller');
const { userValidator, verifyUser, crpytPassword, verifyLogin, checkPasswordsAreSame, checkIdIsValid } = require('../middleware/users.middleware');

// 注册接口
router.post('/register', userValidator, checkPasswordsAreSame, verifyUser, crpytPassword, register);
// 登录接口
router.post('/login', userValidator, verifyLogin, login)
// 修改密码接口
router.post('/updateInfo', auth, crpytPassword, changePassword)
// 根据用户名查询信息
router.post('/queryByName', auth, searchUserByName);
// 上传图片
router.post('/avatarUpload', auth, checkIdIsValid, avatarUpload)

module.exports = router;