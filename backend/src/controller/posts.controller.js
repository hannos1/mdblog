const { publishError } = require('../constant/err.types');
const { searchHasLimit, publishPost, searchPosts } = require('../service/posts.service')
const { getUserInfo } = require('../service/users.service')
// 控制层，是路由的最后一个需要调用的函数，不需要再使用next放行了
class PostsController {
    async getInitData(ctx, next) {
        const { articleNum } = ctx.request.query;
        const res = await searchHasLimit(articleNum);

    }
    async publish(ctx, next) {
        try {
            const user = await getUserInfo({ username: ctx.request.body.username });
            const res = await publishPost({ ...ctx.request.body, userId: user.id });
            ctx.body = {
                statusCode: 1201,
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
    async searchByName(ctx, next) { // 根据用户名分页查询
        const { username, page, rows } = ctx.query;
        try {
            const res = await searchPosts({ username, page, rows });
            const data = res.map(post => {
                return {
                    articleId: post.id,
                    deployDate: post.createdAt,
                    title: post.title,
                    summary: post.summary
                }
            });
            ctx.body = {
                statusCode: 1202,
                message: '查询成功',
                result: {
                    articleArr: data
                }
            }
        } catch(e) {
            console.log(e);
        }
    }
}

// 导出实例化对象
module.exports = new PostsController();