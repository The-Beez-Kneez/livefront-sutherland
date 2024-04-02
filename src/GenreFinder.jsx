import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import StoryDetail from "./StoryDetail";
import './GenreFinder.css'; 

const GenreFinder = () => {
  const [genres, setGenres] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genreResponse = await axios.get('https://binaryjazz.us/wp-json/genrenator/v1/genre/25/');
        const storyResponse = await axios.get('https://binaryjazz.us/wp-json/genrenator/v1/story/25');
        setGenres(genreResponse.data);
        setStories(storyResponse.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<div className="container">
          <h1 className="title">What Should We Listen To?</h1>
          <ul className="genre-list">
            {genres.map((genre, index) => (
              <li key={index} className="genre-item">
                <Link to={`/story-detail/${genre}`} className="link">{genre}</Link>
              </li>
            ))}
          </ul>
        </div>} />
        <Route path="/story-detail/:genre" element={<StoryDetail stories={stories} />} />
      </Routes>
    </Router>
  );
};

export default GenreFinder;
