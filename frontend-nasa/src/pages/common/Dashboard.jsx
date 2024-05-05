import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, Space, theme } from 'antd';
import { guestMenuItems, userMenuItems } from '../../components/MenuItems';
import { Dropdown, Flex } from 'antd';
const { Header, Sider, Content } = Layout;
import { useAuth } from './AuthContext';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';

const Dashboard = () => {

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [navLinks, setNavlinks] = useState(guestMenuItems);
    const { logout, userRole } = useAuth();
    const [open, setOpen] = React.useState(true);
    const [userAPI, setuserAPI] = useState('');
    const [isLogin, setIsLogin] = useState('true');
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState({
      firstName: 'Null',
      lastName: 'Null',
    });

      const handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
      };
      
    const handleItemClick = (key) => {
        if (key === '1') {
            // Navigate to Profile page
            navigate('/user/profile');
        } else if (key === '2') {
            // logout();
            logout()
            navigate('/login');
        }
    };

    useEffect(() => {
        switch (userRole) {
          case "user": //Admin
            setNavlinks(userMenuItems);
            if (userAPI != null) {
              setuserAPI('user')
              setAuth(true);
            }
            break;
          default:
            setNavlinks(guestMenuItems)
            navigate("/");
        }
    
      }, []);

      const getUserDetails = async () => {
        try {
          const response = await authAxios.get(`${apiUrl}/user`);
          setUser(response.data);
        } catch (error) {
          console.error(error);
          if (error.response && error.response.status === 404) {
            toast.error('user profile not found.');
          } else {
            // toast.error(error.response?.data?.message || 'An error occurred');
          }
        }
      };
    
      useEffect(() => {
        getUserDetails()
      }, []);

      const items = [
        {
          label: 'Profile',
          key: '1',
          icon: <UserOutlined />,
          onClick: () => handleItemClick('1'),
        },
        {
          label: 'Logout',
          key: '2',
          icon: <LogoutOutlined />,
          onClick: () => handleItemClick('2'),
          danger: true,
        },
      ];
      const menuProps = {
        items,
        onClick: handleMenuClick,
      };
    const headerHeight = 55;

    return (
        <Layout style={{ height: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    {navLinks}
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    {auth == true ?
                        <div style={{ marginRight: 16 }}>
                            <Dropdown menu={menuProps}>
                                <Button>
                                    <Space>
                                        <UserOutlined />
                                        {user.firstName}
                                    </Space>
                                </Button>
                            </Dropdown>
                        </div> :
                        <div style={{ marginRight: 16 }}>
                            <Button onClick={() => { navigate('/login') }} type="text">Login</Button>
                            <Button onClick={() => { navigate('/register') }} type="text">Signup</Button>
                        </div>
                    }

                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: `calc(90vh - ${headerHeight}px)`,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflow: 'hidden'
                    }}
                >
                    <div style={{ overflowX: 'hidden', overflowY: 'auto', maxHeight: `calc(90vh - ${headerHeight}px - 48px)` }} >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
export default Dashboard;
