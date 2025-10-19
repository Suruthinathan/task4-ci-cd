import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import PodList from './components/PodList';
import PodForm from './components/PodForm';
import CommandRunner from './components/CommandRunner';
import axios from 'axios';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const [pods, setPods] = useState<any[]>([]);

  const fetchPods = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/pods');
      setPods(res.data);
    } catch (error) {
      console.error('Fetch pods error:', error);
    }
  };

  useEffect(() => {
    fetchPods();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: 'white', fontSize: '1.5rem' }}>
        Kubernetes Pod Management
      </Header>
      <Content style={{ padding: '24px 48px' }}>
        <PodForm onCreated={fetchPods} />
        <PodList pods={pods} onDeleted={fetchPods} />
        <CommandRunner />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        © {new Date().getFullYear()} Task 3 Web UI
      </Footer>
    </Layout>
  );
};

export default App;
