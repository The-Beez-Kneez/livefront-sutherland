import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import StoryDetail from './StoryDetail';

describe('StoryDetail component', () => {
  const stories = ['Story 1', 'Story 2', 'Story 3'];
  
  test('renders title and story content correctly', () => {
    const { getByText } = render(
      <Router>
        <StoryDetail stories={stories} />
      </Router>
    );
    
    // Assert that the title is rendered
    const titleElement = getByText('Well I Think...');
    expect(titleElement).toBeInTheDocument();

    // Assert that a story content is rendered
    const storyContentElement = getByText(/Story \d/);
    expect(storyContentElement).toBeInTheDocument();
  });

  test('renders back link', () => {
    const { getByText } = render(
      <Router>
        <StoryDetail stories={stories} />
      </Router>
    );
    
    // Assert that the back link is rendered
    const backLinkElement = getByText('Anything Else?');
    expect(backLinkElement).toBeInTheDocument();
  });
});
