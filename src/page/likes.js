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
        ipcRenderer.send('request-image','likes');
        ipcRenderer.on('show-likes-image',(event, arg) => {
            console.log(arg)
            this.setState({
                posts: arg
            })
            console.log(this.state.posts)
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