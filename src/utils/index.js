/**
 * cookie的增取删
 * @param token
 */
export const setCookie = (name, value, iDay) => {
    var oDate = new Date()
    oDate.setDate(oDate.getDate() + iDay)
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + oDate + ';path=/'
}
export const getCookie = (name) => {
    var arr = document.cookie.split('; ')
    var i = 0
    for (i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=')
        if (arr2[0] === name) {
            var getC = decodeURIComponent(arr2[1])
            return getC
        }
    }
    return ''
}

export const removeCookie = (name) => {
    setCookie(name, '1', -1)
}

/**
 * 深拷贝
 * @param source
 * @returns {*}
 */
export const deepClone = (source) => {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'deepClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach((keys) => {
        if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = deepClone(source[keys])
        } else {
            targetObj[keys] = source[keys]
        }
    })
    return targetObj
}

/**
 * 用于表格数据删除/批量删除，将第2页的前2条数据删除，列表刷新之后页数显示为第1页且刷新数据
 * @param tableData table数据
 * @param currentPage 页数
 * @param multipleSelection 批量数据
 */
export const getcurrentPage = (tableData = [], currentPage, multipleSelection = []) => {
    let num = currentPage
    if (tableData.length <= 1 && Number(num) > 1) {
      num -= 1
    }
    if (tableData.length === multipleSelection.length && Number(num) > 1) {
        num -= 1
    }
    return num
  }