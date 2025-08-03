import React, { useState } from "react";

export default function Profile() {
  const [file, setFile] = useState(null);

  const handleUpload = e => {
    e.preventDefault();
    console.log("Profile picture:", file);
  };

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
