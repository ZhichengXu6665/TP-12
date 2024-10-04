import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis as BarXAxis, YAxis as BarYAxis, CartesianGrid,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip as RechartsTooltip,
} from 'recharts';
import './AnalyticsCharts.css';

const COLORS = ['#6c63ff', '#bdb3e6', '#8c6bae', '#55517a', '#ff6b6b', '#48dbfb', '#ff9f43', '#1dd1a1'];

function AnalyticsCharts({
  selectedOption,
  totalWasted,
  totalBought,
  categoryData,
  expiredItems, // 接受 expiredItems 作为属性
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [scatterData, setScatterData] = useState([]);

  useEffect(() => {
    // 检查数据是否存在
    if (!categoryData || !expiredItems) return;

    // 生成 scatterData，使用 expiredItems 作为数据源
    const newScatterData = categoryData.map((category, index) => {
      // 过滤属于当前类别的过期物品，使用 trim() 和 toLowerCase() 确保匹配正确
      const itemsInCategory = expiredItems.filter((item) => {
        const itemCategory = item.category ? item.category.trim().toLowerCase() : '';
        const categoryName = category.name ? category.name.trim().toLowerCase() : '';
        return itemCategory === categoryName;
      });

      return {
        x: Math.random() * 100, // 随机 x 位置
        y: Math.random() * 100, // 随机 y 位置
        size: itemsInCategory.length * 15 + 50, // 根据物品数量调整大小
        category: category.name,
        items: itemsInCategory,
        color: COLORS[index % COLORS.length],
      };
    });

    setScatterData(newScatterData);
  }, [categoryData, expiredItems]);

  const handleCircleClick = (data) => {
    setSelectedCategory(data);
  };

  const handleCloseTable = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="charts-wrapper">
      {selectedOption === 'quantity' && (
        <div className="chart-section">
          <h3>Quantity Analysis by Category (Expired Items)</h3>
          <div className="custom-scatter-chart">
            {scatterData.map((data, index) => (
              <div
                key={index}
                className="scatter-circle"
                style={{
                  left: `${data.x}%`,
                  top: `${data.y}%`,
                  width: `${data.size}px`,
                  height: `${data.size}px`,
                  backgroundColor: data.color,
                }}
                onClick={() => handleCircleClick(data)}
                title={`${data.category}\nItems: ${data.items.length}`}
              ></div>
            ))}
          </div>
        </div>
      )}

      {selectedCategory && (
        <>
          <div className="popup-backdrop" onClick={handleCloseTable}></div>
          <div className="popup-table">
            <h3>{selectedCategory.category} Category (Expired Items)</h3>
            <button onClick={handleCloseTable}>Close</button>
            <table className="frequency-items-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {selectedCategory.items.length > 0 ? (
                  selectedCategory.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.fullName || item.name || 'Unnamed Item'}</td>
                      <td>{item.quantityValue || item.quantity || 'N/A'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" style={{ textAlign: 'center' }}>
                      No items found in this category.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <p>Total Items: {selectedCategory.items.length}</p>
          </div>
        </>
      )}

      {/* 其他选项的内容... */}
    </div>
  );
}

export default AnalyticsCharts;
