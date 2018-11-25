import React from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { NavLink } from "react-router-dom";
// import { Redirect, BrowserRouter } from 'react-router-dom';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  state = {
    Username: "",
    Password: "",
  };
  
  componentDidMount(){
    ipcRenderer.on('transitionToHome', () => {
      this.props.history.push('/')
    });
  }
  handleGetUsername = (event) => {
    this.setState({
      Username : event.target.value,
    })
  };

  handleGetPassword = (event) => {
    this.setState({
      Password : event.target.value,
    })
  };
 
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // alert(this.state.Username + this.state.Password)
        ipcRenderer.send('login', this.state.Username, this.state.Password);
      }
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form"  style={{ width: '60%', marginLeft: '20%', marginTop: '20%', marginBottom: '20%'}}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" type="text" onChange={this.handleGetUsername}/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onChange={this.handleGetPassword}/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox style={{float:'left'}}>Remember me</Checkbox>
          )}
     
            <a className="login-form-forgot" href="" style={{float:'right'}}>Forgot password?</a>
          <div>
            <Button onClick={this.handleSubmit} type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}} >
                Log in
            </Button>          
          </div>
          Or 
          <NavLink to="/register"> register now!</NavLink>

        </FormItem>
      </Form>
    );
  }
}

const Login = Form.create()(NormalLoginForm);
export default Login;
