// src/components/CaptureReceiptImage.js
import React, { useState } from 'react';
import './CaptureReceiptImage.css';

function CaptureReceiptImage() {
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState('');

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setImageURL(URL.createObjectURL(file));
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
                Upload Image
            </label>
            {image && (
                <div className="image-preview">
                    <img src={imageURL} alt="Receipt Preview" />
                </div>
            )}
        </div>
    );
}

export default CaptureReceiptImage;
