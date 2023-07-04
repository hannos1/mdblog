import { defineStore } from 'pinia';
import { Article } from '../types/article.type';
import {articleList as postData} from '~/mock/article'


export const useArticleStore = defineStore('article', () => {
    let state = reactive({
        articleList:[] as Article[]
    })

    const delayTime:number = 1000

    const init = async () => { // 获取数据
        return new Promise(resolve => {
            setTimeout(() => {
                state.articleList = postData
                resolve('成功获取数据')
            }, delayTime);
        })
    }

    const likeOneSync = (id:number) => { // 同步修改一篇文章是否被点赞
        //发请求
        changeOneLiked(id)
    }

    const deleteOneAsync = async (id:number) => {  // 异步删除列表中的一篇文章
        return new Promise(resolve => {
            setTimeout(() => {  // 发请求 限制某个文章的推荐 axios 用定时器先模拟
                removeFromList(id)
                resolve('成功')
            }, delayTime);
        })
    }

    const deleteOneSync = (id:number) => { // 同步删除某篇文章
        removeFromList(id)
    }

    const changeOneLiked = (id:number) => {
        for(let i = 0;i < state.articleList.length;i++){
            if(state.articleList[i].id === id){
                state.articleList[i].liked = !state.articleList[i].liked
                return state.articleList[i].liked
            }
        }
    }

    const removeFromList = (id:number) => {
        for(let i = 0;i < state.articleList.length;i++){
            if(state.articleList[i].id === id){
                state.articleList.splice(i,1)
                break;
            }
        }
    }

    return {
        state,
        init,
        likeOneSync,
        deleteOneAsync,
        deleteOneSync
    }
})
