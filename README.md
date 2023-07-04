### 技术路线
- 前端使用nuxt3 + pinia + tailwindcss + naive-ui + vueuse
    - 瘦客户端，我们使用node来处理md文件内容，返回给页面详情
    - 通过将md文件上传服务器，保存到服务器后会在数据产生记录，详情页请求数据时读出本地文件返回html字符串

### 开发细节
1. 项目架构
    - backend 服务端接口
    - components 通用组件
    - composables hooks、pinia
    - layouts 布局
    - pages 页面组件
    - plugins 插件
    - public 全局静态素材
    - types 接口、类型
    - 各种config...


2. 页面跳转
    1. NuxtLink标签
        - 使用NuxtLink不会刷新页面
        - NuxtLink无法被event的stopPropagation阻止
    2. a标签
        - 刷新页面，少用
    3. window.open
        - 可以用它来在新标签页打开某个页面
        - 可以使用event的stopPropagation阻止
    4. navigateTo
        - vue原生，跟nuxtlink差不多


3. 异步处理
    1. promise的resolve传值
        - 通过emit向父组件传递resolve方法来控制数据流和组件生存顺序
        - 用来实现了'不看该作者'
    2. ssr数据获取
        - 使用useAsyncData来获取详情页数据，否则ssr没有意义
    3. 请求防抖，减少请求数
        - 点赞请求可能会很多，我们对它进行了最基本的防抖处理，保证服务端和客户端数据一致的同时提高性能
        - 防抖应该在组件中实现而不是在pinia中实现，这样会产生数据的不一致


4. 组件传值
    1. 如果在@click上的参数名给了参数值，那么只会拿到对应参数的值
    2. pinia，一如既往地好用
    3. 依赖注入 nuxt提供了useState

5. 服务端
    1. 图片压缩
    2. 数据库表设计
        - 实现了最基本的订阅黑名单


6. 其他
    1. naive-ui和tailwind混用导致样式丢失
        - 解决：在组件挂载时向head插入包含naive-ui的样式的meta，保证它在tailwind预处理后生效
    2. debounce失效
        - 如果在函数中调用debounce，因为它不属于组件的方法，结果回调只延迟一段时间后连续触发
        - vue去抖动节流，为了不让防抖节流这种有状态的函数影响组件复用，需要按规范来进行防抖节流
    3. jest单元测试
        - 用于测试自定义各种hooks
    4. ts
        - 遍历对象用可索引类型，排错效率很高

# mdblog后台使用
## 技术栈
- mysql、koa、sequelize
## 数据库表(model)
- 有四张表，分别是users（用户表）、posts（文章表）、blacks（拉黑名单）、likes（点赞文章）
- users表有id、username、password，分别表示主键、用户名和密码
- posts表有id、username、title、summary、contenHash、filePath、updatedAt、deletedAt、userId分别表示主键、作者用户名、文章标题、文章摘要、文章内容的哈希值、文章存放的物理路径、更新或创建文章时间、删除文章时间
- blacks表有id、uid、bid分别表示主键、用户id和该用户拉黑的用户id
- likes表有id、userId、postId分别表示主键、用户id和该用户点赞的文章id
- 其中posts表中的userId依赖users表中的id，blacks表中的uid和bid都依赖users表中的id，likes表中的userId依赖users表的id，postId依赖posts中的id
## 路由(router)
- 用户路由有注册、登录、修改、上传或修改头像
- 文章有首页需要展示的初始化数据、添加文章、查询文章、修改文章、根据标题模糊查询等
- 拉黑和点赞只有两接口，分别是拉黑用户和取消拉黑，点赞文章和取消点赞
## 中间件(middleware)
- 使用了一些自定义的中间件去检查，避免产生错误，比如说检查密码以及用户名不能为空、检查两次密码是否一致，是否有token、id是否有效等
- 以及使用了加密算法（bcryptjs）对密码加密，避免密码的暴露，对文章内容哈希（crypto计算哈希值）处理，如果再次修改哈希内容没有变化就说明没有修改，避免对文件IO操作
- 登录的时候给用户一个token（jsonwebtoken颁发token）
- 中间件是在controller（控制层）之前使用
## 控制层(controller)
- 将数据给服务层，返回给浏览器响应数据，每个操作对应控制层的一个方法，该方法调用服务层的方法
## 服务处(service)
- 实际操作数据库的层次，不同操作创建不同方法与之对应，将操作结果返回给控制层
## 错误常量(constant)
- 定义一些错误的状态码和错误信息，以便复用
## 配置(config)
- 使用了dotenv从.env文件读取变量，并注入到nodejs中的process.env对象，避免数据库隐私数据暴露且方便修改（不是写死，使用变量代替，方便修改）
## 静态资源目录(public)
- 将用户上传的头像放在该目录下，服务器可以根据地址直接访问并使用
## 优化处
- 读取路由的时候，使用了fs模块将该目录下路由读取出来，避免有多少路由手动注册多少路由
- 将入口(main.js)与一些预处理(app.js)分离开，方便维护
