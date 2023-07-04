const Blacks = require("../model/blacks.model");

class BlacksService {
    async add({ uid, bid }) {
        await Blacks.create({ uid, bid });
    }
    async del({ uid, bid }) {
        const whereOp = { uid, bid };
        await Blacks.destroy({
            where: whereOp
        });
    }
    async search(uid) { // 查找uid这个用户所拉黑的bid
        let bids = await Blacks.findAll({
            where: {
                uid
            }
        });
        bids = [...bids];
        return bids.map(bid => bid.dataValues.bid);
    }
}

module.exports = new BlacksService();