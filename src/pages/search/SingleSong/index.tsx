import useAudioStore from "@/store/useAudioStore";
import getArtistsName from "@/utils/getArtistsName";
import getDurationTime from "@/utils/getDurationTime";
import { Table } from "antd";
import * as searchApi from '@/services/search'
import { useAntdTable, useUpdateEffect } from 'ahooks';
import { useEffect, useState } from "react";
import styles from './index.module.less'
import { RightOutlined } from "@ant-design/icons";



function SingleSong(props) {

  const { params, showCount } = props

  const { setInitialState, } = useAudioStore((state) => state)
  const [perfectSong, setPerfectSong] = useState({})


  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 80,
      render: (v) => {
        return <span style={{ color: '#c0c0c0' }}>{v}</span>
      }
    },
    {
      title: '音乐标题',
      dataIndex: 'songName',
      key: 'songName',
      width: '50%',
      render: (text) => {
        // 使用正则表达式来替换关键词并高亮显示
        const regex = new RegExp(params, 'gi');
        const highlightedText = text.replace(regex, (match) => `<span style="color: #bd3a32;">${match}</span>`);
        return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />
      },
    },
    {
      title: '歌手',
      dataIndex: 'artists',
      key: 'artists',
      render: (v) => {
        return <span>{getArtistsName(v)}</span>
      },
      width: 170
    },
    {
      title: '专辑',
      dataIndex: 'albumName',
      key: 'albumName',
      ellipsis: true,
      render: (text) => {
        // 使用正则表达式来替换关键词并高亮显示
        const regex = new RegExp(params, 'gi');
        const highlightedText = text.replace(regex, (match) => `<span style="color: #bd3a32;">${match}</span>`);
        return <div className={styles.ellipsis} dangerouslySetInnerHTML={{ __html: highlightedText }} />
      },
    },
    {
      title: '时长',
      dataIndex: 'duration',
      key: "duration",
      ellipsis: true,
      render: (v) => {
        return <span>{getDurationTime(v)}</span>
      },
      width: 170
    }
  ];

  const rowClassName = (record, index) => {
    // 在这里根据需要设置行高
    return 'custom-row'; // 这是自定义样式类名
  };

  const handlePlay = async(record) => {
    const result = await searchApi.getAlbum(record.albumId)
    const picUrl = result?.album.blurPicUrl;
    setInitialState({
      picUrl,
      name: record.songName,
      artists: record.artists,
      id: record.id,
      duration: record.duration
    })
  }

  const { tableProps, pagination } = useAntdTable(
    async ({ current }) => {
      const { result: {songs, songCount}}  = await searchApi.getSearchKeyword({
        offset: (current - 1) * 100,
        keywords: params
      });
      const list = []
      songs.map((item, index) => {
        list.push({
          index: ((current - 1) * 100 + index + 1) < 10 ? '0'+((current - 1) * 100 + index + 1) : ((current - 1) * 100 + index + 1),
          songName: item.name,
          albumId: item.album.id,
          id: item.id,
          artists: item.artists,
          albumName: item.album.name,
          duration: item.duration,
        })
      })
      showCount(songCount)
      // 最佳匹配
      const result = await searchApi.getAlbum(list[0].albumId)
      setPerfectSong(Object.assign({},list[0], {picUrl: result?.album?.blurPicUrl}))
      return { list, total: songCount };
    },
    { debounceWait: 300, defaultPageSize: 100, refreshDeps: [params] },
  );

  const [dataSource, setDataSource] = useState(tableProps?.dataSource || [])

  useUpdateEffect(() => {
    setDataSource(tableProps?.dataSource || [])
  }, [tableProps?.dataSource]);

  return <>
    <div className={styles.root}>
    {
      Object.keys(perfectSong).length > 0 ? <><div>最佳匹配</div>
      <div className={styles.perfect}>
        <img src={perfectSong.picUrl} alt="" />
        <span style={{marginLeft: '8px', lineHeight: '80px'}}>{` 歌手:`}
          <span style={{marginLeft: '10px'}}>{getArtistsName(perfectSong.artists)}</span>
        </span>
        <span style={{ position:'absolute', lineHeight: '80px', right: '20px'  }}><RightOutlined /></span>
      </div></> : null
    }
    <Table 
      // rowKey='xxx'
      rowClassName={rowClassName}
      columns={columns} 
      {...tableProps} 
      onRow={(record, index) => {
        return {
          onClick: () => {handlePlay(record)}
        }
      }}
      />
    </div>
  </>
}

export default SingleSong