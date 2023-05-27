const Likes = require("../model/likes.model");

class LikesService {
    async like({ userId, postId }) {
        await Likes.create({ userId, postId });
    }
    async cancel({ userId, postId }) {
        const whereOp = { userId, postId };
        await Likes.destroy({
            where: whereOp
        });
    }
    async count({ postId, userId }) {   // 统计点赞数和该用户是点赞该文章（传入了用户id，如果用户点赞，那么数量为1，否则为0）
        const whereOp = {};
        postId && Object.assign(whereOp, { postId });
        userId && Object.assign(whereOp, { userId });
        const cnt = await Likes.count({
            where: whereOp
        });
        return cnt;
    }
}

module.exports = new LikesService();