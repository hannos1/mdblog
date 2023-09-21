const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config.default')
const { tokenExpiredError,invalidToken,hasNotAdminPermission } = require('../constant/err.types'); 

const auth = async (ctx,next) => {  // 验证用户
    const { authorization } = ctx.request.header;   // token 在放在authorization中
    const token = authorization.replace('Bearer ','');
    try {
        const user = jwt.verify(token,JWT_SECRET);
        ctx.state.user = user;
    } catch(err) {
        switch(err.name) {
            case 'TokenExpiredError':
                console.error('token过期');
                return ctx.body = tokenExpiredError;
            case 'JsonWebTokenError':
                console.error('无效token');
                return ctx.body = invalidToken;
        }
    }
    await next();
}

module.exports = {
    auth
};