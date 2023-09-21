const { DataTypes } = require('sequelize'); // 导入数据类型
const seq = require('../database/seq');
const Users = require('./users.model');

const Blacks = seq.define(
  'black',
  {
    // id会被sequlize自动创建
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '用户id',
    },
    bid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '被拉黑的用户id',
    },
  },
  {
    timestamps: false,
  },
);
// 默认情况下，会使用数据类型DataTypes.DATE自动向每个模型添加createAt和updateAt，这里不需要，直接禁止添加

// 建立外键
Blacks.belongsTo(Users, {
  foreignKey: 'uid',
});
Blacks.belongsTo(Users, {
  foreignKey: 'bid',
});

// Blacks.sync({
//   // 模型同步，创建该表
//   force: true, // 数据库如果存在该表，则先删除
// });

module.exports = Blacks;
