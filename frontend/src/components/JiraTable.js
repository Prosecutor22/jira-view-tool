import React from "react";
import { Table } from "antd";

const JiraTable = ({ data }) => {
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
    },
 ];

 return (
  <div>
      <h2>Source: Jira</h2>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        rowClassName="lightblue"
      />
    </div>
 );
};

export default JiraTable;