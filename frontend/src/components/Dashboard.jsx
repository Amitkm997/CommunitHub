import React, { useEffect, useState } from 'react';
// import axios from '../api/api'; // Your Axios instance
import '../css/Dashboard.css';
export default function Dashboard() {
  // const [totals, setTotals] = useState({
  //   totalPosts: 0,
  //   totalLikes: 0
  // });

  // useEffect(() => {
    // Example: call backend endpoints for totals
    // const fetchTotals = async () => {
    //   try {
    //     const postsRes = await axios.get('/posts'); // all posts
    //     const likesRes = await axios.get('/posts/likes/total'); // your backend avgLikes route

    //     setTotals({
    //       totalPosts: postsRes.data.length,
    //       totalLikes: likesRes.data[0]?.totalLikes || 0
    //     });
    //   } catch (err) {
    //     console.error('Error fetching totals:', err);
    //   }
    // };

  //   fetchTotals();
  // }, []);

  return (
    <div className="dashboard">
      <h1>📊 Dashboard</h1>
      <div className="card">
        <h2>Total Posts</h2>
        <p>Total posts</p>
      </div>
      <div className="card">
        <h2>Total Likes</h2>
        <p>Total posts</p>
      </div>
    </div>
  );
}
