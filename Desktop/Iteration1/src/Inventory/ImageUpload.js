import { useState, useCallback } from "react";
import axios from 'axios';
import './ImageUpload.css';

const ImageUpload = ({ onUploadComplete }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [uploadStatus, setUploadStatus] = useState('idle');
    const [apiResponse, setApiResponse] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && isValidFileType(file.name)) {
            setSelectedFile(file);
            setFeedback(`Selected file: ${file.name}`);
            setUploadStatus('idle');
        } else {
            setFeedback('Please select an image file (JPG, JPEG, or PNG)');
            setUploadStatus('error');
        }
    };

    const isValidFileType = (fileName) => {
        const validExtensions = ['jpg', 'jpeg', 'png'];
        const fileExtension = fileName.split('.').pop().toLowerCase();
        return validExtensions.includes(fileExtension);
    };

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
                const formattedItems = response.data.item_list.map(item => ({
                    name: item.description,
                    quantity: item.qty || '',
                    category: '',
                    expiryDate: '',
                    daysUntilExpiry: '',
                    used: false
                }));

                const existingInventory = JSON.parse(localStorage.getItem('inventory') || '[]');
                const updatedInventory = [...existingInventory, ...formattedItems];
                localStorage.setItem('inventory', JSON.stringify(updatedInventory));

                setFeedback('Image Process Succeeded, and new items are added to inventory');
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

    return (
        <div className="upload-container">
            <form onSubmit={handleSubmit} className="upload-form">
                <label htmlFor="fileInput" className="file-label">Choose File</label>
                <input
                    type="file"
                    id="fileInput"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="file-input"
                />
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
