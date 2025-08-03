import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Post.css';
export default function Posts() {
  const [posts, setPosts] = useState([
    {
      _id: '1',
      title: 'First Post',
      content: 'This is the first post content.',
      likes: 0
    },
    {
      _id: '2',
      title: 'Second Post',
      content: 'This is the second post content.',
      likes: 0
    },
    {
      _id: '3',
      title: 'Third Post',
      content: 'This is the third post content.',
      likes: 0
    }
  ]);

  const [newPost, setNewPost] = useState({
    title: '',
    content: ''
  });

  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      _id: Date.now().toString(),
      ...newPost,
      likes: 0 // Initialize likes to 0
    };
    setPosts([...posts, newEntry]);
    setNewPost({ title: '', content: '' });
  };

  const handleLike = (id) => {
    const updatedPosts = posts.map(post =>
      post._id === id ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="posts-page">
      <h1>📝 Posts</h1>

      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newPost.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={newPost.content}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Add Dummy Post</button>
      </form>

      <div className="posts-list">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>👍 Likes: {post.likes}</p>
            <button onClick={() => handleLike(post._id)}>Like</button> &nbsp;
            <Link to={`/posts/${post._id}/comments`}>💬 Comments</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
