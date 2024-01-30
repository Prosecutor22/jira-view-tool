import React from "react";
import { Table } from "antd";

const ConfluenceTable = ({ data }) => {
 const columns = [
   {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Link to Docupedia",
      dataIndex: "link",
      key: "link",
    },
 ];

 return (
   <div>
      <h2>Source: Docupedia</h2>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        rowClassName="lightblue"
      />
    </div>
 );
};

export default ConfluenceTable;