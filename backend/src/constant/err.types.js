module.exports = {
    userFormatError: {
        statusCode: 2401,
        message: '用户名或密码为空',
        result: {}
    },
    userAlreadyExists: {
        statusCode: 2402,
        message: '用户已经存在',
        result: {}
    },
    userRegisterError: {
        statusCode: 2403,
        message: '用户注册错误',
        result: {}
    },
    userDoesNotExist: {
        statusCode: 2405,
        message: '用户不存在',
        result: {}
    },
    userLoginFail: {
        statusCode: 2406,
        message: '登录失败',
        result: {}
    },
    userPasswordInvalid: {
        statusCode: 2407,
        message: '密码错误',
        result: {}
    },
    passwordsAreDiff: {
        statusCode: 2408,
        message: '两次密码不一致',
        result: {}
    },
    tokenExpiredError: {
        statusCode: 2408,
        message: 'token过期',
        result: {}
    },
    invalidToken: {
        statusCode: 2409,
        message: '无效的token',
        result: {}
    },
    changePasswordFail: {
        statusCode: 2410,
        message: '修改密码失败'
    },
    publishError: {
        statusCode: '1204',
        message: "上传文件失败",
        result: {}
    },
    errDateType: {
        statusCode: '20002',
        message: "文件格式不是md格式",
        result: {}
    }
}