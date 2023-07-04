### 技术路线
- 前端使用nuxt3 + pinia + tailwindcss + naive-ui + vueuse，后端koa + 
    - 瘦客户端，我们使用node来处理md文件内容，返回给页面详情
    - 通过将md文件上传服务器，保存到服务器后会在数据产生记录，详情页请求数据时读出本地文件返回html字符串

### 开发细节
1. 项目架构
    - backend 服务端接口
        - 
    - components 通用组件
    - composables hooks、pinia
    - layouts 布局
    - pages 页面组件
    - plugins 插件
    - public 全局静态素材
    - types 接口、类型
    - 404.vue 全局404页面
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
        - 
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
