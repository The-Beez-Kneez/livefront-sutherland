import React, { useState, useEffect } from 'react';
import axios, { isCancel } from 'axios';

const GenreFinder = () => {
  const [genre, setGenre] = useState(null);
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let source;

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        source = axios.CancelToken.source();
        const [genreResponse, storyResponse] = await Promise.all([
          axios.get('https://binaryjazz.us/wp-json/genrenator/v1/genre/', { cancelToken: source.token }),
          axios.get('https://binaryjazz.us/wp-json/genrenator/v1/story/', { cancelToken: source.token })
        ]);
  
        setGenre(genreResponse.data);
        setStory(storyResponse.data);
        setLoading(false);
      } catch (error) {
        if (isCancel(error)) {
          return error.message
        } else {
          setError(error);
          setLoading(false);
        }
      }
    };
  
    fetchData();
  
    return () => {
      if (source) {
        source.cancel('Component unmounted');
      }
    };
  }, []);
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Generated Genre:</h1>
      <p>{genre}</p>
      <h1>Generated Story:</h1>
      <p>{story}</p>
    </div>
  );
};

export default GenreFinder;
