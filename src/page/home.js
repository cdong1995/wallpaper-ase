import React from "react"
import CardList from '../component/CardList'
import axios from 'axios'

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class Home extends React.Component {
    constructor(){
        super()
        this.state={
            posts:[]
        }
    }  

    componentDidMount(){
        
        axios.get("http://localhost:8000/wallpapers/index")
            .then(response => {
                this.setState({
                    posts: response.data
                })    
                console.log(this.state.posts)
            })  
            .catch(error => {
                    console.log(error);
            });
        console.log(this.state.posts);

    }
    render(){       
        return (
            <div>      
                <CardList pics={this.state.posts} />         
            </div>
        );
    }

}
export default Home;