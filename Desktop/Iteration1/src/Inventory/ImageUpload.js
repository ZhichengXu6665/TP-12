import { useState, useCallback } from "react";
import axios from 'axios';
import './ImageUpload.css';

const ImageUpload = ({ onUploadComplete }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [apiResponse, setApiResponse] = useState(null);

  const isValidFileType = (fileName) => {
    const validExtensions = ['jpg', 'jpeg', 'png'];
    const fileExtension = fileName.split('.').pop().toLowerCase();
    return validExtensions.includes(fileExtension);
  };

  const handleLocalStorageSelect = useCallback(async () => {
    if ('showOpenFilePicker' in window) {
      try {
        const [fileHandle] = await window.showOpenFilePicker({
          types: [
            {
              description: 'Images',
              accept: {
                'image/*': ['.jpg', '.jpeg', '.png']
              }
            },
          ],
          multiple: false
        });
        const file = await fileHandle.getFile();
        if (isValidFileType(file.name)) {
          setSelectedFile(file);
          setFeedback(`Selected file: ${file.name}`);
          setUploadStatus('idle');
        } else {
          setFeedback('Please select a valid image file (JPG, JPEG or PNG)');
          setUploadStatus('error');
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          setFeedback('Error occurred while selecting file');
          setUploadStatus('error');
        }
      }
    } else {
      setFeedback('Your browser does not support file selection from local storage. Please use the file upload input.');
      setUploadStatus('error');
    }
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setFeedback('Please select a file');
      setUploadStatus('error');
      return;
    }

    const formData = new FormData();
    formData.append('uploaded_file', selectedFile);

    setUploadStatus('uploading');
    setFeedback('Uploading and Processing Image...');

    try {
      const response = await axios.post('https://recieptapi.onrender.com/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setApiResponse(response.data);
      setFeedback('Image processed successfully');
      setUploadStatus('success');
      
      if (response.data && Array.isArray(response.data.item_list)) {
        // 格式化数据并存储到 localStorage
        storeItemsInLocalStorage(response.data.item_list);
        setFeedback('Image Process Succeed, and new items are added to inventory');
        onUploadComplete();
      }
    } catch (error) {
      if (error.response) {
        setFeedback(error.response.data.detail || 'Upload failed');
      } else if (error.request) {
        setFeedback('Unable to connect to the server. Please check your network connection.');
      } else {
        setFeedback('An error occurred during upload: ' + error.message);
      }
      setUploadStatus('error');
    }
  }, [selectedFile, onUploadComplete]);

  const storeItemsInLocalStorage = (itemList) => {
    const formattedItems = itemList.map(item => ({
      name: item.description,
      quantity: item.qty || '',
      category: '',
      expiryDate: '',
      daysUntilExpiry: '',
      used: false
    }));

    // 获取现有的库存
    const existingInventory = JSON.parse(localStorage.getItem('inventory') || '[]');

    // 将新项目添加到现有库存中
    const updatedInventory = [...existingInventory, ...formattedItems];

    // 将更新后的库存保存到本地存储
    localStorage.setItem('inventory', JSON.stringify(updatedInventory));
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title">Receipt Image Upload</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <button type="button" onClick={handleLocalStorageSelect} className="local-storage-button" aria-label="Select Image">
          Select Image (JPG, JPEG or PNG)
        </button>
        <button type="submit" className="submit-button" disabled={uploadStatus === 'uploading'} aria-label="Upload and Process Image">
          {uploadStatus === 'uploading' ? 'Processing...' : 'Upload and Process'}
        </button>
      </form>
      {feedback && (
        <div className={`feedback-container ${uploadStatus}`}>
          <p className="feedback-text">{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
