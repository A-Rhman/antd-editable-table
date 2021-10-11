import React, { useCallback, useState } from "react";
import { Form, Button, Input } from "antd";
import EditableTable from "./editableTable";
import DragTest from "./dragMove";
import ResizableTitle from "./resizeableTableHeader";

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
    status: false,
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
  const initialCheckedKeys = dataSource
    .filter((e) => e.status)
    .map((e) => e.key);

  const [checkedKeys, setCheckedKeys] = useState(initialCheckedKeys || []);

  const getUnitsOptions = (rowKey) => {
    const { units: data } = tableForm.getFieldsValue(true);
    const filteredUnits = data?.filter((row) => row.key !== rowKey);
    const selectedUnits = filteredUnits.map((row) => row.unit);
    return units.filter((unit) => !selectedUnits.includes(unit.id));
  };

  const getCheckedStatus = (row) => {
    return checkedKeys.length > 2 && !row.status;
  };

  const handleCheckchange =
    (row) =>
    ({ target }) => {
      setCheckedKeys((keys) => {
        const nextState = target.checked
          ? [...keys, row.key]
          : keys.filter((k) => k !== row.key);
        return nextState;
      });
    };

  const columns = [
    {
      title: "Nr.",
      width: 60,
      align: "center",
      key: "nr",
      render: (value, row, index) => <>{index + 1}</>,
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 200,
      key: "name",
      editable: {
        type: "string",
      },
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 100,
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
      width: 100,
      editable: (row) => ({
        type: "checkbox",
        disabled: getCheckedStatus(row),
        props: {
          onChange: handleCheckchange(row),
        },
      }),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 100,
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
      <DragTest />
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
