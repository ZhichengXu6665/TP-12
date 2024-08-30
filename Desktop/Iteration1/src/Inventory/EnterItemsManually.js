// src/components/EnterItemsManually.js
import React, { useState, useEffect } from 'react';
import './EnterItemsManually.css';

function EnterItemsManually({ addItem, initialItem }) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [expiryDate, setExpiryDate] = useState('');

    useEffect(() => {
        if (initialItem) {
            setName(initialItem.name);
            setCategory(initialItem.category);
            setQuantity(initialItem.quantity);
            setExpiryDate(initialItem.expiryDate);
        }
    }, [initialItem]);

    const handleAddItem = (e) => {
        e.preventDefault();

        const today = new Date();
        const expiry = new Date(expiryDate);
        const diffTime = Math.abs(expiry - today);
        const daysUntilExpiry = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const item = {
            name,
            category,
            quantity,
            expiryDate,
            daysUntilExpiry: expiry < today ? -daysUntilExpiry : daysUntilExpiry,
            used: initialItem ? initialItem.used : false,
        };

        addItem(item);
        setName('');
        setCategory('');
        setQuantity('');
        setExpiryDate('');
    };

    return (
        <form className="form-container" onSubmit={handleAddItem}>
            <input
                type="text"
                placeholder="Item Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
            />
            <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
            />
            <button type="submit">{initialItem ? 'Save Changes' : 'Add Item'}</button>
        </form>
    );
}

export default EnterItemsManually;
