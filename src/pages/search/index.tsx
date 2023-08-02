import { useEffect, useState } from "react"
import { useSearchParams, useLocation } from "react-router-dom"
import * as searchApi from '@/services/search'
import { useAntdTable, useUpdateEffect } from 'ahooks';
import { Table } from "antd";
import getDurationTime from "@/utils/getDurationTime";
import getArtistsName from "@/utils/getArtistsName";
import useAudioStore from "@/store/useAudioStore";

function Search () {


  const location = useLocation()
  let [searchParams, setSearchParams] = useSearchParams()
  const { setInitialState, } = useAudioStore((state) => state)
  const params = searchParams.get('keywords')
  const [forceUpdate, setForceUpdate] = useState(false)

  useEffect(() => {
    setForceUpdate(!forceUpdate)
  }, [location.search])

  console.log(location.search)

  const columns = [
    {
      title: '音乐标题',
      dataIndex: 'songName',
      key: 'songName',
    },
    {
      title: '歌手',
      dataIndex: 'artists',
      key: 'artists',
      render: (v) => {
        return <span>{getArtistsName(v)}</span>
      }
    },
    {
      title: '专辑',
      dataIndex: 'albumName',
      key: 'albumName',
    },
    {
      title: '时长',
      dataIndex: 'duration',
      key: "duration",
      render: (v) => {
        return <span>{getDurationTime(v)}</span>
      }
    }
  ];

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
      songs.map((item) => {
        list.push({
          songName: item.name,
          albumId: item.album.id,
          id: item.id,
          artists: item.artists,
          albumName: item.album.name,
          duration: item.duration,
        })
      })
      return { list, total: songCount };
    },
    { debounceWait: 300, defaultPageSize: 100 },
  );

  const [dataSource, setDataSource] = useState(tableProps?.dataSource || [])

  useUpdateEffect(() => {
    setDataSource(tableProps?.dataSource || [])
  }, [tableProps?.dataSource]);

  return <>
    <div>
    <Table 
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

export default Search