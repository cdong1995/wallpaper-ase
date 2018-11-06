import React from "react";
// import { Upload, message, Button, Icon } from 'antd';
import ShowCard from '../component/Card'

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class Likes extends React.Component {
    state = {
        posts: []
    }

    render(){
        return (
            <div>
                        
                <ShowCard/>         
            </div>
        );
    }

}
export default Likes;