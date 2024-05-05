import React from 'react';
import { Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  HomeOutlined,
  FileImageOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const guestMenuItems =  (
    <>
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<FileImageOutlined />}>
        <Link to="/mars-rover-photos">Mars Images</Link>
      </Menu.Item>
    </>
  );
  
export const userMenuItems =  (
  <>
    <Menu.Item key="1" icon={<HomeOutlined />}>
      <Link to="/user">Home</Link>
    </Menu.Item>
    <Menu.Item key="2" icon={<FileImageOutlined />}>
      <Link to="/user/mars-rover-photos">Mars Images</Link>
    </Menu.Item>
    <Menu.Item key="3" icon={<SearchOutlined />}>
      <Link to="/user/earth">Earth</Link>
    </Menu.Item>
    
  </>
);
