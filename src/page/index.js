import { Layout, Menu,Input, Icon } from 'antd';
import React from "react";
import ShowCard from "../component/Card";
import {Link, Route, Switch, Redirect, NavLink, HashRouter} from "react-router-dom";
import Uploads from "./upload";
import Likes from "./likes";
import Home from "./home";

import unsplash from '../services/unsplash';
import {toJson} from 'unsplash-js';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;

export class SiderDemo extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    onSearch = (keyword) => {
        // console.log(keyword);
        // ipcRenderer.send('search-image', keyword);

        // const authenticationUrl = unsplash.auth.getAuthenticationUrl([
        //     'public',
        //     'read_photos'
        // ]);
        //
        // window.location.assign(authenticationUrl);

        // console.log(unsplash);

        unsplash.search.photos(keyword, 1, 20)
            .catch(err => {
                console.log(err);
            })
            .then(toJson)
            .then(json => {
                console.log(json);
                ipcRenderer.send('search-image-result', json);
            });


    };

    render() {
        return (
            <HashRouter>
            <Layout>
                <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0  }} >
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">                           
                            <Icon type="home" theme="outlined" />
                            <span className="nav-text">Home</span>
                            <NavLink to="/"></NavLink>
                        </Menu.Item>
                        <Menu.Item key="2">                           
                            <Icon type="cloud-upload" theme="outlined" />
                            <span className="nav-text">Upload</span>
                            <NavLink to="/upload"></NavLink>
                        </Menu.Item>
                        {/* <Menu.Item key="3">
                            <Icon type="heart" theme="outlined"/>
                            <span className="nav-text">Likes</span>
                            <NavLink to="/likes"></NavLink>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="folder" theme="outlined" />
                            <span className="nav-text">Collection</span>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Icon type="setting" theme="outlined" />
                            <span className="nav-text">Setting</span>
                        </Menu.Item> */}
                    </Menu>
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    <Header style={{ background: '#fff', padding: 0}}>
                    <div style={{ textAlign: 'center' }}>
                        <Search style={{ marginLeft: 10}} placeholder="want to find more?" onSearch={keyword => this.onSearch(keyword)} enterButton/>
                    </div>
                    </Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div style={{ padding: 24, background: '#fff', textAlign: 'center',minHeight: 660 }}>
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route path="/upload" component={Uploads}/>
                                <Route path="/likes" component={Likes}/>
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Wallpaper Workshop ©2018 Created by KetchUp
                    </Footer>
                </Layout>
            </Layout>
            </HashRouter>
        );
    }
}

export default SiderDemo;