import React, { useState } from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import axios from 'axios';

interface PodFormProps {
  onCreated: () => void; // callback to refresh pod list
}

const PodForm: React.FC<PodFormProps> = ({ onCreated }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/pods', values);
      console.log('POST response:', res.data);
      message.success('Pod created successfully!');
      onCreated(); // refresh pod list in parent
    } catch (error) {
      console.error('Error creating pod:', error);
      message.error('Failed to create pod');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Create New Pod" style={{ marginBottom: 24 }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Pod Name"
          name="name"
          rules={[{ required: true, message: 'Please input pod name!' }]}
        >
          <Input placeholder="Enter pod name" />
        </Form.Item>

        <Form.Item
          label="Image"
          name="image"
          rules={[{ required: true, message: 'Please input image name!' }]}
        >
          <Input placeholder="e.g. nginx:latest" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>
          Create Pod
        </Button>
      </Form>
    </Card>
  );
};

export default PodForm;

export {}; // tells TypeScript this is a module
