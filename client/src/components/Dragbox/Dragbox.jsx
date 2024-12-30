import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import styles from '../../pages/User/PrintPage/PrintPage.module.css';

const { Dragger } = Upload;

const DragBox = ({ onFileUpload }) => {
  const uploadProps = {
    name: 'file', // Tên trường khớp với định nghĩa của server
    multiple: false,
    action: 'http://localhost:5000/file/upload', // URL API tải file
    accept: '.pdf', // Chỉ cho phép file PDF
    onChange: (info) => {
      const { status, response } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} uploaded successfully.`);
        if (onFileUpload && response) {
          // Lấy filename từ response và gửi callback
          const fileURL = `http://localhost:5000/uploads/${info.file.response.file.filename}`;
          onFileUpload(fileURL, info.file.response.file.filename); // Truyền cả URL và filename
        }
      } else if (status === 'error') {
        message.error(`${info.file.name} upload failed.`);
      }
    },
    onDrop: (e) => {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...uploadProps} className={styles.dragbox}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click hoặc kéo file vào đây để tải lên</p>
      <p className="ant-upload-hint">
        Hỗ trợ tải lên file PDF. Kích thước tối đa: 10MB.
      </p>
    </Dragger>
  );
};

export default DragBox;
