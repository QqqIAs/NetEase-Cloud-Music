import { Layout } from 'antd'
const { Sider, Footer, Content } = Layout;
import Navbar from './Header/Navbar';
import LeftSider from './Sider';
import styles from './index.module.less';
import { Outlet } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

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
    <Navbar></Navbar>
    <Layout hasSider className={styles['middle']}>
      <Sider width={180} className={styles['sider']}><LeftSider></LeftSider></Sider>
      <Content className={styles['content']}><Outlet></Outlet></Content>
    </Layout>
    <Footer>Footer</Footer>
  </>
  )  
}

export default MainLayout