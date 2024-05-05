import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography } from 'antd';
import axios from 'axios';
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';
const { Text, Link, Title } = Typography;

export default function Signup() {

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
        const result = await axios.post(`${apiUrl}/register`, values);
        if (result) {
            toast.success('Account Created')
            navigate('/login');
        }
    } catch (error) {
        if (error.message) {
            toast.error(error.message);
        }
        toast.error(error.response.data.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    toast.error('Failed:', errorInfo);
  };

  return (

    <div className="flex justify-center items-center">
      <div className="max-w-md w-full h-max">
        <Title className='text-center mb-5' level={2}>Signup</Title>
        <Form className='mt-5'
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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Please input your first name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: 'Please input your last name!',
              },
            ]}
          >
            <Input />
          </Form.Item>
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
            <Text>Already have an account? </Text>
            <Link onClick={() => {navigate('/login')}}>Login</Link>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Signup
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}