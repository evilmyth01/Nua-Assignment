import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";

import styles from "./Dashboard.module.css";

import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import "antd/dist/reset.css";

import { CSVLink } from "react-csv";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const names = [
  "William Shakespeare",
  "Agatha Christie",
  "Barbara Cartland",
  "Danielle Steel",
  "Khushwant Singh",
  "Vikram Seth",
  "R.K. Narayan",
  "Arundhati Roy",
];

const originData = [];
// const newData = [];

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function Dashboard() {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const [updatedData, setUpdatedData] = useState([{}]);

  const fetchAuthorData = async (name) => {
    const formattedName = name.replace(/ /g, "%20");
    const response = await fetch(
      `https://openlibrary.org/search/authors.json?q=${formattedName}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching data for ${name}`);
    }
    const data = await response.json();
    return { name, data };
  };

  const processObject = (obj) => {
    return {
      ...obj,
    };
  };

  const fetchAllAuthors = async () => {
    try {
      const results = await Promise.all(
        names.map((name) => fetchAuthorData(name))
      );

      const updatedData = results.map((result) => {
        const tempData = [];
        for (let i = 0; i < 2; i++) {
          const doc = result.data.docs[i];
          tempData.push({
            key: doc.key ? doc.key : "N/A",
            name: doc.name ? doc.name : "N/A",
            birth_date: doc.birth_date ? doc.birth_date : "N/A",
            top_work: doc.top_work ? doc.top_work : "N/A",
            rating: Math.ceil(Math.random() * 10),
            Subject: doc.top_subjects ? doc.top_subjects[1] : "N/A",
          });
        }
        return tempData;
      });

      // console.log('Processed author data:', updatedData);

      const destructuredData = updatedData.flat().map(processObject);

      setUpdatedData(destructuredData);
    } catch (error) {
      console.error("Error fetching author data:", error);
    }
  };

  //part to fetch the books data by using author's id

  // const fetchBooksData = async () => {
  //     const response = await axios.get(`https://openlibrary.org/works/OL9388A`,{
  //         headers: {
  //             'accept': 'application/json'
  //         }

  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error fetching books data for ${key}`);
  //     }
  //     const data = await response.json();
  //     return { key, data };
  // }

  //   const fetchBooks = async()=>{
  //     const updatedRes = await Promise.all(updatedData.map(data => fetchBooksData(data.key)));
  //     console.log('Updated Res:', updatedRes);
  //   }

  useEffect(() => {
    fetchAllAuthors();
  }, []);

  //function to fetch the books data

  // useEffect(()=>{
  //   fetchBooks();
  // },[updatedData])

  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      // name: '',
      // age: '',
      // address: '',
      // ...record,

      key: record.key,
      name: record.name,
      birth_date: record.birth_date,
      top_work: record.top_work,
      rating: record.rating,
      Subject: record.top_subjects ? record.top_subjects[0] : "N/A",
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...updatedData];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setUpdatedData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setUpdatedData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: "Rating_Avg",
      dataIndex: "rating",
      width: "10%",
      editable: true,
    },
    {
      title: "Author",
      dataIndex: "name",
      width: "15%",
      editable: true,
    },
    {
      title: "Title",
      dataIndex: "name",
      width: "40%",
      editable: true,
    },
    {
      title: "First_Published",
      dataIndex: "birth_date",
      width: "40%",
      editable: true,
    },
    {
      title: "Subject",
      dataIndex: "Subject",
      width: "40%",
      editable: true,
    },
    {
      title: "Birth_Date",
      dataIndex: "birth_date",
      width: "40%",
      editable: true,
    },
    {
      title: "Top_Work",
      dataIndex: "top_work",
      width: "40%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "rating" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Sidebar>
      <div className={styles.outerDiv}>
        <div className={styles.authorHeading}>
          <h1>Author's Data</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim,
            aperiam.
          </p>
        </div>

        <div className={styles.outerCardDiv}>
          <div className={styles.card1}>
            <div className="iconsDiv">
              <PeopleAltIcon style={{ fontSize: 60 }} />
            </div>
            <div className="textDiv">
              <h3>Author's Data</h3>
              <p>Lorem ipsum</p>
            </div>
          </div>
          <div className={styles.card2}>
            <div className="iconsDiv">
              <PeopleAltIcon style={{ fontSize: 60 }} />
            </div>
            <div className="textDiv">
              <h3>Author's Data</h3>
              <p>Lorem ipsum</p>
            </div>
          </div>
          <div className={styles.card3}>
            <div className="iconsDiv">
              <PeopleAltIcon style={{ fontSize: 60 }} />
            </div>
            <div className="textDiv">
              <h3>Author's Data</h3>
              <p>Lorem ipsum</p>
            </div>
          </div>
          <div className={styles.card4}>
            <div className="iconsDiv">
              <PeopleAltIcon style={{ fontSize: 60 }} />
            </div>
            <div className="textDiv">
              <h3>Author's Data</h3>
              <p>Lorem ipsum</p>
            </div>
          </div>
        </div>

        <div
          style={{
            border: "1px solid black",
            display: "inline block",
            width: 120,
            backgroundColor: "#FAFAFA",
            marginLeft: "auto",
            borderRadius: 2,
            textAlign: "center",
          }}
          className="csvButton"
        >
          <CSVLink
            style={{ textDecoration: "none", color: "black" }}
            data={updatedData}
            filename={"author-data.csv"}
          >
            Download csv
          </CSVLink>
        </div>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={updatedData}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      </div>
    </Sidebar>
  );
}

export default Dashboard;
