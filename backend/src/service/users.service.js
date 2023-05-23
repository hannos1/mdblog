const Users = require('../model/users.model');   // 导入视图

// 对数据库的操作
class UserService {
    async createUser(username,password) {
        // 创建并保存到数据库,create返回一个promise
        const res = await Users.create({ username,password });
        return res.dataValues;
    }
    async getUserInfo({ id,username,password }) {
        const whereOpt = {};
        // 有值则加入选项，不能直接加入，有的可能没有传参
        id && Object.assign(whereOpt,{ id });
        username && Object.assign(whereOpt,{ username });
        password && Object.assign(whereOpt,{ password });

        const res = await Users.findOne({
            attributes: ['id','username','password'],
            where: whereOpt
        });
        console.log(res);
        return res ? res.dataValues : null;
    }
    async updateByUsername({ username,password }) {  // 更新数据
        const whereOpt = { username };
        const newUser = {};
        password && Object.assign(newUser,{ password });

        const res = Users.update(newUser,{
            where: whereOpt
        });
        return res;
    }
}

module.exports = new UserService();