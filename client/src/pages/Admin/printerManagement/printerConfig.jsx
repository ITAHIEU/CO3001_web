import React, { useState } from "react";
import styles from "./printerConfig.module.css";
import Header from "../../../components/headerAdmin/header";
import { ReactComponent as ConfigIcon} from "../../../assets/list.svg";
import { ReactComponent as  ListIcon } from "../../../assets/configuration.svg";
import { ReactComponent as CalendarIcon } from "../../../assets/calendar.svg";
import { ReactComponent as EditIcon } from "../../../assets/edit.svg";
import { ReactComponent as RemoveIcon } from "../../../assets/delete.svg";
import { ReactComponent as AddIcon } from "../../../assets/add.svg";

const SystemConfiguration = () => {
  const initialData = {
    pagesPerSemester: 100,
    fileTypes: ["PDF"],
    paperSizes: ["A4"],
    allocationDate: "01/01/2024",
  };

  const [data, setData] = useState(initialData);
  const [editState, setEditState] = useState({});
  const [newItem, setNewItem] = useState("");
  const [originalData, setOriginalData] = useState({});

  const handleEdit = (field) => {
    setOriginalData((prevState) => ({ ...prevState, [field]: data[field] }));
    setEditState((prevState) => ({ ...prevState, [field]: !prevState[field] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAdd = (type) => {
    if (newItem.trim()) {
        if (data[type].length < 5) {
            setData((prevData) => ({
                ...prevData,
                [type]: [...prevData[type], newItem.trim()],
            }));
            setNewItem(""); 
        } else {
            alert("You can only add up to 5 items.");
        }
    }
};

  const handleRemove = (type, item) => {
    setData((prevData) => ({
      ...prevData,
      [type]: prevData[type].filter((i) => i !== item),
    }));
  };

  const handleSave = () => {
    const isConfirmed = window.confirm("Are you sure you want to save the changes?");
  
    if (isConfirmed) {
      setEditState({});
    } else {
        setData(originalData);
        setEditState({});
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.printerBox}>
          <h2 className={styles.printerManagementTitle}>Printer Management</h2>
          <hr className={styles.underline} />
          <ul className={styles.printerList}>
            <button className={`${styles.button} ${styles.buttonList}`}>
              <ListIcon className={styles.icon} />
              Printer List
            </button>
            <button className={`${styles.button} ${styles.buttonSys}`}>
              <ConfigIcon className={styles.icon} />
              System Configuration
            </button>
          </ul>
        </div>
        <main className={styles.mainContent}>
          <h2>System Configuration</h2>
          <hr className={styles.underline} />
          {/* Pages per Semester */}
          <div className={styles.configItem}>
            <span className={styles.label}>Default Pages per Semester</span>
            {editState.pagesPerSemester ? (
              <input
                type="number"
                name="pagesPerSemester"
                value={data.pagesPerSemester}
                className={styles.input}
                onChange={handleChange}
              />
            ) : (
              <span className={styles.value}>{data.pagesPerSemester}</span>
            )}
            <button
              className={styles.editBtn}
              onClick={() => handleEdit("pagesPerSemester")}
            >
              <EditIcon className={styles.actionIcon} />
              Edit
            </button>
          </div>

          {/* Allowed File Types */}
          <div className={styles.configItem}>
            <span className={styles.label}>Allowed File Types</span>
            <ul className={styles.list}>
              {data.fileTypes.map((fileType, index) => (
                <li key={index} className={styles.configItem__listItem}>
                  {fileType}
                  <RemoveIcon
                    className={styles.removeIcon}
                    onClick={() => handleRemove("fileTypes", fileType)}
                  />
                </li>
              ))}
            </ul>
            {editState.fileTypes && (
              <div>
                <input
                  type="text"
                  className={styles.input}
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="Add new file type"
                />
                <button
                  className={styles.editBtn}
                  onClick={() => handleAdd("fileTypes")}
                >
                  <AddIcon className={styles.actionIcon} />
                  Add
                </button>
              </div>
            )}
            <button
              className={styles.editBtn}
              onClick={() => handleEdit("fileTypes")}
            >
              <EditIcon className={styles.actionIcon} />
              {editState.fileTypes ? "Close" : "Edit"}
            </button>
          </div>

          {/* Paper Sizes */}
          <div className={styles.configItem}>
            <span className={styles.label}>Paper Sizes</span>
            <ul className={styles.list}>
              {data.paperSizes.map((size, index) => (
                <li key={index} className={styles.configItem__listItem}>
                  {size}
                  <RemoveIcon
                    className={styles.removeIcon}
                    onClick={() => handleRemove("paperSizes", size)}
                  />
                </li>
              ))}
            </ul>
            {editState.paperSizes && (
              <div>
                <input
                  type="text"
                  className={styles.input}
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="Add new paper size"
                />
                <button
                  className={styles.addBtn}
                  onClick={() => handleAdd("paperSizes")}
                >
                  <AddIcon className={styles.actionIcon} />
                  Add
                </button>
              </div>
            )}
            <button
              className={styles.editBtn}
              onClick={() => handleEdit("paperSizes")}
            >
              <EditIcon className={styles.actionIcon} />
              {editState.paperSizes ? "Close" : "Edit"}
            </button>
          </div>

          {/* Allocation Date */}
          <div className={styles.configItem}>
            <span className={styles.label}>Page Allocation Date</span>
            {editState.allocationDate ? (
              <input
                type="date"
                name="allocationDate"
                value={data.allocationDate}
                className={styles.input}
                onChange={handleChange}
              />
            ) : (
              <span className={styles.value}>{data.allocationDate}</span>
            )}
            <button
              className={styles.editBtn}
              onClick={() => handleEdit("allocationDate")}
            >
              <CalendarIcon className={styles.actionIcon} />
              Edit
            </button>
          </div>

          {/* Save Button */}
          <button className={styles.saveBtn} onClick={handleSave}>
            SAVE
          </button>
        </main>
      </div>
    </>
  );
};

export default SystemConfiguration;
