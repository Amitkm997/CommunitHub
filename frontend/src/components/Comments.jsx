import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/Comment.css';
export default function Comments() {
  const { id } = useParams(); 

  // Dummy existing comments
  const [comments, setComments] = useState([
    { id: 1, text: 'Nice post!' },
    { id: 2, text: 'Thanks for sharing.' }
  ]);

  // New comment state
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = {
      id: Date.now(),
      text: newComment
    };
    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <div className="comments-page">
      <h2>💬 Comments for Post: {id}</h2>

      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        ></textarea>
        <button type="submit">Add Comment</button>
      </form>

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
