import useMediaQuery from '@/hooks/common/useMediaQuery';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Drawer, Layout, Menu, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import React, { ReactNode, FC, Suspense, useState } from 'react';
import { memo } from 'react';
import { Outlet } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { MainWrapper } from './style';
import './index.less';
type IProps = {
    children?: ReactNode;
};

const Main: FC<IProps> = () => {
    // const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(true);
    const matchMedia = useMediaQuery('(min-width: 1600px)');
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            {matchMedia ? (
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    width={200}
                >
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <UserOutlined />,
                                label: 'nav 1',
                            },
                            {
                                key: '2',
                                icon: <VideoCameraOutlined />,
                                label: 'nav 2',
                            },
                            {
                                key: '3',
                                icon: <UploadOutlined />,
                                label: 'nav 3',
                            },
                        ]}
                    />
                </Sider>
            ) : (
                <Drawer
                    placement="left"
                    width={200}
                    closable={false}
                    onClose={() => {
                        setCollapsed(true);
                    }}
                    open={!collapsed}
                    getContainer={false}
                    drawerStyle={{
                        backgroundColor: 'rgb(0, 21, 41)',
                        color: 'white',
                        padding: 0,
                    }}
                >
                    <div>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            items={[
                                {
                                    key: '1',
                                    icon: <UserOutlined />,
                                    label: 'nav 1',
                                },
                                {
                                    key: '2',
                                    icon: <VideoCameraOutlined />,
                                    label: 'nav 2',
                                },
                                {
                                    key: '3',
                                    icon: <UploadOutlined />,
                                    label: 'nav 3',
                                },
                            ]}
                        />
                    </div>
                </Drawer>
            )}
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    {React.createElement(
                        !collapsed
                            ? !matchMedia
                                ? MenuUnfoldOutlined
                                : MenuFoldOutlined
                            : MenuUnfoldOutlined,
                        {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        },
                    )}
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: '800px',
                        background: colorBgContainer,
                    }}
                >
                    <Suspense fallback="Loading...">
                        <Outlet></Outlet>
                    </Suspense>
                </Content>
            </Layout>
        </Layout>
    );
};

export default memo(Main);
