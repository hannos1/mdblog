const { FailToBlack } = require("../constant/err.types");
const { getUserInfo } = require("../service/users.service");

const checkUserIsValid = async (ctx, next) => {
    const { uid, username } = ctx.request.body;
    try {
        const bUser = await getUserInfo({ username });
        if (uid === bUser.id || !uid || !bUser.id) {
            console.log('用户的id不存在或者相同了');
            ctx.body = FailToBlack;
            return;
        }
        ctx.request.body = {
            uid,
            bid: bUser.id
        };
        await next();
    } catch(e) {
        ctx.body = FailToBlack;
    }
}

module.exports = {
    checkUserIsValid
};