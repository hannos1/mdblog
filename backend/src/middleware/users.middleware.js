const { getUserInfo } = require('../service/users.service');
const {
    userFormatError,
    userAlreadyExists,
    userRegisterError,
    userDoesNotExist,
    userLoginFail,
    userPasswordInvalid,
    passwordsAreDiff
} = require('../constant/err.types')
const bcrpty = require('bcryptjs');     // 用于将密码散列（哈希）为安全的字符串

const userValidator = async (ctx, next) => {  // 校验用户合法性
    const { username, password } = ctx.request.body;
    // 合法
    if (!username || !password) {
        console.error('用户名或密码为空！');
        ctx.body = userFormatError
        return;
    }
    await next();  // 没有错误就放行
};

const verifyUser = async (ctx, next) => {  // 验证是否有重复用户
    const { username } = ctx.request.body;
    try {
        if (await getUserInfo({ username })) {
            console.error(`${username}已经存在！`);
            ctx.body = userAlreadyExists
            return;
        }
    } catch (err) {
        ctx.body = userRegisterError;
        return;
    }
    await next();
}

const crpytPassword = async (ctx, next) => {   // 密码加密
    const { password } = ctx.request.body;
    const salt = bcrpty.genSaltSync(10);
    const hash = bcrpty.hashSync(password, salt);    // hash保存的是密文

    ctx.request.body.password = hash;
    await next();
}

const verifyLogin = async (ctx, next) => {    // 验证登录
    const { username, password } = ctx.request.body;

    try {
        const res = await getUserInfo({ username });   // 判断用户是否存在
        if (!res) {
            console.error(`${username}用户名不存在`);
            ctx.body = userDoesNotExist;
            return;
        }
        if (!bcrpty.compareSync(password, res.password)) {    // 判断密码
            console.error('密码错误');
            ctx.body = userPasswordInvalid;
            return;
        }
        await next();
    } catch (e) {
        console.error(e);
        ctx.body = userLoginFail;
    }
}

const checkPasswordsAreSame = async (ctx, next) => {
    const { password, confirmPassword } = ctx.request.body;
    if (password !== confirmPassword) {
        ctx.body = passwordsAreDiff;
        return;
    }
    await next();
}

module.exports = {
    userValidator,
    verifyUser,
    crpytPassword,
    verifyLogin,
    checkPasswordsAreSame
};