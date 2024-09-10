// src/components/FoodInventory.js
import React, { useState, useEffect } from 'react';
import './FoodInventory.css';
import EnterItemsManually from './EnterItemsManually';
import ImageUpload from './ImageUpload';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    background-color: #f5f5f5;
    border-radius: 15px;
    padding: 20px;
    min-width: 300px;
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  font-size: 20px;
  font-weight: bold;
  color: #4a4a4a;
  text-align: center;
`;

const StyledDialogContentText = styled(DialogContentText)`
  color: #666;
  font-size: 16px;
  text-align: center;
  margin: 20px 0;
`;

const StyledButton = styled(Button)`
  color: #4a90e2 !important;
  font-weight: bold !important;
`;

const categories = ["Dairy","Meat & Poultry","Seafood","Bread & Bakery","Condiments","Prepared Foods","Breakfast","Vegetables", "Fruits", "Beverages", "Snacks","Other"];
const units = ["kg", "g", "l","ml","ea","mg","pack","","xg","xml"];

function FoodInventory({ onExpiredItemsUpdate }) {  // 接收来自父组件的回调函数
    const [inventory, setInventory] = useState(() => {
        const savedInventory = localStorage.getItem('inventory');
        return savedInventory ? JSON.parse(savedInventory) : [];
    });
    const [showInputForm, setShowInputForm] = useState(false);
    const [showCaptureForm, setShowCaptureForm] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    const [reloadTrigger, setReloadTrigger] = useState(0);
    const [expiredItems, setExpiredItems] = useState([]); 
    const [openDialog, setOpenDialog] = useState(false); 

    useEffect(() => {
        localStorage.setItem('inventory', JSON.stringify(inventory));
    }, [inventory]);

    useEffect(() => {
        const today = new Date();
        const expired = inventory.filter(item => new Date(item.expiryDate) < today);
        setExpiredItems(expired || []);
        onExpiredItemsUpdate(expired || []);  // 更新过期物品时调用回调函数
    }, [inventory, onExpiredItemsUpdate]);

    const calculateDaysUntilExpiry = (expiryDate) => {
        const today = new Date();
        const expiry = new Date(expiryDate);
        const diffTime = expiry - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const addItem = (item) => {
        item.daysUntilExpiry = calculateDaysUntilExpiry(item.expiryDate);
        item.quantityValue = parseFloat(item.quantityValue); // 确保存储为数值
        item.unit = item.unit || 'kg'; // 如果没有提供单位，设置默认单位
        if (editIndex !== null) {
            const updatedInventory = inventory.map((invItem, index) =>
                index === editIndex ? item : invItem
            );
            setInventory(updatedInventory);
            setEditIndex(null);
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

    const handleDeleteItem = (index) => {
        const updatedInventory = inventory.filter((_, i) => i !== index);
        setInventory(updatedInventory);
    };

    const handleCategoryChange = (index, newCategory) => {
        const updatedInventory = [...inventory];
        updatedInventory[index].category = newCategory;
        setInventory(updatedInventory);
    };

    const handleQuantityChange = (index, newQuantity, unit) => {
        const updatedInventory = [...inventory];
        updatedInventory[index].quantityValue = newQuantity; // 仅存储数值部分
        updatedInventory[index].unit = unit; // 存储单位
        updatedInventory[index].quantity = `${newQuantity} ${unit}`; // 显示时连接
        setInventory(updatedInventory);
    };

    const handleDateChange = (index, newDate) => {
        const updatedInventory = [...inventory];
        updatedInventory[index].expiryDate = newDate;
        updatedInventory[index].daysUntilExpiry = calculateDaysUntilExpiry(newDate); // 自动更新 Days Until Expiry
        setInventory(updatedInventory);
    };

    const sortedInventory = [...inventory].sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));

    return (
        <div className="food-inventory">
            <h1 className="title">Food Inventory</h1>
            <div className="buttons">
                <button
                    className="capture-button"
                    onClick={() => setShowCaptureForm(!showCaptureForm)}
                >
                    {showCaptureForm ? 'Hide Capture Form' : 'Capture the receipt image'}
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
            {showCaptureForm && <ImageUpload onUploadComplete={() => setReloadTrigger(prev => prev + 1)} />}
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
                    {sortedInventory.length === 0 ? (
                        <tr>
                            <td colSpan="7">No items in inventory</td>
                        </tr>
                    ) : (
                        sortedInventory.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>
                                    <select 
                                        value={item.category} 
                                        onChange={(e) => handleCategoryChange(index, e.target.value)}
                                    >
                                        {categories.map((category) => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <input 
                                            type="number" 
                                            value={item.quantityValue}  // 使用 item.quantityValue 进行数值输入
                                            onChange={(e) => handleQuantityChange(index, e.target.value, item.unit)}
                                            min="0"
                                            style={{ width: '60px', marginRight: '5px' }}
                                        />
                                        <select
                                            value={item.unit}
                                            onChange={(e) => handleQuantityChange(index, item.quantityValue, e.target.value)}
                                            style={{ width: '60px' }}
                                        >
                                            {units.map((unit) => (
                                                <option key={unit} value={unit}>{unit}</option>
                                            ))}
                                        </select>
                                    </div>
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        value={item.expiryDate}
                                        onChange={(e) => handleDateChange(index, e.target.value)}
                                        required
                                    />
                                </td>
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
                                        onChange={() => handleDeleteItem(index)}
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
