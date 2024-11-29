import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import styles from '../../pages/User/PrintPage/PrintPage.module.css';

const { Dragger } = Upload;

const DragBox = ({ onFileUpload }) => {
  const uploadProps = {
    name: 'file',  // Ensure the 'name' is correct (this should match the multer field)
    multiple: false,  
    action: 'http://localhost:5000/upload',  // Make sure this URL is correct for your server
    onChange: (info) => {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} uploaded successfully.`);
        if (onFileUpload) {
          const fileURL = `http://localhost:5000/${info.file.response.file.path}`;
          onFileUpload(fileURL);  
        }
      } else if (status === 'error') {
        message.error(`${info.file.name} upload failed.`);
      }
    },
    onDrop: (e) => {
      console.log('Dropped files', e.dataTransfer.files);
    },
    headers: {
      // If required, add authorization or custom headers here
      'Authorization': 'Bearer <token>',
    },
  };

  return (
    <Dragger {...uploadProps} className={styles.dragbox}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single file upload. Images and documents are allowed.
      </p>
    </Dragger>
  );
};

export default DragBox;
