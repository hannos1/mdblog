export type Article = {
    id:number;  // 文章id
    title:string;  // 标题
    author:string;  // 文章作者
    deployDate:Date | string; // 发布日期
    description:string;  // 摘要
    likesNum:number;  // 点赞数
    liked:boolean;  // 是否被点赞
}

export type ArticleList = Array<Article>