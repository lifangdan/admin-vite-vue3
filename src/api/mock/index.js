// mock/index.js
import Mock from 'mockjs'
import * as json from './json.js'
import config from '@/config'

const apiUrl ='/api' + config.apiBase

Mock.mock(`${apiUrl}/page`, 'post', (options) => {
    const data = JSON.parse(options.body)
    return json.getList(data)
})

Mock.mock(`${apiUrl}/add`, 'post', (options) => {
  const data = JSON.parse(options.body)
  return json.save(data)
})

Mock.mock(`${apiUrl}/update`, 'post', (options) => {
  const data = JSON.parse(options.body)
  return json.update(data)
})

Mock.mock(RegExp(`${apiUrl}/([^d]*)+`), 'delete', (options) => {
  const match = options.url.split('/').pop()
  const id = match ? match : null
  return json.deleteItem(id)
})


