import request from '../request/index'

export const getSearchHot = () => {
  return request.get('/search/hot/detail')
}