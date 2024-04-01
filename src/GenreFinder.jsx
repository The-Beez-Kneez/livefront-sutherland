// GenreFinder.jsx
import React, { useState, useEffect } from 'react';
import axios, { isCancel } from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StoryDetail from './StoryDetail';

const GenreFinder = () => {
  const [genre, setGenre] = useState(null);
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let cancelTokenSource;

  useEffect(() => {
    const fetchData = async () => {
      try {
        cancelTokenSource = axios.CancelToken.source();
        const [genreResponse, storyResponse] = await Promise.all([
          axios.get('https://binaryjazz.us/wp-json/genrenator/v1/genre/', { cancelToken: cancelTokenSource.token }),
          axios.get('https://binaryjazz.us/wp-json/genrenator/v1/story/', { cancelToken: cancelTokenSource.token })
        ]);
        setGenre(genreResponse.data);
        setStory(storyResponse.data);
        setLoading(false);
      } catch (error) {
        if (isCancel(error)) {
          console.log('Request cancelled:', error.message);
        } else {
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel('Component unmounted');
      }
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<div>
          <h1>Generated Genre:</h1>
          <p>{genre}</p>
          <a href="/story-detail">View Story Detail</a>
        </div>} />
        <Route path="/story-detail" element={<StoryDetail story={story} />} />
      </Routes>
    </Router>
  );
};

export default GenreFinder;
