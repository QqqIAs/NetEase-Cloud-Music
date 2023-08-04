import { useEffect, useRef, useState } from 'react';
import styles from './index.module.less'
import { getLyric } from '@/services/search';
import useAudioStore from '@/store/useAudioStore';
import cn from 'classnames'
import convertTimeToSeconds from '@/utils/convertTimeToSeconds'
import { useInViewport } from 'ahooks';


function SongLyric () {

  const [lyric, setLyric] = useState('')
  const parentRef = useRef(null);
  const [inViewport] = useInViewport(parentRef);
  const ref = useRef(null)

  const [ix, setIx] = useState(0);

  const { id, songName, artists, playCurrentTime, setPlayCurrentTime, setLyricJump, lyricJump } = useAudioStore((state) => state)
  

  const latestId = id == 0 ? JSON.parse(localStorage.getItem('musicInitialState')!).id : id;
  const latestSongName = songName ? songName : JSON.parse(localStorage.getItem('musicInitialState')!).songName
  const latestArtists =  artists ? artists : JSON.parse(localStorage.getItem('musicInitialState')!).artists

  useEffect(() => {
    getLyric({id: latestId}).then(res => setLyric(res.lrc.lyric))
  }, [latestId])


  const timeAndLyricsRegex = /\[(\d{2}:\d{2}\.\d+)\]([\s\S]*?)(?=\n\[|$)/gm;

  const matches = Array.from(lyric.matchAll(timeAndLyricsRegex));

  const times = matches?.map(match => match[1]);
  const lateTimes = times.map((item) => convertTimeToSeconds(item))
  const lyricsArray = matches?.map(match => match[2].trim());

  // 歌词匹配算法
  lateTimes.forEach((time, index) => {
    if(time < playCurrentTime && lateTimes[index + 1] > playCurrentTime){
      if(index !== ix) setIx(index)
    }
  })

  useEffect(() => {
    inViewport && ref.current && ref.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  }, [ix])

  return (
    <>
      <div className={styles.root}>
        <div className={styles.name}>
          {latestSongName}
        </div>
        <div className={styles.artist}>
          <span>歌手：</span>
          <span style={{ color: '#6685b1' }}>{latestArtists}</span>
        </div>
        <div ref={parentRef} className={styles.lyric}>
        {
          lyricsArray.length > 0 && lyricsArray.map((item, index) => {
            return <div 
                ref={ index === ix ? ref : null }
                onClick={() => {setPlayCurrentTime(lateTimes[index]); setIx(index); setLyricJump(!lyricJump); }} 
                className={cn(styles.row, index === ix ? styles.activeRow : undefined )}>{item}
              </div>
          })
        }
        </div>
      </div>
    </>

  )
}

export default SongLyric