// src/components/OnboardingGuide.js
import React, { useState, useEffect } from 'react';
import Joyride, { STATUS } from 'react-joyride';
import './OnboardingGuide.css';

function OnboardingGuide({ runTutorial, setRunTutorial }) {
  const [isReady, setIsReady] = useState(false);

  // 定义所有引导的步骤列表
  const steps = [
    {
      target: '.logo',
      content: 'Welcome to Ecopantry! Click here to return to the homepage.',
      placement: 'bottom',
      disableBeacon: true, // 确保直接显示，不要等待用户触发
      spotlightClicks: true, // 允许点击目标元素继续引导
    },
    {
      target: '.nav-links .nav-link[href="/inventory"]',
      content: 'Manage your pantry items in the Inventory section.',
      placement: 'bottom',
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      target: '.nav-links .nav-link[href="/mealplan"]',
      content: 'Plan your meals based on your inventory in the Mealplan section.',
      placement: 'bottom',
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      target: '.nav-links .nav-link[href="/analytics"]',
      content: 'Analyze your food waste and learn how to reduce it.',
      placement: 'bottom',
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      target: '.nav-links .nav-link[href="/shoppingList"]',
      content: 'Create and manage your shopping lists here.',
      placement: 'bottom',
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      target: '.nav-links .nav-link[href="/knowledge-hub"]',
      content: 'Learn more about food waste and sustainability in the Knowledge Hub.',
      placement: 'bottom',
      disableBeacon: true,
      spotlightClicks: true,
    },
    {
      target: '.notification-bell',
      content: 'Check notifications for items that are expired or expiring soon.',
      placement: 'bottom',
      disableBeacon: true,
      spotlightClicks: true,
    },
  ];

  // 处理引导过程的回调函数
  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setRunTutorial(false); // 在引导完成或被跳过时关闭引导
    }
  };

  useEffect(() => {
    // 确保所有目标元素都已加载完成
    const checkElementsLoaded = () => {
      const requiredElements = [
        document.querySelector('.logo'),
        document.querySelector('.nav-links .nav-link[href="/inventory"]'),
        document.querySelector('.nav-links .nav-link[href="/mealplan"]'),
        document.querySelector('.nav-links .nav-link[href="/analytics"]'),
        document.querySelector('.nav-links .nav-link[href="/shoppingList"]'),
        document.querySelector('.nav-links .nav-link[href="/knowledge-hub"]'),
        document.querySelector('.notification-bell'),
      ];

      // 检查所有必需元素是否已加载
      const allElementsLoaded = requiredElements.every((el) => el !== null);
      if (allElementsLoaded) {
        setIsReady(true);
      } else {
        // 如果元素尚未完全加载，延迟重新检查
        setTimeout(checkElementsLoaded, 500);
      }
    };

    if (runTutorial) {
      checkElementsLoaded();
    }
  }, [runTutorial]);

  return (
    <Joyride
      steps={steps}
      run={isReady && runTutorial} // 当所有元素加载完成且引导开启时运行引导
      callback={handleJoyrideCallback}
      continuous={true} // 允许用户逐步操作引导
      showSkipButton={true} // 显示跳过按钮
      showProgress={true} // 显示当前步骤的进度
      scrollToFirstStep={true} // 在第一步时滚动到目标位置
      styles={{
        options: {
          zIndex: 10000, // 设置引导提示框的层级
          arrowColor: '#8c6bae', // 设置箭头颜色
        },
        spotlight: {
          borderRadius: '10px',
          boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.5)', // 增加聚光样式
        },
        tooltip: {
          backgroundColor: '#f8f8f8',
          color: '#333',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // 统一 tooltip 样式
        },
        buttonNext: {
          backgroundColor: '#8c6bae',
          color: '#fff',
        },
        buttonBack: {
          marginRight: 10,
          color: '#8c6bae',
        },
        buttonSkip: {
          backgroundColor: '#f8f8f8',
          color: '#8c6bae',
        },
        buttonClose: {
          backgroundColor: '#f8f8f8',
          color: '#8c6bae',
        },
      }}
    />
  );
}

export default OnboardingGuide;
