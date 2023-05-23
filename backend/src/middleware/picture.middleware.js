const sharp = require('sharp');
const fs = require('fs');


const compressPicture = async (ctx, next) => {
    console.log(ctx.request.body);
}
module.exports = {
    compressPicture
}