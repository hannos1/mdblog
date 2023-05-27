const { DataTypes } = require('sequelize'); // 导入数据类型
const seq = require('../database/seq');
const Users = require('./users.model');

// 创建模型 会自动推导表名，在其后加s 即 posts
const Posts = seq.define('post', {
    // id会被sequlize自动创建
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '发表文章的用户名'
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,    // 字段not null
        comment: '文章标题'
    },
    summary: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "文章摘要"
    },
    contentHash: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "文章内容哈希值，修改之后对比，如果一样就不需要使用IO操作写入文件"
    },
    filePath: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '文章存放的路径'
    }
}, {
    paranoid: true,  // 添加删除字段，记录文章被删除的时间
    createdAt: false    // 有updatedAt就行
});
// 默认情况下，会使用数据类型DataTypes.DATE自动向每个模型添加createAt和updateAt，文章正好需要这两个字段，故不需要禁止添加

// 建立外键，使用userID
Users.hasOne(Posts)
Posts.belongsTo(Users);

// Posts.sync({ // 模型同步，创建该表
//     force: true // 数据库如果存在该表，则先删除
// });

module.exports = Posts;