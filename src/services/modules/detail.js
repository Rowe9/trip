import hyRequest from '../request'

// 这个东西会返回一个promise
export function getDetailInfos(houseId) {
    return hyRequest.get({
        url: "/detail/infos",
        params: {
            houseId
        }
    })
}