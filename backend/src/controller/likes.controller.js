const { like, cancel } = require("../service/likes.service");

// 控制层，是路由的最后一个需要调用的函数，不需要再使用next放行了
class LikesController {
    async addLike(ctx, next) {
        const { uid: userId, postId } = ctx.request.body;
        try {
            await like({ userId, postId });
            ctx.body = {
                statusCode: 3201,
                message: "点赞成功"
            };
        } catch(e) {
            ctx.body = {
                statusCode: 3401,
                message: "点赞失败"
            };
        }
    }
    async cancelLike(ctx, next) {
        const { uid: userId, postId } = ctx.request.body;
        try {
            await cancel({ userId, postId });
            ctx.body = {
                statusCode: 3202,
                message: "取消点赞"
            };
        } catch(e) {
            console.log(e);
            ctx.body = {
                statusCode: 3402,
                message: "取消失败"
            };
        }
    }
}

// 导出实例化对象
module.exports = new LikesController();