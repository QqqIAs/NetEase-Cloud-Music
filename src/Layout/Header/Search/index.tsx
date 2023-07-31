import { GithubOutlined, TwitterOutlined } from '@ant-design/icons';
import styles from './index.module.less';

function Search() {
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

  return (
    <>
      <div className={styles.search}>
      {
        select.map((item) => {
          return <span onClick={() => {window.open(item.route)}} style={{marginRight: '20px', cursor: 'pointer'}}>{item.icon}</span>
        })
      }
      </div>
    </>
  )
}

export default Search