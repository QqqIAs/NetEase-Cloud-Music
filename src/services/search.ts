import request from '../request/index'
import { TARGET_TYPE } from '../type/searchType'

export const getSearchHot = () => {
  return request.get('/search/hot/detail')
}

export const getSearchKeyword = ({ keywords, type = TARGET_TYPE.MUSIC, limit = 100, offset = 0 }) => {
  return request.get('/search', {
    params: {
      keywords,
      type,
      limit,
      offset,
    }
  })
}

export const getAlbum = (id) => {
  return request.get('/album', {
    params: {
      id,
    }
  })
}

export const getCommentMusic = ({ id, offset = 0, limit = 30}) => {
  return request.get('/comment/music', {
    params: {
      id,
      limit,
      offset
    }
  })
}