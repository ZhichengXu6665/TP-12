import React from 'react';
import './KnowledgeHubPage.css';
import Info from './info';
import Visualization from './Visualization';
import HelpCouncil from './HelpCouncil';

const KnowledgeHubPage = () => {
  return (
    <div className="knowledge-hub-page">
      <Info />
      <Visualization />
      <HelpCouncil />
    </div>
  );
};

export default KnowledgeHubPage;
