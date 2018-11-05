import React from "react";
import { Upload, message, Button, Icon } from 'antd';
import ShowCard from '../component/Card'
import UploadPic from '../uploadPic'
import axios from 'axios';

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