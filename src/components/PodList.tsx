import { Table, Button, Input, message } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';

interface PodListProps {
  pods: any[];
  onDeleted: () => void; // callback to refresh after delete
}

const PodList: React.FC<PodListProps> = ({ pods, onDeleted }) => {
  const [search, setSearch] = useState('');

  const deletePod = async (name: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/pods/${name}`);
      message.success('Pod deleted');
      onDeleted(); // refresh list in parent
    } catch (error) {
      console.error('Delete error:', error);
      message.error('Delete failed');
    }
  };

  const filteredPods = pods.filter(pod =>
    pod.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Input
        placeholder="Search pods"
        style={{ marginBottom: 10, width: 300 }}
        onChange={e => setSearch(e.target.value)}
      />
      <Table dataSource={filteredPods} rowKey="name" pagination={false}>
        <Table.Column title="Name" dataIndex="name" />
        <Table.Column title="Status" dataIndex="status" />
        <Table.Column
          title="Action"
          render={(text, record: any) => (
            <Button danger onClick={() => deletePod(record.name)}>
              Delete
            </Button>
          )}
        />
      </Table>
    </>
  );
};

export default PodList;
