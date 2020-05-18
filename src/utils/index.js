export const checkIfSortedAsc = (arr, val) => arr.every((v,i,a) => !i || a[i-1][val] <= v[[val]])


export const searchFunction = (data, searchValue) => {
    let result = []
    if(searchValue.length > 0) {
        result = data.filter(item => {
            const hasElements = Object.values(item).filter(value => {
                return String(value).toLowerCase().includes(searchValue)
            })
            return hasElements.length > 0
        })
    } else {
        result = data
    }
    return result
}