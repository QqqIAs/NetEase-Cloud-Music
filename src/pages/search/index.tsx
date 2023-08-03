import { useSearchParams } from "react-router-dom"
import { Tabs } from "antd";
import SingleSong from "./SingleSong";
import styles from './index.module.less'
import { useState } from "react";

function Search () {

  const [searchParams, setSearchParams] = useSearchParams()
  const params = searchParams.get('keywords')
  const [count, setCount] = useState(0)


  const items = [
    {
      key: '1',
      label: `单曲`,
      children: <SingleSong params={params} showCount={(v) => setCount(v)}  ></SingleSong>,
    },
    {
      key: '2',
      label: `歌手`,
      children: `Content of Tab Pane 2`,
    },
    {
      key: '3',
      label: `专辑`,
      children: `Content of Tab Pane 3`,
    },
    {
      key: '4',
      label: `视频`,
      children: `Content of Tab Pane 4`,
    },
    {
      key: '5',
      label: `歌单`,
      children: `Content of Tab Pane 5`,
    },
    {
      key: '6',
      label: `歌词`,
      children: `Content of Tab Pane 6`,
    },
    {
      key: '7',
      label: `播客`,
      children: `Content of Tab Pane 7`,
    },
    {
      key: '8',
      label: `用户`,
      children: `Content of Tab Pane 8`,
    },
  ];


  return <>
    <div className={styles.root}>
      <div style={{ display: 'flex', marginBottom: '8px' }}>
        <span style={{ fontSize: '22px', marginRight: '6px', fontWeight: 'bold'}}>{params}</span>
        <span  className={styles.find}>{`找到 ${count} 首单曲`}</span>
      </div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
    </>
}

export default Search