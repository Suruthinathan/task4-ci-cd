import React, { useState } from 'react';
import { Input, Button, Card } from 'antd';
import axios from 'axios';

const { TextArea } = Input;

const CommandRunner: React.FC = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const runCommand = async () => {
    if (!command.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/command', { command });
      setOutput(res.data.output || 'Command executed');
    } catch (err) {
      console.error('Command error:', err);
      setOutput('Error running command');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Command Runner" style={{ marginTop: 24 }}>
      <TextArea
        rows={2}
        placeholder="Enter command (e.g. kubectl get pods)"
        value={command}
        onChange={e => setCommand(e.target.value)}
      />
      <Button
        type="primary"
        onClick={runCommand}
        loading={loading}
        style={{ marginTop: 12 }}
      >
        Run Command
      </Button>
      <pre style={{ background: '#f5f5f5', padding: 12, marginTop: 12 }}>
        {output}
      </pre>
    </Card>
  );
};

export default CommandRunner;
