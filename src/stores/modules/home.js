import { defineStore } from 'pinia'
import hyRequest from "@/services/request/index"
import { getHomeHotSuggests, getHomeCategories, getHomeHouseList } from '@/services'

const useHomeStore = defineStore("home", {
    state: () => ({
        hotSuggests: [],
        categories: [],
        currentPage: 1,
        houseList: []
    }),
    actions: {
        async fetchHotSuggestData() {
            const res = await getHomeHotSuggests()
            this.hotSuggests = res.data
        },
        async fetchCategoriesData() {
            const res = await getHomeCategories()
            this.categories = res.data
        },
        async fetchHouseListData() {
            const res = await getHomeHouseList(this.currentPage)
            // res.data是一个数组
            this.houseList.push(...res.data)
            this.currentPage++
        }
    }
})

export default useHomeStore