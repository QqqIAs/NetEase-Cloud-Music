export interface BannerType {
  targetId: number
  targetType: number
  titleColor: string
  imageUrl: string
  typeTitle: string
}

export interface SongList {
  alg: string
  canDislike: true
  copywriter: string
  highQuality: boolean
  id: number
  name: string
  picUrl: string
  playCount: number
  trackCount: number
  trackNumberUpdateTime: number
  type: number
  coverImgUrl: string
}

export interface RecommendSongList {
  category: number
  hasTaste: boolean
  result: SongList[]
}

// 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
export enum TARGET_TYPE {
  MUSIC = 1,
  ALBUM = 10,
  ARTIST = 100,
  SONG_LIST = 1000,
  USER = 1002,
  MV = 1004,
  LYRIC = 1006,
  BROADCASTING_STATION = 1009,
  VIDEO = 1014,
}