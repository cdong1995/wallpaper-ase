import { Card, Icon, Avatar } from 'antd';
import React from 'react';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

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
    
    onChangeColor(){
        this.setState({
            color:"#eb2f96"
        })
        console.log("rrrr");
    }
    render(){
        const { item } = this.props;
        //console.log(item)
        //console.log(item._doc.url)
        // theme="twoTone" twoToneColor={this.state.color} onClick={()=>{this.onChangeColor()}}
        return (
            <div>
            <Card
                style={{ width: 300 }}
                cover={<img alt="example" src={item._doc.url} />}
                actions={[<Icon type="heart" />, <Icon type="folder-add" />, <Icon type="download" />]}
            >
            </Card>

            </div>
        );
    }
}
