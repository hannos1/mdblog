const { Op } = require('sequelize');
const Posts = require('../model/posts.model');

class PostsService {
    // 根据数量查询文章数据
    async searchLatestPost(articleNum) {
        articleNum = +articleNum;   // 必须是数值类型
        let posts = await Posts.findAll({
            order: [
                ['updatedAt', 'DESC']
            ],
            limit: articleNum
        });
        // 以防只有一条数据，结果不是数组
        posts = [...posts];
        return posts.map(post => post.dataValues);
    }
    async publishPost({ username, title, summary, contentHash, userId, filePath }) {
        const post = await Posts.create({ username, title, summary, contentHash, userId, filePath });
        return post.dataValues;
    }
    async searchPosts({ username, page, rows }) {   // 分页查询
        try {
            let posts = await Posts.findAll({
                attributes: [
                    'id', 'updatedAt', 'title', 'summary'
                ],
                where: {
                    username
                },
                order: [
                    ['updatedAt', 'DESC']
                ],
                offset: (page - 1) * rows,
                limit: +rows
            });
            posts = [...posts]; // 只找到一行数据的时候，返回的不是数组，故需要特殊处理
            return posts.map(post => post.dataValues);
        } catch (e) {
            console.log('查询失败', e);
        }
    }
    async getPostInfo({ username, id }) {
        const whereOp = {};
        username && Object.assign(whereOp, { username });
        id && Object.assign(whereOp, { id });
        const post = await Posts.findOne({ where: whereOp });
        return post.dataValues;
    }
    async modifyPost({ id, filePath, contentHash }) {
        const whereOp = { id };
        await Posts.update({ filePath, contentHash }, {
            where: whereOp
        });
    }
    async searchBlur(title) {
        let blurTitle = '.*';
        // 拼接模糊查询字符串，保证只要输入对应关键字就可以查询，即使关键字中间不连续也可以
        for(let i = 0;i < title.length;++ i) {
            blurTitle += title[i] + '.*';
        }
        
        let posts = await Posts.findAll({
            where: {
                title: {
                    [Op.regexp]: blurTitle
                }
            }
        });
        posts = [...posts]; // 防止只有一条数据
        return posts.map(post => post.dataValues);
    }
}

module.exports = new PostsService();