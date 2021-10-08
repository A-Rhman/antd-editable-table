import React from "react";
import EditableTableBody from "./editableTableBody";
import { Form } from "antd";

const EditableTable = ({ dataKey = "data", columns, defaultSelected }) => {
  return (
    <Form.Item
      shouldUpdate={
        true
        /*(curr, prev) =>
        curr[dataKey]?.length !== prev[dataKey]?.length
      */
      }
      noStyle
    >
      {({ getFieldsValue, setFieldsValue }) => {
        const data = getFieldsValue(true)[dataKey];
        const handleAddRow = () => {
          const newKey = data[data.length - 1]?.key + 1;
          setFieldsValue({ [dataKey]: [...data, { key: newKey }] });
        };
        return (
          <EditableTableBody
            dataKey={dataKey}
            columns={columns}
            dataSource={data || [{ key: 0 }]}
            defaultSelected={defaultSelected}
            onAddRow={handleAddRow}
          />
        );
      }}
    </Form.Item>
  );
};
export default EditableTable;
