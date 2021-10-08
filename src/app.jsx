import React, { useCallback } from "react";
import { Form, Button, Input } from "antd";
import EditableTable from "./editableTable";

const dataSource = [
  {
    key: 0,
    name: "Jhon duo",
    age: 32,
    status: true,
    address: 1,
    unit: 1,
  },
  {
    key: 1,
    name: "Tohmas Walter",
    age: 42,
    status: true,
    address: 1,
    unit: 2,
  },
  {
    key: 2,
    name: "Jan Russler",
    age: 32,
    status: true,
    address: null,
    unit: 3,
  },
];

const units = [
  { id: 1, name: "kg" },
  { id: 2, name: "mm" },
  { id: 3, name: "ltr" },
  { id: 4, name: "gr" },
];

const App = () => {
  const [tableForm] = Form.useForm();

  const getUnitsOptions = (rowKey) => {
    const { units: data } = tableForm.getFieldsValue(true);
    const filteredUnits = data?.filter((row) => row.key !== rowKey);
    const selectedUnits = filteredUnits.map((row) => row.unit);
    return units.filter((unit) => !selectedUnits.includes(unit.id));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: {
        type: "string",
      },
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      editable: (row) => ({
        type: "number",
        disabled: row.key === 0,
        props: { min: 0, max: 100 },
      }),
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      editable: {
        type: "checkbox",
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      editable: (row) => ({
        type: "select",
        disabled: row.key === 0,
        options: [
          { id: 1, name: "New York No. 1 Lake Park" },
          { id: 2, name: "London No. 1 Lake Park" },
          { id: 3, name: "Sidney No. 1 Lake Park" },
        ],
        props: {
          showSearch: true,
          optionFilterProp: "children",
        },
      }),
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      editable: {
        type: "select",
        options: units,
        onFilter: getUnitsOptions,
        props: {
          showSearch: true,
          optionFilterProp: "children",
        },
      },
    },
  ];

  const handleSave = () => {
    console.log(tableForm.getFieldsValue(true));
  };

  return (
    <Form initialValues={{ name: "Ahmad", units: dataSource }} form={tableForm}>
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>
      <EditableTable
        dataKey="units"
        columns={columns}
        defaultSelected={["name", 1]}
      />
      <Button htmlType="button" onClick={handleSave}>
        Submit
      </Button>
    </Form>
  );
};

export default App;
