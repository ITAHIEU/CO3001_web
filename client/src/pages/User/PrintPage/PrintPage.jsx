import React, { useState,useEffect } from 'react';
import DragBox from "../../../components/Dragbox/Dragbox";
import styles from "./PrintPage.module.css";
import UserHeader from "../../../components/UserHeader/UserHeader";
import Footer from "../../../components/FooterBar/Footer";
import { Link } from "react-router-dom";
import { Select, InputNumber } from 'antd';
import print from '../../../assets/printer.png'
const onChange = (value) => {
  console.log('changed', value);
};

const InputBox = ({ disabled ,style, holder }) => (
  <InputNumber min={1} max={10} onChange={onChange} disabled={disabled} style={style} placeholder={holder}/>
);

const SelectBox = ({ options = [], holder, onChange }) => {
  return (
    <Select
      showSearch
      placeholder={holder}
      onChange={onChange}
      filterOption={(input, option) =>
        (option?.label || '').toLowerCase().includes(input.toLowerCase())
      }
    >
      {options.map((option, index) => (
        <Select.Option key={index} value={option}>
          {option}
        </Select.Option>
      ))}
    </Select>
  );
};

const PrintPage = ({clickOutside}) => {
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [printAll, setPrintAll] = useState(true);
  const [username, setUsername] = useState(null);

  const handleFileUpload = (filePath) => {
    setErrorMessage(null); 
  };

  const onLoadError = (error) => {
    console.error('Error loading PDF:', error);
    setErrorMessage('There was an issue loading the PDF. Please try again.');
  };

  const handlePrintOptionChange = (value) => {
    setPrintAll(value === "In tất cả");
  };
  useEffect(() => {
    fetch("/user.json")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setUsername(data[0]);
        }
      })
      .catch((error) => console.error("Error fetching username", error));
  }, []);
  return (
    <div onClick={clickOutside} className={styles.container}>
      <div className={styles.back}>
        <div className={styles.print_box}>
          <DragBox onFileUpload={handleFileUpload} />
          <div className={styles.option}>
            <div className={styles.content}>
              <div className={styles.left}>
                <p>Printer: <SelectBox options={["B4", "H6"]} holder={"Vị trí"} /></p>
                <p>Số trang in: <SelectBox
                    options={["In tất cả", "Chọn số trang"]}
                    holder={"Chọn số trang"}
                    onChange={handlePrintOptionChange}
                  /> <br/>
                  <InputBox disabled={printAll} style={{width:"100%"}} holder={"e.g 1-5,8,11-13"} />
                </p>
                <p>Số trang mỗi mặt: <SelectBox options={["1","2"]}/></p>
                {username && <p>Số trang còn lại: {username.pages}</p>}
              </div>
              <div className={styles.right}>
                <p>Số bản in: <InputBox /></p>
                <p>Tỉ lệ: <SelectBox options={["100%","125%","150%","200%"]} holder={"Tỉ lệ"}/> </p>
                <p>Hướng giấy: <SelectBox options={["Dọc","Ngang"]} holder={"Hướng giấy"}/></p>
                <p>Chế độ màu: <SelectBox options={["Trắng đen"]} holder={"Chọn chế độ"}/></p>
              </div>
            </div>
            <button onClick={() => setShowSuccessCard(true)} ><img src={print} alt=''></img></button>
          </div>
          <div className={`${styles.overlay} ${showSuccessCard ? styles.show : ''}`} onClick={() => setShowSuccessCard(false)}></div>
          <div className={`${styles.success_card} ${showSuccessCard ? styles.show : ''}`}>
            <div className={styles.popCard}>
              <span class="material-symbols-outlined">check_circle</span>
              <p>Process Successfully</p>
              <button onClick={() => {setShowSuccessCard(false); window.location.reload();}}>Close</button>  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintPage;
