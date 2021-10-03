import React from 'react';
import { Form, Button } from 'antd';
import EditableTable from './editableTable';

const dataSource = [
  {
    key: 0,
    age: 32,
    status: true,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: 1,
    age: 42,
    status: true,
    address: 'London No. 1 Lake Park',
  },
  {
    key: 2,
    age: 32,
    status: true,
    address: 'Sidney No. 1 Lake Park',
  },
];

const App = () => {
  const [tableForm] = Form.useForm();

  const columns = [
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      editable: {
        type: 'string',
        props: { suffix: 'age' },
      },
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      editable: {
        type: 'checkbox',
      },
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  return (
    <Form
      initialValues={{ data: dataSource }}
      form={tableForm}
      onFinish={console.log}
    >
      <EditableTable columns={columns} dataSource={dataSource} />
      <Button onClick={tableForm.submit}>Submit</Button>
    </Form>
  );
};

export default App;
