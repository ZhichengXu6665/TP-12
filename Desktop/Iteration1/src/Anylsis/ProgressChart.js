import React, { useEffect, useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ProgressChart.css';

function ProgressCharts() {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const inventoryData = JSON.parse(localStorage.getItem('inventory')) || [];
    const usedItemsData = JSON.parse(localStorage.getItem('usedItems')) || [];

    const formattedData = inventoryData.map((item) => {
      const usedItem = usedItemsData.find((used) => used.name === item.name) || {};
      return {
        name: item.name,
        Quantity: item.quantityValue || 0,
        Used: usedItem.usedQuantity || 0,
        Remaining: (item.quantityValue || 0) - (usedItem.usedQuantity || 0),
      };
    });

    setProgressData(formattedData);
  }, []);

  return (
    <div className="progress-charts-container">
      {/* 左侧图表区域 */}
      <div className="charts-group">
        {/* 折线图 */}
        <div className="line-chart">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" /> {/* 修改网格线颜色为浅灰色 */}
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#dddddd' }}  // Tooltip 背景颜色和边框颜色
                itemStyle={{ color: '#333333' }}  // Tooltip 字体颜色
              />
              <Legend />
              {/* 修改折线图颜色为亮蓝色 */}
              <Line type="monotone" dataKey="Quantity" stroke="#4F8FFF" strokeWidth={3} />  {/* 亮蓝色 */}
              <Line type="monotone" dataKey="Used" stroke="#63A3FF" strokeWidth={3} />  {/* 中蓝色 */}
              <Line type="monotone" dataKey="Remaining" stroke="#7CB4FF" strokeWidth={3} />  {/* 浅蓝色 */}
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* 右侧描述框 */}
      <div className="description-box">
        <h3>Measure your progress over time</h3>
        <p>Description on how to read the chart. This chart helps you track your progress and see the remaining quantity of items over time.</p>
      </div>
    </div>
  );
}

export default ProgressCharts;
