import React, { useState, useEffect } from 'react';
import DragBox from "../../../components/Dragbox/Dragbox";
import styles from "./PrintPage.module.css";
import { Select, InputNumber } from 'antd';
import print from '../../../assets/printer.png';
import { useNavigate } from 'react-router-dom'

const InputBox = ({ disabled, style, holder, onChange }) => (
  <InputNumber min={1} max={100} onChange={onChange} disabled={disabled} style={style} placeholder={holder} />
);

const SelectBox = ({ options = [], holder, onChange }) => (
  <Select
    showSearch
    placeholder={holder}
    onChange={onChange}
    filterOption={(input, option) =>
      (option?.label || '').toLowerCase().includes(input.toLowerCase())
    }
  >
    {options.map((option, index) => (
      <Select.Option key={index} value={option.value}>
        {option.label}
      </Select.Option>
    ))}
  </Select>
);

const PrintPage = ({ clickOutside }) => {
  const [fileName, setFileName] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [printers, setPrinters] = useState([]);
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [copies, setCopies] = useState(1);
  const [printSides, setPrintSides] = useState("one-sided");
  const [pageSize, setPageSize] = useState("A4");
  const [userId, setUserId] = useState(null);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser.id);
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/printers")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setPrinters(data.map(printer => ({ value: printer.printer_id, label: `${printer.brand} ${printer.model}` })));
        }
      })
      .catch((error) => console.error("Error fetching printers", error));
  }, []);

  const handleFileUpload = (fileURL, fileName) => {
    setPreviewUrl(fileURL);
    setFileName(fileName);
  };

  const handlePrintJob = async () => {
    if (!selectedPrinter || !fileName || !userId) {
      setErrorMessage("Please ensure all fields are filled");
      return;
    }

    const printJobData = {
      user_id: userId,
      printer_id: selectedPrinter,
      file_name: fileName,
      page_size: pageSize,
      sides: printSides,
      copies,
    };

    try {
      const response = await fetch("http://localhost:5000/users/print", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(printJobData),
      });

      if (response.ok) {

        setShowSuccessCard(true);
        setErrorMessage(null);
        navigate('/hist-page')
      } else {
        const result = await response.json();
        setErrorMessage(result.message || "Print job failed");
      }
    } catch (error) {
      setErrorMessage("Error creating print job");
    }
  };

  const handleReset = () => {
    setFileName(null);
    setPreviewUrl(null);
    setSelectedPrinter(null);
    setCopies(1);
    setPrintSides("one-sided");
    setPageSize("A4");
    setErrorMessage(null);
    setShowSuccessCard(false);
  };

  return (
    <div onClick={clickOutside} className={styles.container}>
      <div className={styles.back}>
        <div className={styles.print_box}>
          <DragBox onFileUpload={handleFileUpload} />
          {previewUrl && (
            <div className={styles.preview}>
              <iframe src={previewUrl} title="PDF Preview" width="100%" height="400px"></iframe>
            </div>
          )}

          <div className={styles.option}>
            <div className={styles.content}>
              <div className={styles.left}>
                <p>Printer: <SelectBox options={printers} holder={"Select Printer"} onChange={setSelectedPrinter} /></p>
                <p>Page Size: <SelectBox options={[{ value: "A4", label: "A4" }, { value: "A3", label: "A3" }]} holder={"Select Page Size"} onChange={setPageSize} /></p>
                <p>Print Sides: <SelectBox options={[{ value: "one-sided", label: "One-Sided" }, { value: "double-sided", label: "Double-Sided" }]} holder={"Select Print Sides"} onChange={setPrintSides} /></p>
              </div>
              <div className={styles.right}>
                <p>Copies: <InputBox onChange={setCopies} style={{ width: "100%" }} holder={"Number of Copies"} /></p>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                <button onClick={handlePrintJob}><img src={print} alt='' /> Print</button>
              </div>
            </div>
          </div>

          {showSuccessCard && (
            <div className={`${styles.overlay} ${styles.show}`} onClick={handleReset}>
              <div className={styles.success_card}>
                <div className={styles.popCard}>
                  <span className="material-symbols-outlined">check_circle</span>
                  <p>Print Job Created Successfully</p>
                  <button onClick={handleReset}>Close</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrintPage;
