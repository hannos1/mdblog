const Posts = require('../model/posts.model');

class PostsService {
    // 根据数量查询文章数据
    async searchHasLimit(articleNum) {
        articleNum = +articleNum;   // 必须是数值类型
        const users = await Posts.findAll({
            order: [
                ['updatedAt', 'DESC']
            ],
            limit: articleNum
        });
        console.log(users);
        // 返回数据...
    }
    async publishPost({ username, title, summary, contentHash }) {
        const post = await Posts.create({ username, title, summary, contentHash});
        return post.dataValues;
    }
}

module.exports = new PostsService();