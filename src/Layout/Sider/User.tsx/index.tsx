import getAssetURL from "@/utils/getAssetURl"
import { CaretRightOutlined } from '@ant-design/icons'

function User() {
  const userImg = getAssetURL('avater.png');
  return <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0px 8px 8px'}}>
    <img style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '8px'}} src={userImg} alt="" />
    <span style={{ color: '#2f2f2f'}}>QqqIAs</span>
    <span><CaretRightOutlined style={{ position: 'relative', top: '1px', marginLeft: '5px',fontSize: '14px', color: '#8e8e8e'}}></CaretRightOutlined></span>
  </div>
}

export default User