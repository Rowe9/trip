import dayjs from 'dayjs'

// 日期格式化工具
export function formatMonthDay(date, formatStr = "MM月DD日") {
    return dayjs(date).format(formatStr)
}

// 共几晚的格式转化
export function getDiffDays(startDate, endDate) {
    return dayjs(endDate).diff(startDate, "day")
}