// 我们想要在一个数据数组里面用for循环读取到对应的图片
// 在webpack环境中，支持使用:img=require(item.image)的方式
// 但是在vite环境当中，比较麻烦，需要这样写，下面的参数一是做了一个拼接
// 这个被写在utils下，是一个工具函数

export const getAssetURL = (image) => {
    // 参数一：图片的相对路径
    // 参数二：当前路径的URL
    return new URL(`../assets/img/${image}`, import.meta.url).href
}

