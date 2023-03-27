import { getCityAll } from "@/services";
import { defineStore } from "pinia";

const useCityStore = defineStore("city", {
    state: () => ({
        allCities: {},
        currentCity: {
            // 默认值
            cityName: "广州"
        }
    }),
    actions: {
        async fetchAllCitiesData() {
            const res = await getCityAll()
            this.allCities = res.data//把/city/all里面的data对象的所有数据都放在这里了

        }
    }
})

export default useCityStore