import { Layout } from 'antd'
const { Sider, Footer, Content } = Layout;
import LeftSider from './Sider';
import styles from './index.module.less';
import { Outlet } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import Header from './Header';

function MainLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    // 默认路由跳转
    if(location.pathname === '/discovery')
    navigate('recommendation')
  }, [])
  
  return (
  <>
    <div style={{ height: '100vh', overflow: 'hidden'}}>
    <Header></Header>
    <Layout hasSider className={styles['middle']}>
      <Sider width={180} className={styles['sider']}><LeftSider></LeftSider></Sider>
      <Content className={styles['content']}><Outlet></Outlet></Content>
    </Layout>
    <Footer className={styles.footer}>Footer</Footer>
    </div>
  </>
  )  
}

export default MainLayout