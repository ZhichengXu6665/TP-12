// src/components/FoodInventory.js
import React, { useState } from 'react';
import './FoodInventory.css';
import EnterItemsManually from './EnterItemsManually';
import CaptureReceiptImage from './CaptureReceiptImage';

function FoodInventory() {
    const [inventory, setInventory] = useState([]);
    const [showInputForm, setShowInputForm] = useState(false);
    const [showCaptureForm, setShowCaptureForm] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [editIndex, setEditIndex] = useState(null);

    const addItem = (item) => {
        if (editIndex !== null) {
            const updatedInventory = inventory.map((invItem, index) =>
                index === editIndex ? item : invItem
            );
            setInventory(updatedInventory);
            setEditIndex(null); // Reset edit index after updating
        } else {
            setInventory([...inventory, item]);
        }
        setShowInputForm(false);
    };

    const handleEditItem = (index) => {
        setCurrentItem(inventory[index]);
        setEditIndex(index);
        setShowInputForm(true);
    };

    return (
        <div className="food-inventory">
            <h1 className="title">Food Inventory</h1>
            <div className="buttons">
                <button 
                    className="capture-button"
                    onClick={() => setShowCaptureForm(!showCaptureForm)}
                >
                    Capture the receipt image
                </button>
                <button 
                    className="enter-button"
                    onClick={() => {
                        setShowInputForm(!showInputForm);
                        setCurrentItem(null);
                        setEditIndex(null);
                    }}
                >
                    {showInputForm ? 'Hide Form' : 'Enter items manually'}
                </button>
            </div>
            {showCaptureForm && <CaptureReceiptImage />}
            {showInputForm && (
                <EnterItemsManually 
                    addItem={addItem} 
                    initialItem={currentItem} 
                />
            )}
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Expiry Date</th>
                        <th>Days Until Expiry</th>
                        <th>Actions</th>
                        <th>Used</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.length === 0 ? (
                        <tr>
                            <td colSpan="7">No items in inventory</td>
                        </tr>
                    ) : (
                        inventory.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.quantity}</td>
                                <td>{item.expiryDate}</td>
                                <td>{item.daysUntilExpiry}</td>
                                <td>
                                    <button 
                                        className="action-button"
                                        onClick={() => handleEditItem(index)}
                                    >
                                        View/Edit
                                    </button>
                                </td>
                                <td>
                                    <input 
                                        type="checkbox" 
                                        checked={item.used} 
                                        onChange={() => {
                                            const updatedInventory = [...inventory];
                                            updatedInventory[index].used = !updatedInventory[index].used;
                                            setInventory(updatedInventory);
                                        }} 
                                    />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default FoodInventory;
