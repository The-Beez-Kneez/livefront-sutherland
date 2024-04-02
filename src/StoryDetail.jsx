import React from 'react';
import './StoryDetail.css';
import { Link } from 'react-router-dom';

const StoryDetail = ({ stories }) => {
  const randomStory = stories[Math.floor(Math.random() * stories.length)];

  return (
    <div className="story-detail-container">
      <h1 className="story-title">Well I Think...</h1>
      <div className="story-content">{randomStory}</div>
      <Link to="/" className="link">Anything Else?</Link>
    </div>
  );
};

export default StoryDetail;
