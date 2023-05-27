import {stringToNumber,stringToString} from '~/types/hooks.type'

export const useDateBefore = (
    time:Date | string,
    specificTime?:Date
):string => {
    let timeDeviation:number = specificTime ? Date.parse(specificTime.toLocaleString()) : Date.now()
    timeDeviation -= Date.parse(time.toLocaleString())
    timeDeviation /= 1000 // 去掉毫秒，防止爆number
    let key:string = 'minute'
    let divisor:number = 60
    for(let tb in timeBoundary){
        if(timeDeviation < timeBoundary[tb]){
            key = tb
            break
        }
        divisor = timeBoundary[tb]
    }
    if(key === 'year')return time.toLocaleString()
    return Math.floor(timeDeviation/divisor).toString() + boundaryWord[key]
}

const timeBoundary:stringToNumber = {
    minute:60*60,
    hour:24*60*60,
    day:30*24*60*60,
    month:12*30*24*60*60,
    year:Infinity
}

const boundaryWord:stringToString = {
    minute:'分钟前',
    hour:'小时前',
    day:'天前',
    month:'月前',
    year:''
}