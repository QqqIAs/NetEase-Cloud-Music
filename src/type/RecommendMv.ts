export interface MvResponse {
  code: number;
  category: number;
  result: Result[];
}

export interface Result {
  id: number;
  type: number;
  name: string;
  copywriter: string;
  picUrl: string;
  canDislike: boolean;
  trackNumberUpdateTime?: any;
  duration: number;
  playCount: number;
  subed: boolean;
  artists: Artist[];
  artistName: string;
  artistId: number;
  alg: string;
}

interface Artist {
  id: number;
  name: string;
}