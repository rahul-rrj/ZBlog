import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PostView from './pages/PostView';
import PostForm from './pages/PostForm';
import ManagePosts from './pages/ManagePosts';

function App() {
  return (
    <div className="app-layout">
      <div className="app-shell">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<PostView />} />
            <Route path="/create" element={<PostForm mode="create" />} />
            <Route path="/edit/:id" element={<PostForm mode="edit" />} />
            <Route path="/manage" element={<ManagePosts />} />
          </Routes>
          <footer className="app-footer">
            <p>&copy; {new Date().getFullYear()} ZBlog Desk. Built for fast publishing.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
