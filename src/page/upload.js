import React from "react";
import { Upload, message, Button, Icon, Modal } from 'antd';
import CardList from '../component/CardList'

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class Uploads extends React.Component {
    constructor(){
        super()
        this.state={
            posts:[],
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: '-1',
                name: '',
                status: 'done',
                url: '',
            }],
        }
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })


    uploadImage = (file) => {
        ipcRenderer.send('upload-image', file.path);
        console.log(file.path)
        console.log(file)
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
    }
    render(){ 
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>
        );      
        return (
            <div> 
                <Upload
                    action={this.uploadImage}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                {fileList.length < 0 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt=" " style={{ width: '100%' }} src={previewImage} />
                </Modal>   
                <CardList pics={this.state.posts} />         
            </div>
        );
    }

}
export default Uploads;