import React from "react";
import CardList from '../component/CardList'

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class Likes extends React.Component {
    constructor(){
        super()
        this.state={
            posts:[]
        }
    }  

    componentDidMount(){
        ipcRenderer.send('request-image','collections');
        ipcRenderer.on('show-collections-image',(event, arg) => {
            console.log(arg)
            this.setState({
                posts: arg
            })
            console.log(this.state.posts)
        })

       ipcRenderer.on('show-search-result',(event, arg) => {
        this.setState({
            posts: arg
        });
        
    });
    }
    render(){       
        return (
            <div>      
                <CardList pics={this.state.posts} />         
            </div>
        );
    }

}
export default Likes;