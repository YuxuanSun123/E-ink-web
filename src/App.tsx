import React, { useState } from 'react';
import Welcome from './components/Welcome';
import Terms from './components/Terms';
import WritePost from './components/WritePost';
import PostSubmitted from './components/PostSubmitted';
import PostsList from './components/PostsList';

function App() {
  const [stage, setStage] = useState<'welcome' | 'terms' | 'write' | 'confirm' | 'view'>('welcome');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-6">
      {stage === 'welcome' && <Welcome onStart={() => setStage('terms')} />} 
      {stage === 'terms' && <Terms onAccept={() => setStage('write')} />} 
      {stage === 'write' && <WritePost onPostSubmit={() => setStage('confirm')} onViewPosts={() => setStage('view')} />} 
      {stage === 'confirm' && <PostSubmitted onViewPosts={() => setStage('view')} />}
      {stage === 'view' && <PostsList onAddPost={() => setStage('write')} />}
    </div>
  );
}

export default App;
