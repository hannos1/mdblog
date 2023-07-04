const path = require('path');
const fs = require('fs');
const { marked } = require('marked');

const { publishError, modifyError, searchError } = require('../constant/err.types');
const { searchLatestPost, publishPost, searchPosts, getPostInfo, modifyPost, searchBlur } = require('../service/posts.service');
const { getUserInfo } = require('../service/users.service');
const { ROOT_DIR } = require('../config/config.default');
const { count } = require('../service/likes.service');

const storePost = async (newPath, newFilename, oldPath) => {
    if (!fs.existsSync(newPath)) {
        fs.mkdir(newPath, { recursive: true }, err => {
            if (err) {
                console.log('创建失败');
            }
        });

    }
    fs.rename(oldPath, `${newPath}/${newFilename}`, err => {
        if (err) {
            console.log('上传失败', err);
        } else {
            console.log('上传成功');
        }
    })
};

const getHTMLContent = (filePath) => {
    let str = fs.readFileSync(filePath, 'utf-8');
    return marked.parse(str);
};

// 控制层，是路由的最后一个需要调用的函数，不需要再使用next放行了
class PostsController {
    async getInitData(ctx, next) {
        const { articleNum, uid: userId } = ctx.request.query;
        try {
            const res = await searchLatestPost({ articleNum, userId });
            const data = [];
            // 使用map无法异步等待，导致结果都为空
            for (let i = 0; i < res.length; ++i) {
                const post = res[i];
                const likesNum = await count({ postId: post.id });
                const liked = await count({ postId: post.id, userId });
                const item = {
                    articleId: post.id,
                    username: post.username,
                    deployDate: post.updatedAt,
                    title: post.title,
                    summary: post.summary,
                    likesNum,
                    liked
                };
                data.push(item);
            }
            ctx.body = {
                statusCode: 1202,
                message: "查询成功",
                result: {
                    articleArr: data
                }
            }
        } catch (e) {
            ctx.body = searchError;
        }
    }
    async publish(ctx, next) {
        try {
            const { uid: userId } = ctx.request.body;
            const oldPath = ctx.request.files.mdPost.filepath,
                newFilename = ctx.request.files.mdPost.newFilename,
                newPath = path.join(ROOT_DIR, `storage/${userId}`);

            await storePost(newPath, newFilename, oldPath);
            const res = await publishPost({ ...ctx.request.body, userId, filePath: path.join(newPath, newFilename) });
            ctx.body = {
                statusCode: 1201,
                message: '上传成功',
                result: {
                    articleId: res.id,
                    username: res.username,
                    title: res.title,
                    uploadDate: res.updatedAt
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
                    deployDate: post.updatedAt,
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
        } catch (e) {
            ctx.body = searchError;
        }
    }
    async modify(ctx, next) {
        const { username, postId, contentHash } = ctx.request.body;
        try {
            const post = await getPostInfo({ username, id: postId });
            if (post && post.contentHash === contentHash) {
                ctx.body = {
                    statusCode: 1204,
                    message: '内容没有修改',
                    result: {}
                };
            } else {
                const oldPath = ctx.request.files.mdPost.filepath,
                    newFilename = ctx.request.files.mdPost.newFilename,
                    newPath = path.join(ROOT_DIR, `storage/${post.userId}`);
                // 存储新文件内容到磁盘
                await storePost(newPath, newFilename, oldPath);
                // 在磁盘中删除旧文件
                fs.unlink(post.filePath, err => {
                    if (err) {
                        console.log('删除失败');
                    }
                });
                // 更新数据库信息
                await modifyPost({ id: postId, filePath: path.join(newPath, newFilename), contentHash });
                // 将.md转换为html
                const html = getHTMLContent(path.join(newPath, newFilename));
                ctx.body = {
                    statusCode: 1203,
                    message: '修改成功',
                    result: {
                        htmlStr: html
                    }
                };
            }
        } catch (e) {
            ctx.body = modifyError;
        }
    }
    async searchById(ctx, next) {
        const { articleId: id } = ctx.request.query;
        try {
            const post = await getPostInfo({ id });
            const html = getHTMLContent(post.filePath);
            ctx.body = {
                statusCode: 1202,
                message: "查询成功",
                result: {
                    htmlStr: html
                }
            };
        } catch (e) {
            ctx.body = searchError;
        }

    }
    async searchByTitle(ctx, next) {
        const { title, uid: userId } = ctx.request.body;
        try {
            const posts = await searchBlur({ title, userId });
            const data = [];
            for (let i = 0; i < posts.length; ++i) {
                const post = posts[i];
                const likesNum = await count({ postId: post.id });
                const liked = await count({ postId: post.id, userId });
                const item = {
                    articleId: post.id,
                    username: post.username,
                    deployDate: post.updatedAt,
                    title: post.title,
                    summary: post.summary,
                    likesNum,
                    liked
                };
                data.push(item);
            }
            ctx.body = {
                statusCode: 1202,
                message: "查询成功",
                result: {
                    articleArr: data
                }
            }
        } catch (e) {
            console.log(e);
            ctx.body = searchError;
        }
    }
}

// 导出实例化对象
module.exports = new PostsController();