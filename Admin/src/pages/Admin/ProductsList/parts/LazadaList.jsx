import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React, { memo, useEffect, useState } from "react";
import { getDataTableList } from "../../../../helper/configTableData";

const LazadaList = ({ products = [], isLoading = false }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getDataTableList(products));
  }, [products]);

  const expandedColumn = [
    { title: "Name", dataIndex: "title", key: "title" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => <img src={image} width="100px" />,
    },
    {
      title: "Type",
      key: "saleProp",
      dataIndex: "saleProp",
    },
    { title: "Stock", dataIndex: "quantity", key: "quantity" },
  ];

  const renderVariants = (record) => {
    const data = record?.skus?.map((sku, index) => ({
      key: index + 1,
      ...sku,
      image: sku.Images?.length == 0 ? record?.images[index] : "",
      saleProp: Object.keys(sku?.saleProp)
        .sort()
        .map((key) => `${key}: ${sku.saleProp[key]}`)
        .join(""),
    }));
    console.log(
      data
    );

    return (
      <Table
        dataSource={data}
        columns={expandedColumn}
        pagination={false}
        size="small"
      ></Table>
    );
  };

  const columns = [
    { title: "ID", dataIndex: "key", key: "key" },
    { title: "Title", dataIndex: "name", key: "name" },
    { title: "Vendor", dataIndex: "brand", key: "brand" },
  ];
  return (
    <div>
      <Button className="my-4" type="primary" icon={<PlusCircleOutlined />}>
        Thêm sản phẩm
      </Button>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 600, x: 800 }}
        loading={isLoading}
        expandable={{
          expandedRowRender: (record) => renderVariants(record),
          rowExpandable: (record) => record?.skus && record?.skus.length > 0, // Only allow expand if there are variants
          defaultExpandedRowKeys: ["0"],
        }}
      ></Table>
    </div>
  );
};

export default memo(LazadaList);
