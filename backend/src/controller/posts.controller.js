const { publishError } = require('../constant/err.types');
const { searchHasLimit, publishPost } = require('../service/posts.service')
// 控制层，是路由的最后一个需要调用的函数，不需要再使用next放行了
class PostsController {
    async getInitData(ctx, next) {
        const { articleNum } = ctx.request.query;
        const res = await searchHasLimit(articleNum);

    }
    async publish(ctx, next) {
        if(ctx.body.request.articleNum === 'undefined') {
            ctx.body.request.articleNum = 10;   // 设置默认值
        }

        try {
            const res = await publishPost(ctx.request.body);
            ctx.body = {
                statusCode: 1200,
                message: '上传成功',
                result: {
                    articleId: res.id,
                    username: res.username,
                    title: res.title,
                    uploadDate: res.createdAt
                }
            };
        } catch (e) {
            ctx.body = publishError;
        }
    }
}

// 导出实例化对象
module.exports = new PostsController();