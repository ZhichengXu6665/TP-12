// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import FoodInventory from './Inventory/FoodInventory';
import KnowledgeHubPage from './KnowledgeHub/KnowledgeHubPage';
import Login from './components/Login';  // 导入登录组件

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // 用于跟踪用户是否登录
  const [expiredItems, setExpiredItems] = useState([]);  // 用于存储过期物品

  const handleLogin = () => {
    setIsLoggedIn(true);  // 登录成功后，更新状态
  };

  const handleExpiredItemsUpdate = (items) => {
    setExpiredItems(items);  // 更新过期物品列表
  };

  return (
    <Router>
      <div>
        <Navbar expiredItems={expiredItems} /> {/* 将过期物品传递给 Navbar */}
        <Routes>
          {/* 如果用户未登录，重定向到登录页面 */}
          {!isLoggedIn ? (
            <Route path="*" element={<Login onLogin={handleLogin} />} />
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route 
                path="/inventory" 
                element={<FoodInventory onExpiredItemsUpdate={handleExpiredItemsUpdate} />}  // 传递更新函数
              />
              <Route path="/knowledge-hub" element={<KnowledgeHubPage />} />
              {/* 添加其他受保护的路由 */}
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
