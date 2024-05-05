import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography } from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios'; // Import axios
import Cookies from 'js-cookie'; // Import Cookies
import { apiUrl } from '../../utils/Constants';
import { useAuth } from './AuthContext';

const { Text, Link, Title } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const {login}  = useAuth();
  const [btnDisabled, setBtnDisabled] = useState(false); // State for button disable

  const handleSubmit = async (values) => {
    try {
      const isLoggedin = await axios.post(`${apiUrl}/login`, values);
      if (isLoggedin) {
        Cookies.set('firstName', isLoggedin.data.firstName);
        login(isLoggedin.data.userRole, isLoggedin.data.token);
        
        switch (isLoggedin.data.userRole) {
          case 'user': 
            toast.success('Login Success');
            navigate('/user');
            break;
          default:
            break;
        }
        window.location.reload();
      }
    } catch (error) {
      if (error.message) {
        toast.error(error.message);
      }
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-md w-full h-max">
        <Title className='text-center mb-5' level={2}>Login</Title>
        <Form
          className='mt-5'
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit} // Connect handleSubmit to form submission
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Text>Don't have an account? </Text>
            <Link onClick={() => navigate('/register')}>Signup</Link>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" disabled={btnDisabled}> {/* Disable button based on state */}
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
