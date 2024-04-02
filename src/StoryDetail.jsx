import React from 'react';
import './StoryDetail.css';

const StoryDetail = ({ stories }) => {

  console.log(stories);

  const randomStory = stories[Math.floor(Math.random() * stories.length)];

  return (
    <div className="story-detail-container">
      <h1 className="story-title">Story Detail</h1>
      <div className="story-content">{randomStory}</div>
    </div>
  );
};

export default StoryDetail;
