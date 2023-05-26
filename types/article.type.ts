export type ArticleAuthor = {
    authorName:string;
    authorId:number;
}

export type ArticleDate = {
    date:Date | string
}

export type ArticleFile = {
    fileid:number;
}

export type Article = {
    id:number;
    title:string;
    author:ArticleAuthor;
    deployDate:ArticleDate;
    file:ArticleFile;
    description:string;
    likesNum:number;
    liked:boolean;
}

export type ArticleList = Array<Article>