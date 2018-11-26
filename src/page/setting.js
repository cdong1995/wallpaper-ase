import { Select,InputNumber,Button } from 'antd';
import React from "react";

const Option = Select.Option;
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class Setting extends React.Component {
    state = {
        fre:"3",
        msr:"minute"
    };

    handleChange1 = (value) => {
        console.log(`selected ${value}`)
        this.setState({fre:value})
    };

    handleChange2 = (value) => {
        console.log(`selected ${value}`)
        this.setState({msr:value})
            // this.setState({
            //   Username : event.target.value,
            // })
    };

    setPeriod = () => {
        ipcRenderer.send('change_period', this.state.fre, this.state.msr);
    }


    render(){
        return(
            <div style={{ marginTop: 150 }}>
                <h3> Set the frequency of wallpaper changing automatically:</h3>
                <br/>
                Every
                <InputNumber min={1} max={100} defaultValue={3} onChange={this.handleChange1} />
                <Select defaultValue="minute" style={{ width: 120 }} onChange={this.handleChange2}>
                    <Option value="second">second</Option>
                    <Option value="minute">minute</Option>
                    <Option value="hour">hour</Option>
                    <Option value="day">day</Option>
                    <Option value="week">week</Option>
                </Select>
                <Button type="primary"  onClick={this.setPeriod}>Set!</Button>
            </div>
        )}
}

export default Setting;