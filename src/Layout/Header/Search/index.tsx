import { GithubOutlined, SearchOutlined, TwitterOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import { Input,} from 'antd';
import { Drawer } from 'antd';
import { useEffect, useState } from 'react';
import DrawerContent from './DrawerContent';
import * as searchApi from '@/services/search'
import { useNavigate } from 'react-router-dom';


const { Search } = Input;

function TopSearch() {

  const navigate = useNavigate()

  const [hotSongs, setHotSongs] = useState([])

  const [open, setOpen] = useState(false);

  useEffect(() => {
    searchApi.getSearchHot().then(res => setHotSongs(res.data))
  }, [])

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const select = [
    {
      icon: <TwitterOutlined></TwitterOutlined>,
      route: 'https://twitter.com/qiudage3'
    },
    {
      icon: <GithubOutlined></GithubOutlined>,
      route: 'https://github.com/QqqIAs'
    },
  ]

  const handleSearch = (value) => {
    // 存储本地
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')!) || []
    if(!searchHistory.includes(value)) {
      searchHistory.unshift(value)
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
    }

    // 执行搜索
    navigate(`/search?keywords=${value}`)
  }

  return (
    <>
      <div className={styles.root}>
      <Drawer rootClassName={styles.testDrawer} autoFocus={false}	 closeIcon={false} placement="right" onClose={onClose} open={open}><DrawerContent hotSongs={hotSongs}></DrawerContent></Drawer>
        <div className={styles.search} >
          <Search 
            onClick={showDrawer}
            onPressEnter={e => handleSearch((e.target as HTMLInputElement).value)}
            placeholder='搜索'  
            allowClear 
            prefix={<SearchOutlined />}></Search>
        </div>
      {
        select.map((item) => {
          return <span key={item.route} onClick={() => {window.open(item.route)}} style={{marginRight: '20px', cursor: 'pointer'}}>{item.icon}</span>
        })
      }
      
      </div>
    </>
  )
}

export default TopSearch