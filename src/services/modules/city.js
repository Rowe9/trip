import hyRequest from '../request'


export function getCityAll() {
    return hyRequest.get({
        url: "/city/all"
    })
}




/* import axios from 'axios'
export function getCityAll() {
    return axios.get("http://123.207.32.32:1888/api/city/all").then(res => {
        console.log(res)

    })
}
 */



