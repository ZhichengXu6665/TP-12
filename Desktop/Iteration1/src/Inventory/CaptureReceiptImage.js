// src/components/CaptureReceiptImage.js
import React, { useState } from 'react';
import axios from 'axios';  // 引入 axios 用于发送 HTTP 请求
import './CaptureReceiptImage.css';

function CaptureReceiptImage() {
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState('');
    const [processingResult, setProcessingResult] = useState(null);  // 保存处理结果的状态

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setImageURL(URL.createObjectURL(file));

            // 设置图像后，将其发送到 FastAPI 服务器
            sendImageToServer(file);
        }
    };

    const sendImageToServer = async (file) => {
        const formData = new FormData();
        formData.append('file', file);  // 将文件附加到 FormData 对象

        try {
            const response = await axios.post('https://ecopantry.onrender.com/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // 处理从 FastAPI 返回的响应
            setProcessingResult(response.data);
            console.log('Processing Result:', response.data);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className="capture-receipt">
            <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                id="file-input" 
                style={{ display: 'none' }}
            />
            <label htmlFor="file-input" className="upload-button">
                upload Picture
            </label>
            {image && (
                <div className="image-preview">
                    <img src={imageURL} alt="Receipt Preview" />
                </div>
            )}
            {processingResult && (
                <div className="processing-result">
                    {/* 显示来自 FastAPI 的处理结果 */}
                    <h3>processing output</h3>
                    <pre>{JSON.stringify(processingResult, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default CaptureReceiptImage;
