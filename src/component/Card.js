import { Card, Icon } from 'antd';
import React from 'react';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
const download = require('../lib/download')

/*
<Meta
    title="random"
    description="test"
/>
*/
const { Meta } = Card;

export default class ShowCard extends React.Component{ 
    constructor(props){
        super(props);
        this.state={
            color:"#000000"
        }
        //this.color = "#eb2f96";
    }
    
    onChangeColor(color){
        if(color === "#000000") {
            this.setState({
                color:"#eb2f96"
            })           
        } else {
            this.setState({
                color:"#000000"
            })
        }

        console.log("rrrr");
    }

    // download = (url) => {
    //     const tempFileName = `temp${Date.now()}.jpg`;
    //     const tempFilePath = path.join(tempDir, tempFileName);
    //     const writeFileTo = fs.createWriteStream(tempFilePath);
    //     const getImageFile = request.get(url);
    
    //     getImageFile.pipe(writeFileTo);
        
    // }
    render(){
        const { item } = this.props;
        //console.log(item)
        //console.log(item._doc.url)
        
        return (
            <div>
            <Card
                style={{ width: 300 }}
                cover={<img alt="example" src={item._doc.url} />}
                actions={
                [<Icon type="heart" theme="twoTone" twoToneColor={this.state.color} onClick={()=>{this.onChangeColor(this.state.color)}}/>, 
                <Icon type="folder-add" />, 
                <Icon type="download" onClick={() => {ipcRenderer.send("download-image", item._doc.url)}}/>]
            }
            >
            </Card>

            </div>
        );
    }
}
