// mock/data.js
import Mock from 'mockjs'
 
const random = Mock.Random
const MockList = Mock.mock({
  'items|32': [
    {
      'id': '@id',
      // code: () => random.integer(1000000, 200000),
      account: () => random.string('number', 11),
      name: () => random.cname(3, 6),
      'age|18-60': 1,
      phone: () => random.string('number', 11),
      address: () => random.city(true),
      'email': '@email',
      sex: '@integer(1,2)',
      'status|1': '@integer(1,2)',
      'updateTime': '@datetime',
    }
  ]
})
const list = MockList.items
export const getList = (params) => {
  
  const { name, sex, address, status, updateTime } = params || {}
  let resultList = list.filter(
    (item) => !name || item.name.indexOf(name) > -1
  )
  resultList = list.filter(
    (item) => !address || item.address.indexOf(address) > -1
  )
  resultList = resultList.filter(
    (item) => !sex || item.sex === sex
  )
  resultList = resultList.filter(
    (item) => !status || item.status === status
  )
  resultList = resultList.filter(
    (item) => !updateTime || item.updateTime.indexOf(updateTime) > -1
  )
  const total = resultList.length
  const pageSize = params ? params.size : 10
  const pageNum = params ? params.current : 1
  const result = resultList.slice(
    pageSize * (pageNum - 1),
    pageSize * pageNum
  )
  return {
    data: {
      records: result,
      total: total,
      current: pageNum,
      size: pageSize
    },
    code: 200
  }
}

export const save = (params) => {
  const id = list.length + 1
  list.unshift({ id, ...params, updateTime:random.datetime('yyyy-MM-dd HH:mm:ss') })
  return {
    data: true,
    code: 200
  }
}

export const update = (params) => {
  const index = list.findIndex((item) => item.id === params.id)
  list[index] = Object.assign(list[index], params)
  return {
    data: true,
    code: 200
  }
}

export const get = (id) => {
  const obj = list.find((item) => item.id === id)
  return {
    data: obj,
    code: 200
  }
}

export const deleteItem = (id) => {
  const index = list.findIndex((item) => item.id ===id)
  list.splice(index, 1)
  return {
    data: true,
    code: 200
  }
}
