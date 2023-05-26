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
    async publishPost({ username, title, summary, contentHash, userId }) {
        const post = await Posts.create({ username, title, summary, contentHash, userId });
        return post.dataValues;
    }
    async searchPosts({ username, page, rows }) {
        try {
            const posts = await Posts.findAll({
                attributes: [
                    'id','createdAt','title','summary'
                ],
                where: {
                    username
                },
                order: [
                    ['updatedAt', 'DESC'],
                    ['createdAt', 'DESC']
                ],
                offset: (page - 1) * rows,
                limit: +rows
            });
            
            return posts.map(post => post.dataValues);
        } catch(e) {
            console.log('查询失败',e);
        }
    }
}

module.exports = new PostsService();