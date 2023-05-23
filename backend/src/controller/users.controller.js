const { createUser, getUserInfo, updateByUsername } = require('../service/users.service.js')
const { userRegisterError, changePasswordFail } = require('../constant/err.types.js')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default.js')

// 控制层，是路由的最后一个需要调用的函数，不需要再使用next放行了
class UserController {
    async register(ctx, next) {
        // 1. 获取数据
        const { username, password } = ctx.request.body;
        try {
            // 2. 操作数据
            const res = await createUser(username, password);
            // 3. 返回结果
            ctx.body = {
                statusCode: 2201,
                message: '用户注册成功',
                result: {
                    uid: res.id,
                    username: res.username,
                }
            };
        } catch (err) {
            ctx.body = userRegisterError;
        }
    }
    async login(ctx, next) {
        const { username } = ctx.request.body;
        // 颁发token
        try {
            const { password, ...res } = await getUserInfo({ username });    // 剔除password
            ctx.body = {
                statusCode: 2202,
                message: '用户登录成功',
                result: {
                    uid: res.id,
                    username: res.username,
                    token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' })
                }
            };
        } catch (err) {
            console.error('用户登录失败')
        }
    }
    async changePassword(ctx, next) {
        const { username, password } = ctx.request.body;

        if (await updateByUsername({ username, password })) {
            ctx.body = {
                statusCode: 2203,
                message: '修改密码成功'
            };
        } else {
            ctx.body = changePasswordFail;
        }
    }
    async searchUserByName(ctx, next) {
        const { username } = ctx.request.body;
        const res = await getUserInfo({ username });
        console.log(res);
        if(res) {
            ctx.body = {
                statusCode: 2204,
                message: '查询成功',
                result: {
                    uid: res.id,
                    username: res.username,
                    avatar: ''
                }
            }
        } else {

        }
    }
}

// 导出实例化对象
module.exports = new UserController();