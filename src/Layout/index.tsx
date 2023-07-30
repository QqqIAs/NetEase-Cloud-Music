import { Layout } from 'antd'
const { Sider, Footer, Content } = Layout;
import Navbar from './Header/Navbar';
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
  <Layout style={{ height: '100vh', overflow: 'hidden' }}>
    <Navbar></Navbar>
    <Layout hasSider className={styles['middle']}>
      <Sider style={{ backgroundColor: '#E6E6E6'}}>Sider</Sider>
      <Content className={styles['content']}><Outlet></Outlet></Content>
    </Layout>
    <Footer>Footer</Footer>
  </Layout>
  </>
  )  
}

export default MainLayout