import React from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form"  style={{ width: '60%', marginLeft: '20%' }}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
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
            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
                Log in
            </Button>          
          </div>
          Or <a href="">register now!</a>
          
        </FormItem>
      </Form>
    );
  }
}

const Login = Form.create()(NormalLoginForm);
export default Login;
