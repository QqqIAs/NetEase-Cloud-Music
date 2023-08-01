import request from '../request/index'
import type { BannerType, RecommendSongList } from '@/type/Recommandation'
import type { RootObject } from '@/type/newMusic'
import type { MvResponse } from '@/type/RecommendMv'

export const getBanner = (): Promise<{ banners: BannerType[] }> => {
  return request.get('/banner?type=0');
};

export const getRecommendSongList = (): Promise<RecommendSongList> => {
  return request.get('/personalized?limit=10')
}

export const getNewSongs = (): Promise<RootObject> => {
  return request.get('/personalized/newsong')
}

export const getRecommendMv = (): Promise<MvResponse> => {
  return request.get('/personalized/mv')
}

