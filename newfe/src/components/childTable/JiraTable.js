import React from "react";
import { Table } from "antd";

const JiraTable = ({ data }) => {
  const tableStyle = {
    border: '1px solid #ddd', // Add your desired border style
  };
 const columns = [
    {
      title: "Key",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
    },
    {
      title: "Reporter",
      dataIndex: "reporter",
      key: "reporter",
    },
    {
      title: "Link to Jira Issue",
      dataIndex: "link",
      key: "link",
      render: (text, record) => <a href={record.link}>{text}</a>,
     },
 ];

 return (
  <div>
      <h2>Source: Jira</h2>
      <Table
        columns={columns}
        dataSource={data}
        style={tableStyle}
        pagination={{ pageSize: 10 }}
        rowClassName="lightblue"
      />
    </div>
 );
};

export default JiraTable;