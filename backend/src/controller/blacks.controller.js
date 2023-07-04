const { FailToBlack, FailToCancel } = require("../constant/err.types");
const { add, del } = require("../service/blacks.service");

// 控制层，是路由的最后一个需要调用的函数，不需要再使用next放行了
class BlacksController {
    async addBlackUser(ctx, next) {
        const { uid, bid } = ctx.request.body;
        try {
            await add({ uid, bid });
            ctx.body = {
                statusCode: 4201,
                message: "拉黑成功"
            };
        } catch (e) {
            console.log(e);
            ctx.body = FailToBlack;
        }
    }
    async delBlackUser(ctx, next) {
        const { uid, bid } = ctx.request.body;
        try {
            await del({ uid, bid });
            ctx.body = {
                statusCode: 4202,
                message: "取消拉黑成功"
            };
        } catch (e) {
            console.log(e);
            ctx.body = FailToCancel;
        }
    }
}

// 导出实例化对象
module.exports = new BlacksController();