const crypto = require('crypto');     // 计算哈希值
const fs = require('fs');

const { errDateType } = require('../constant/err.types')

const contentHash = async (ctx, next) => {  // 将文章内容变哈希字符串
    const filepath = ctx.request.files.mdPost.filepath;
    const fileContent = fs.readFileSync(filepath);

    const hash = crypto.createHash('sha256');
    hash.update(fileContent);
    ctx.request.body.contentHash = hash.digest('hex');  // 以16进制返回哈希值
    await next();  // 没有错误就放行
};

const checkType = async (ctx, next) => {
    const file = ctx.request.files.mdPost;
    // mimetype = 'text/markdown'    检查文件类型是否是md格式
    if (file.mimetype !== 'text/markdown') {
        ctx.body = errDateType;
        return;
    }
    await next();
}

const ifNoLogin = async (ctx, next) => {
    let { uid: buid } = ctx.request.body;
    if(!buid) {
        buid = 0;
        ctx.request.body.uid = buid;
    }
    let { uid: quid } = ctx.request.query;
    if(!quid) {
        quid = 0;
        ctx.request.query = quid;
    }
    await next();
}

module.exports = {
    contentHash,
    checkType,
    ifNoLogin
};