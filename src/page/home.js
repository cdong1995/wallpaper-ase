import React from "react";
import { Upload, message, Button, Icon } from 'antd';
import CardList from '../component/CardList'
import axios from 'axios';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
//const ipcMain = electron.ipcMain;

class Uploads extends React.Component {
    constructor(){
        super()
        this.state={
            posts:[]
        }
    }  

    componentDidMount(){
        ipcRenderer.send('request-image','all');
        ipcRenderer.on('show-all-image',(event, arg) => {
            this.setState({
                posts: arg
            })
            console.log(this.state.posts)
            console
        })
        
        
        /*console.log("SKJKEJTEJWLAT");
        axios.get("https://reddit.com/r/aww.json")
            .then(response => {
                this.setState({
                    posts: response.data.data.children
                })      
            })  
            .catch(error => {
                    console.log(error);
            });
        console.log(this.state.posts);
        */
    }
    render(){       
        return (
            <div>      
                <CardList pics={this.state.posts} />         
            </div>
        );
    }

}
export default Uploads;