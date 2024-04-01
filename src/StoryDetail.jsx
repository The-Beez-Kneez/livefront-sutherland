// StoryDetail.jsx
import React from 'react';
import './StoryDetail.css'; // Import CSS file for styling

const StoryDetail = ({ story }) => {
  return (
    <div className="story-detail-container">
      <h1 className="story-title">Story Detail</h1>
      <div className="story-content">{story}</div>
    </div>
  );
};

export default StoryDetail;
